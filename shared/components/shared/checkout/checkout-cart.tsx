import React from 'react';
import { CheckoutItem, CheckoutItemSkeleton, WhiteBlock } from '..';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { CartStateItem } from '@/shared/lib/get-cart-details';
import { Skeleton } from '../../ui';

interface Props {
  items: CartStateItem[];
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  onClickCountButton,
  removeCartItem,
  loading,
  className,
}) => {
  return (
    <WhiteBlock title="1. Cart" className={className}>
      <div className="flex flex-col gap-5">
        {}

        {loading
          ? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                image={item.image}
                details={getCartItemDetails(
                  item.ingredients,
                  item.pizzaType as PizzaType,
                  item.pizzaSize as PizzaSize
                )}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                disabled={item.disabled}
                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                onClickRemoveButton={() => removeCartItem(item.id)}
              />
            ))}
      </div>
    </WhiteBlock>
  );
};