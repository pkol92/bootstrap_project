import React, { FC, useCallback, useMemo } from 'react';
import { Card, Badge, Button, Table } from 'react-bootstrap';
import { useAuthContext } from '../context/authContext';
import { Product } from '../types';
import { OrderedItem } from './OrderedItem';

interface UserCardProps {
  items: Array<Product>;
  deleteItem: (item: Product) => void;
}

export const UserCard: FC<UserCardProps> = ({ items, deleteItem }) => {
  // const [sum, setSum] = useState()

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
          <OrderedItem key={item.id} item={item} deleteItem={deleteItem} />
        ))}
        <tr>
          <td>Total price</td>
          <td></td>
          <td></td>
          <td>{sum.toFixed(2)}</td>
        </tr>
      </tbody>
    </Table>
  );
};
