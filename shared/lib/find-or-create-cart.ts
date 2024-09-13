import { prisma } from "@/prisma/prisma-client"

/**
 * Finds a cart by the given token, or creates a new one if none is found
 *
 * @param token - The token to search for
 * @returns The found or created cart
 */
export const findOrCreateCart = async (token: string) => {
    let userCart = await prisma.cart.findFirst({
        where: {
            token,
        }
    })

    if (!userCart) {
        userCart = await prisma.cart.create({
            data: {
                token
            }
        })
    }
    return userCart
}