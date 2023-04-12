import React, { memo, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { Product } from '../types';
import { ReactComponent as RemoveIcon } from '../icons/remove-icon.svg';
import { useDispatchContext } from '../context/productsContext';

export const calculatePrice = (price: number, amount: number) => {
  return (price * amount).toFixed(2);
};

export const OrderedItem = memo(function OrderITem({
  item,
  deleteItem,
}: {
  item: Product;
  deleteItem: () => void;
}) {
  const dispatch = useDispatchContext();

  const memoCalculatePrice = useCallback(
    () => calculatePrice(item.price, item.amount),
    [item.price, item.amount]
  );

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(event.target.value);
    dispatch({
      type: 'UPDATE',
      payload: { product: item, newAmount: newAmount },
    });
  };

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
          onChange={handleAmountChange}
          data-testid='item-amount-input'
        />
      </td>
      <td data-testid='item-price-sum'>{memoCalculatePrice()}$</td>
      <td className='mt-auto font-weight-bold'>
        <Button
          onClick={() => deleteItem()}
          variant='link'
          size='sm'
          data-testid='delete-button'>
          <RemoveIcon width={13} height={13} />
        </Button>
      </td>
    </tr>
  );
});
