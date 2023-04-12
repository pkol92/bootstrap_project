import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { FoodPage } from '../features/FoodPage';
import { UserState } from '../types';
import { mockUser } from '../mocks/moskUser';

const mockedFunction = jest.fn();

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as any),
  useNavigate: () => mockedFunction,
}));

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

const MockFoodPage = ({ mockedUser }: { mockedUser: UserState | null }) => {
  const [user, setUser] = useState(mockedUser);
  const logout = () => {
    setUser(null);
  };

  const value = {
    logout: logout,
    user: user,
    login: mockedFunction,
    setUser: setUser,
  };
  return (
    <BrowserRouter>
      <AuthContext.Provider value={value}>
        <FoodPage products={mockProducts} />
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe('Food page', () => {
  test('is render', () => {
    render(<MockFoodPage mockedUser={null} />);

    expect(screen.getByTestId('container')).toBeInTheDocument();
    expect(screen.getByTestId('products')).toBeInTheDocument();
    expect(screen.queryByTestId('confirmation')).not.toBeInTheDocument();
  });

  test('shows products with prices', () => {
    render(<MockFoodPage mockedUser={null} />);

    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Fries')).toBeInTheDocument();
    expect(screen.getByText('2.05$')).toBeInTheDocument();
    expect(screen.getByText('0.99$')).toBeInTheDocument();
  });

  test('navigates to another page, when no user is logged in ', async () => {
    render(<MockFoodPage mockedUser={null} />);

    const pizzaOrderButton = screen.getAllByText('Order')[0];
    userEvent.click(pizzaOrderButton);
    await new Promise(process.nextTick);
    expect(mockedFunction).toBeCalled();
  });

  test('shows confirmation toast, when user is logged in ', async () => {
    render(<MockFoodPage mockedUser={mockUser} />);

    const pizzaOrderButton = screen.getAllByText('Order')[0];
    userEvent.click(pizzaOrderButton);
    await new Promise(process.nextTick);
    expect(screen.queryByTestId('confirmation')).toBeInTheDocument();
  });
});
