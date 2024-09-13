import { cn } from "@/shared/lib/utils";
import React from "react";

import * as CartItem from "./cart-item-details";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { CountButton } from "./count-button";
import { Trash2Icon } from "lucide-react";
interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemoveButton?: () => void;
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
  image,
  name,
  price,
  quantity,
  details,
  onClickCountButton,
  onClickRemoveButton,
  className,
}) => {
  return (
    <div className={cn("flex bg-white p-5 gap-6", className)}>
      <CartItem.Image src={image} />

      <div className="flex-1">
        <CartItem.Info name={name} details={details} />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CountButton onClick={onClickCountButton} value={quantity} />

          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <Trash2Icon
              onClick={onClickRemoveButton}
              size={16}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};