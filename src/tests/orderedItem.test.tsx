/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { FoodCard } from '../components/Card';
import { OrderedItem } from '../components/OrderedItem';
import { UserCard } from '../components/UserCard';

const mockedFunction = jest.fn();
const mockItem = {
  id: 1,
  name: 'Pizza',
  price: 3.99,
  description: 'Delicious pizza with vegetables',
  amount: 1,
};

describe('OrderedItem component', () => {
  test('is render', () => {
    render(
      <table>
        <tbody>
          <OrderedItem item={mockItem} />
        </tbody>
      </table>
    );

    expect(screen.getByTestId('item-row')).toBeInTheDocument();
    expect(screen.getByTestId('item-name')).toBeInTheDocument();
    expect(screen.getByTestId('item-price')).toBeInTheDocument();
    expect(screen.getByTestId('item-amount-input')).toBeInTheDocument();
    expect(screen.getByTestId('item-price-sum')).toBeInTheDocument();
    expect(screen.getByTestId('delete-button')).toBeInTheDocument();
  });
});
