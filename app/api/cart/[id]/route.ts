import { prisma } from '@/prisma/prisma-client';
import { updateCartTotalAmount } from '@/shared/lib';
import { NextRequest, NextResponse } from "next/server";


/**
 * Update quantity of a cart item
 *
 * @param req - NextRequest object
 * @param {params} - object with id property
 * @returns NextResponse with updated cart data
 */
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        const data = (await req.json()) as { quantity: number };
        const token = req.cookies.get("cartToken")?.value;

        if (!token) {
            return NextResponse.json({ message: 'Cart token not found' });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id,
            }
        })

        if (!cartItem) {
            return NextResponse.json({ message: 'Cart item not found' });
        }

        await prisma.cartItem.update({
            where: {
                id
            },
            data: {
                quantity: data.quantity
            }
        })
        const updatedUserCart = await updateCartTotalAmount(token);

        return NextResponse.json(updatedUserCart);

    } catch (error) {
        console.log('[CART_PATCH] Server error', error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}


/**
 * Deletes a cart item
 * 
 * @param req - NextRequest object
 * @param id - The id of the cart item to delete
 * @returns The updated cart
 */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        const token = req.cookies.get("cartToken")?.value;

        if (!token) {
            return NextResponse.json({ message: 'Cart token not found' });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id
            }
        })

        if (!cartItem) {
            return NextResponse.json({ message: 'Cart item not found' });
        }

        await prisma.cartItem.delete({
            where: {
                id
            }
        })

        const updatedUserCart = await updateCartTotalAmount(token);

        return NextResponse.json(updatedUserCart);

    } catch (error) {
        console.log('[CART_DELETE] Server error', error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}