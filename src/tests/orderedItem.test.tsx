/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OrderedItem } from '../components/OrderedItem';
import { AuthContext } from '../context/authContext';
import { mockUser } from '../mocks/moskUser';
import { useState } from 'react';

const mockedFunction = jest.fn();
const mockItem = {
  id: 1,
  name: 'Pizza',
  price: 3.99,
  description: 'Delicious pizza with vegetables',
  amount: 1,
};

const MockOrderedItem = () => {
  const [user, setUser] = useState({ ...mockUser, products: [mockItem] });
  const value = {
    logout: mockedFunction,
    user: user,
    login: mockedFunction,
    addProduct: mockedFunction,
    deleteProduct: mockedFunction,
    changeAmount: mockedFunction,
    setUser: setUser,
  };
  return (
    <AuthContext.Provider value={value}>
      <table>
        <tbody>
          <OrderedItem item={mockItem} />
        </tbody>
      </table>
    </AuthContext.Provider>
  );
};

describe('OrderedItem component', () => {
  test('is render', () => {
    render(<MockOrderedItem />);

    expect(screen.getByTestId('item-row')).toBeInTheDocument();
    expect(screen.getByTestId('item-name')).toBeInTheDocument();
    expect(screen.getByTestId('item-price')).toBeInTheDocument();
    expect(screen.getByTestId('item-amount-input')).toBeInTheDocument();
    expect(screen.getByTestId('item-price-sum')).toBeInTheDocument();
    expect(screen.getByTestId('delete-button')).toBeInTheDocument();
  });

  test('renders the correct item properties', () => {
    render(<MockOrderedItem />);

    const amountInput = screen.getByTestId(
      'item-amount-input'
    ) as HTMLInputElement;
    const price = mockItem.amount * mockItem.price;
    expect(screen.getByTestId('item-name').textContent).toEqual(mockItem.name);
    expect(screen.getByTestId('item-price').textContent).toEqual(
      `${mockItem.price}$`
    );
    expect(amountInput.value).toBe(`${mockItem.amount}`);
    expect(screen.getByTestId('item-price-sum').textContent).toEqual(
      `${price}$`
    );
  });
});
