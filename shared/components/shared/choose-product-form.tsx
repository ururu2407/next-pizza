import { cn } from "@/shared/lib/utils";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";

interface Props {
  name: string;
  image: string;
  price: number;
  loading?: boolean;
  onSubmit?: VoidFunction;
  className?: string;
}

/**
 * A form for choosing a product to add to cart.
 *
 * @param name - The name of the product.
 * @param image - The URL of the product image.
 * @param price - The price of the product.
 * @param onSubmit - The function to call when the "Add to cart" button is clicked.
 * @param className - The CSS class to apply to the outermost element.
 *
 * @returns {JSX.Element} The form element.
 */

export const ChooseProductForm: React.FC<Props> = ({
  name,
  image,
  price,
  loading,
  onSubmit,
  className,
}) => {
  return (
    <div className={cn("flex flex-1", className)}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={image}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Add to cart from {price}$
        </Button>
      </div>
    </div>
  );
};
