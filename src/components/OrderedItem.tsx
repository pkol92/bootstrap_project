import React, { memo, useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Product } from '../types';

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

  const [amount, setAmount] = useState(item.amount);

  return (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>{item.price.toFixed(2)}$</td>
      <td>
        <input
          defaultValue={amount}
          min={1}
          max={99}
          step={1}
          type='number'
          onChange={(e) => {
            setAmount(+e.target.value);
          }}
        />
      </td>
      <td>{memoCalculatePrice(item.price, amount)}$</td>
      <td>
        <Button
          onClick={() => deleteItem(item)}
          className='mt-auto font-weight-bold'
          variant='dark'>
          Remove
        </Button>
      </td>
    </tr>
  );
});
