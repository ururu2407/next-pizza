import { ProductItem } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/group-variants";

/**
 * **Returns array of available pizza sizes**
 * 
 * 
 * @param {string} type - Type of selected pizza 
 * @param {Array} items - Array of pizza variants
 * @returns {Array} Array of available pizza sizes
 */

export const getAvailablePizzaSizes = (type: PizzaType, items: ProductItem[]): Variant[] => {
    const filteredPizzasByType = items.filter((item) => item.pizzaType === type);
    return pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value)),
    }));
}