import * as React from 'react';

interface Props {
  code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }) => {
  return (
    <div>
      <p>
        Verification code: <h2>{code}</h2>
      </p>

      <p>
        <a href={`https://next-pizza-orpin-theta.vercel.app/api/auth/verify?code=${code}`}>
          Confirm registration
        </a>
      </p>
    </div>
  );
};
