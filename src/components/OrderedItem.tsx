import React, { memo, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useAuthContext } from '../context/authContext';
import { Product } from '../types';
import { ReactComponent as RemoveIcon } from '../icons/remove-icon.svg';

export const OrderedItem = memo(function OrderITem({
  item,
  deleteItem,
}: {
  item: Product;
  deleteItem: (item: Product) => void;
}) {
  const memoCalculatePrice = useCallback((price: number, amount: number) => {
    return (price * amount).toFixed(2);
  }, []);

  const { changeAmount } = useAuthContext();

  return (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>{item.price.toFixed(2)}$</td>
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
        />
      </td>
      <td>{memoCalculatePrice(item.price, item.amount)}$</td>
      <td className='mt-auto font-weight-bold'>
        <Button onClick={() => deleteItem(item)} variant='link' size='sm'>
          <RemoveIcon width={13} height={13} />
        </Button>
      </td>
    </tr>
  );
});
