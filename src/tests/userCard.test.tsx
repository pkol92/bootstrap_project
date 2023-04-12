import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { UserCard } from '../components/UserCard';

const mockProducts = [
  {
    id: 3,
    name: 'Pizza',
    price: 0.99,
    description: 'Tasty food, Tasty food, Tasty food, Tasty food',
    amount: 1,
  },
  {
    id: 5,
    name: 'Fries',
    price: 2.05,
    description: 'Tasty food, Tasty food, Tasty food, Tasty food',
    amount: 9,
  },
];

describe('UserCard', () => {
  test('is render', () => {
    render(<UserCard items={mockProducts} />);

    expect(screen.getByTestId('user-table')).toBeInTheDocument();
    expect(screen.getByTestId('table-header-dish')).toBeInTheDocument();
    expect(screen.getByTestId('table-header-price')).toBeInTheDocument();
    expect(screen.getByTestId('table-header-amount')).toBeInTheDocument();
    expect(screen.getByTestId('table-header-total-price')).toBeInTheDocument();
    expect(screen.getByTestId('table-body')).toBeInTheDocument();
    expect(screen.getByTestId('table-price-sum')).toBeInTheDocument();
  });

  test('shows total price of all products', () => {
    render(<UserCard items={mockProducts} />);
    const amount = (9 * 2.05 + 0.99).toFixed(2);
    expect(screen.getByTestId('table-price-sum').textContent).toEqual(amount);
  });
});
