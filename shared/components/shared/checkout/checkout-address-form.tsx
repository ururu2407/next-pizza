'use client';

import React from 'react';
import { AddressAutocomplete, FormTextarea, WhiteBlock } from '..';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();
  return (
    <WhiteBlock title="3. Delivery address" className={className}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Controller
            control={control}
            name="address"
            render={({ field, fieldState }) => (
              <>
                <AddressAutocomplete onChange={field.onChange} />
                {fieldState.error && (
                  <p className="text-sm text-red-500">{fieldState.error.message}</p>
                )}
              </>
            )}
          />
        </div>
        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Comment from seller"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
