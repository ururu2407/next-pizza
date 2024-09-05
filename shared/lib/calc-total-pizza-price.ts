import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

/** 
 * **Calculates total price of pizza**
 *
 * @param  type - type of selected pizza
 * @param  size - size of selected pizza
 * @param  items - array of pizza variants
 * @param  ingredients - array of ingredients
 * @param  selectedIngredients - set of selected ingredients
 * @returns number - total price
 */

export const calcTotalPizzaPrice = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
) => {
    const pizzaPrice =
        items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
    const totalIngredientsPrice = ingredients
        .filter((ingredient) => selectedIngredients.has(ingredient.id))
        .reduce((acc, ingredient) => acc + ingredient.price, 0);

    return pizzaPrice + totalIngredientsPrice;
}