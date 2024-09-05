"use client";
import React from "react";
import { useIntersection } from "react-use";
import { Title } from "./title";
import { ProductCart } from "./product-cart";
import { useCategoryStore } from "@/shared/store/category";
import { cn } from "@/shared/lib/utils";

interface Props {
  title: string;
  items: any[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  categoryId,
  className,
  listClassName,
}) => {
  const setActiveCategotyId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategotyId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, setActiveCategotyId]);
  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((item) => (
          <ProductCart
            key={item.id}
            id={item.id}
            name={item.name}
            imageUrl={item.image}
            price={item.items[0].price}
            className="col-span-1"
          />
        ))}
      </div>
    </div>
  );
};
