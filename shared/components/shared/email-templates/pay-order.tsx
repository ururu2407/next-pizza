import * as React from 'react';

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({ orderId, totalAmount, paymentUrl }) => {
  return (
    <div>
      <h1>Order #{orderId}</h1>

      <p>
        Pay the order for the amount of {totalAmount} $. Follow <a href={paymentUrl}>the link </a>
        to pay.
      </p>
    </div>
  );
};
