import React from "react";
import { Container } from "./container";
import { Categories } from "./categories";
import { SortPoput } from "./sort-poput";
import { Category } from "@prisma/client";
import { cn } from "@/shared/lib/utils";

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  return (
    <div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10", className)}>
      <Container className="flex items-center justify-between">
        <Categories items={categories} />
        <SortPoput />
      </Container>
    </div>
  );
};
