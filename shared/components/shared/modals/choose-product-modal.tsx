"use client";

import React from "react";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { IProduct } from "@/@types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { cn } from "@/shared/lib/utils";

interface Props {
  product: IProduct;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.items[0].pizzaType);

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            image={product.image}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
          />
        ) : (
          <ChooseProductForm image={product.image} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  );
};
