import { axiosInstance } from "./instance"
import { CartDTO, CreateCartItemValues } from "./dto/cart.dto"

/**
 * Gets the current cart
 *
 * @returns The current cart
 */
export const getCart = async (): Promise<CartDTO> => {
    return (await axiosInstance.get<CartDTO>('/cart')).data
}

/**
 * Updates the quantity of a cart item
 *
 * @param id - The id of the cart item to update
 * @param quantity - The new quantity of the cart item
 * @returns The updated cart
 */
export const updateItemQuantity = async (id: number, quantity: number): Promise<CartDTO> => {
    return (await axiosInstance.patch<CartDTO>(`/cart/${id}`, { quantity })).data
}

/**
 * Removes a cart item
 *
 * @param id - The id of the cart item to remove
 * @returns The updated cart
 */
export const removeCartItem = async (id: number): Promise<CartDTO> => {
    return (await axiosInstance.delete<CartDTO>(`/cart/${id}`)).data
}

/**
 * Adds a new item to the current cart
 *
 * @param values - The details of the item to add
 * @returns The updated cart
 */
export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
    return (await axiosInstance.post<CartDTO>('/cart', values)).data
}