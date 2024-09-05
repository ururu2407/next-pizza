import React from "react";
import { Variant } from "../components/shared/group-variants";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib";
import { ProductItem } from "@prisma/client";

interface ReturnProps {
    size: PizzaSize;
    type: PizzaType;
    selectedIngredients: Set<number>;
    availableSizes: Variant[];
    setSize: (size: PizzaSize) => void;
    setType: (type: PizzaType) => void;
    addIngredients: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
    const [size, setSize] = React.useState<PizzaSize>(20);
    const [type, setType] = React.useState<PizzaType>(1);
    const [selectedIngredients, { toggle: addIngredients }] = useSet(new Set<number>([]));

    const availableSizes = getAvailablePizzaSizes(type, items);

    React.useEffect(() => {
        const isAvailableSize = availableSizes?.find(
            (item) => item.value === String(size) && !item.disabled
        );
        const availableSize = availableSizes?.find((item) => !item.disabled);

        if (availableSize && !isAvailableSize) {
            setSize(Number(availableSize.value) as PizzaSize);
        }
    }, [availableSizes, size]);

    return {
        size,
        type,
        selectedIngredients,
        availableSizes,
        setSize,
        setType,
        addIngredients,
    }
}