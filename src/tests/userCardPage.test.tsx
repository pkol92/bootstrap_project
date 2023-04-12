import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { UserState } from '../types';
import { mockUser } from '../mocks/moskUser';
import { UserCardPage } from '../features/UserCardPage';

const mockedFunction = jest.fn();

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
    amount: 1,
  },
];

const MockUserCardPage = ({ mockedUser }: { mockedUser: UserState | null }) => {
  const [user, setUser] = useState(mockedUser);

  const value = {
    logout: mockedFunction,
    user: user,
    login: mockedFunction,
    setUser: setUser,
  };
  return (
    <BrowserRouter>
      <AuthContext.Provider value={value}>
        <UserCardPage />
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe('Food page', () => {
  test('is render', () => {
    render(<MockUserCardPage mockedUser={mockUser} />);
    expect(screen.getByTestId('container')).toBeInTheDocument();
    expect(screen.getByTestId('menu')).toBeInTheDocument();
  });

  test('shows products and total sum', () => {
    render(
      <MockUserCardPage mockedUser={{ ...mockUser, products: mockProducts }} />
    );

    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Fries')).toBeInTheDocument();
    expect(screen.getByTestId('user-table')).toBeInTheDocument();
    expect(screen.getByTestId('table-price-sum').textContent).toBe('3.04');
  });

  test('shows info about empty card if user has no products', () => {
    render(<MockUserCardPage mockedUser={mockUser} />);
    expect(screen.getByTestId('empty-card-info')).toBeInTheDocument();
    expect(screen.queryByText('table-price-sum')).not.toBeInTheDocument();
    expect(screen.queryByText('user-table')).not.toBeInTheDocument();
  });
});
