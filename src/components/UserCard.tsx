import { FC, useMemo } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatchContext } from '../context/productsContext';
import { Product } from '../types';
import { OrderedItem } from './OrderedItem';

interface UserCardProps {
  items: Array<Product>;
}

export const UserCard: FC<UserCardProps> = ({ items }) => {
  const memoTotalSum = useMemo(() => {
    return items
      .reduce((acc, item) => acc + item.price * item.amount, 0)
      .toFixed(2);
  }, [items]);

  const dispatch = useDispatchContext();

  const handleDelete = (item: Product) => {
    dispatch({ type: 'DELETE', payload: item });
  };

  return (
    <Table striped data-testid='user-table'>
      <thead>
        <tr>
          <th data-testid='table-header-dish'>Dish</th>
          <th data-testid='table-header-price'>Price</th>
          <th data-testid='table-header-amount'>Amount</th>
          <th data-testid='table-header-total-price'>Total price</th>
        </tr>
      </thead>
      <tbody data-testid='table-body'>
        {items.map((item) => (
          <OrderedItem
            key={item.id}
            item={item}
            deleteItem={() => handleDelete(item)}
          />
        ))}
        <tr>
          <td>
            <b>Total price</b>
          </td>
          <td></td>
          <td></td>
          <td data-testid='table-price-sum'>
            <b>{memoTotalSum}</b>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};
