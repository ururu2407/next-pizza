import { Prisma } from '@prisma/client';
import { categories, _ingredients, products } from './constants';
import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  price,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  price?: number;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: price || randomDecimalNumber(2, 30),
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User Test',
        email: 'user@gmail.com',
        password: hashSync('11111111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin Test',
        email: 'admin@gmail.com',
        password: hashSync('11111111', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: _ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Pizza Margherita',
      image: '/assets/img-products/pizza/margherita.avif',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
    },
  });
  const pizza2 = await prisma.product.create({
    data: {
      name: 'Cheese',
      image: '/assets/img-products/pizza/cheese.avif',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
    },
  });
  const pizza3 = await prisma.product.create({
    data: {
      name: 'Chorizo',
      image: '/assets/img-products/pizza/chorizo.avif',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 40),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      generateProductItem({ productId: pizza1.id, pizzaType: 2, price: 10, size: 20 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 1, price: 13, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, price: 15, size: 40 }),

      generateProductItem({ productId: pizza2.id, pizzaType: 1, price: 11, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, price: 13, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, price: 15, size: 40 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, price: 17, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, price: 20, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, price: 25, size: 40 }),

      generateProductItem({ productId: pizza3.id, pizzaType: 1, price: 16, size: 20 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, price: 15, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, price: 20, size: 40 }),

      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: '111111',
      },
      {
        userId: 2,
        totalAmount: 0,
        token: '222222',
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      cartId: 1,
      productItemId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      },
    },
  });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl: '/assets/img-products/story/story_1.webp',
      },
      {
        previewImageUrl: '/assets/img-products/story/story_2.webp',
      },
      {
        previewImageUrl: '/assets/img-products/story/story_3.webp',
      },
      {
        previewImageUrl: '/assets/img-products/story/story_4.webp',
      },
      {
        previewImageUrl: '/assets/img-products/story/story_5.webp',
      },
      {
        previewImageUrl: '/assets/img-products/story/story_6.webp',
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl: '/assets/img-products/story/storyItem_1.webp',
      },
      {
        storyId: 1,
        sourceUrl: '/assets/img-products/story/storyItem_2.webp',
      },
      {
        storyId: 1,
        sourceUrl: '/assets/img-products/story/storyItem_3.webp',
      },
      {
        storyId: 1,
        sourceUrl: '/assets/img-products/story/storyItem_4.webp',
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
