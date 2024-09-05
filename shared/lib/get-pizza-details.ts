import { Ingredient, ProductItem } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";

/**
 * **Returns array of available pizza sizes**
 * 
 * @param type - Type of selected pizza
 * @param size - Size of selected pizza 
 * @param items - Array of pizza variants 
 * @param ingredients - Array of ingredients 
 * @param selectedIngredients - Set of selected ingredients 
 * @returns  Array of available pizza sizes
 */

export const getPizzaDetails = (type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
) => {
    const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredients);
    const textDetails = `${size}cm, ${mapPizzaType[type]} pizza`;

    return { textDetails, totalPrice };
}