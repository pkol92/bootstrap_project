import React, { FC } from 'react';
import { Table } from 'react-bootstrap';
import { Product } from '../types';
import { OrderedItem } from './OrderedItem';

interface UserCardProps {
  items: Array<Product>;
}

export const UserCard: FC<UserCardProps> = ({ items }) => {
  const totalSum = items
    .reduce((acc, item) => acc + item.price * item.amount, 0)
    .toFixed(2);

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
            <b>{totalSum}</b>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};
