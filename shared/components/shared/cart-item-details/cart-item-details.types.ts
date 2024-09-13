export interface CartItemProps {
  id: number;
  image: string;
  details: string;
  name: string;
  price: number;
  quantity: number;
  disabled?: boolean;
}
