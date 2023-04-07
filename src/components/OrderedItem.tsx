import React, { memo, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useAuthContext } from '../context/authContext';
import { Product } from '../types';
import { ReactComponent as RemoveIcon } from '../icons/remove-icon.svg';

export const calculatePrice = (price: number, amount: number) => {
  return (price * amount).toFixed(2);
};

export const OrderedItem = memo(function OrderITem({
  item,
}: {
  item: Product;
}) {
  const memoCalculatePrice = useCallback((price: number, amount: number) => {
    return calculatePrice(price, amount);
  }, []);

  const { changeAmount, deleteProduct } = useAuthContext();

  return (
    <tr key={item.id} data-testid='item-row'>
      <td data-testid='item-name'>{item.name}</td>
      <td data-testid='item-price'>{item.price.toFixed(2)}$</td>
      <td>
        <input
          defaultValue={item.amount}
          min={1}
          max={99}
          step={1}
          type='number'
          onChange={(e) => {
            changeAmount(item, +e.target.value);
          }}
          data-testid='item-amount-input'
        />
      </td>
      <td data-testid='item-price-sum'>
        {memoCalculatePrice(item.price, item.amount)}$
      </td>
      <td className='mt-auto font-weight-bold'>
        <Button
          onClick={() => deleteProduct(item)}
          variant='link'
          size='sm'
          data-testid='delete-button'>
          <RemoveIcon width={13} height={13} />
        </Button>
      </td>
    </tr>
  );
});
