import { CartDTO } from "../services/dto/cart.dto";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

export type CartStateItem = {
    id: number;
    quantity: number;
    name: string;
    image: string;
    price: number;
    pizzaSize?: number | null;
    pizzaType?: number | null;
    ingredients: Array<{ name: string, price: number }>;
}

interface ReturnProps {
    items: CartStateItem[];
    totalAmount: number;
}
export const getCartDetails = (data: CartDTO): ReturnProps => {
    const items = data.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        name: item.productItem.product.name,
        image: item.productItem.product.image,
        price: calcCartItemTotalPrice(item),
        pizzaSize: item.productItem.size,
        pizzaType: item.productItem.pizzaType,
        ingredients: item.ingredients.map((ingredient) => ({
            name: ingredient.name,
            price: ingredient.price
        }))
    }))

    return {
        items,
        totalAmount: data.totalAmount,
    }
}