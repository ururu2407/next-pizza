'use server';

import { Resend } from 'resend';
import { prisma } from '@/prisma/prisma-client';
import { CheckoutFormValues } from '@/shared/constants';
import { OrderStatus, Prisma } from '@prisma/client';
import { cookies } from 'next/headers';
import { sendEmail } from '@/shared/lib';
import { PayOrderTemplate, VerificationUserTemplate } from '@/shared/components';
import { getUserSession } from '@/shared/lib/get-user-session';
import { hashSync } from 'bcrypt';

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookiesStore = cookies();
    const cartToken = cookiesStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    /* Find the user's cart by the cart token */
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    /* If the user's cart is not found, throw an error */
    if (!userCart) {
      throw new Error('Cart not found');
    }

    /* If the user's cart is empty, throw an error */
    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    /* Create the order */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    /* Clear the user's cart */
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    /* Delete all items from the user's cart */
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    await sendEmail(
      data.email,
      'Next Pizza / Pay order #' + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: 'https://resend.com/emails',
      })
    );
  } catch (error) {
    console.error('Error creating order:', error);
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('User not found');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
      },
    });
  } catch (error) {
    console.error('Error [UPDATE_USER]:', error);
    throw error;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('Email is not verified');
      }
      throw new Error('User already exists');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      'Next Pizza / Verify your email',
      VerificationUserTemplate({
        code,
      })
    );
  } catch (error) {
    console.error('Error [CREATE_USER]:', error);
    throw error;
  }
}
