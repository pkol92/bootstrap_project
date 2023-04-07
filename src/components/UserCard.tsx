import React, { FC } from 'react';
import { Table } from 'react-bootstrap';
import { Product } from '../types';
import { OrderedItem } from './OrderedItem';

interface UserCardProps {
  items: Array<Product>;
}

export const UserCard: FC<UserCardProps> = ({ items }) => {
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    const productSum = items[i].price * items[i].amount;
    sum += productSum;
  }
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Dish</th>
          <th>Price</th>
          <th>Amount</th>
          <th>Total price</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <OrderedItem key={item.id} item={item} />
        ))}
        <tr>
          <td>
            <b>Total price</b>
          </td>
          <td></td>
          <td></td>
          <td>
            <b>{sum.toFixed(2)}</b>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};
