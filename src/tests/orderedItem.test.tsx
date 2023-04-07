/* eslint-disable react/react-in-jsx-scope */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { FoodCard } from '../components/Card';
import { OrderedItem } from '../components/OrderedItem';
import { UserCard } from '../components/UserCard';
import { AuthContext } from '../context/authContext';
import { mockUser } from '../mocks/moskUser';

const mockedFunction = jest.fn();
const mockItem = {
  id: 1,
  name: 'Pizza',
  price: 3.99,
  description: 'Delicious pizza with vegetables',
  amount: 1,
};

const MockOrderedItem = () => {
  const value = {
    logout: mockedFunction,
    user: { ...mockUser, products: [mockItem] },
    login: mockedFunction,
    addProduct: mockedFunction,
    deleteProduct: mockedFunction,
    changeAmount: mockedFunction,
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

  test('has working button', async () => {
    render(<MockOrderedItem />);
    userEvent.click(screen.getByTestId('delete-button'));
    await new Promise(process.nextTick);

    expect(mockedFunction).toBeCalled();
  });

  test('amount input is working ', async () => {
    render(<MockOrderedItem />);
    const amountInput = screen.getByTestId(
      'item-amount-input'
    ) as HTMLInputElement;

    // const price = mockItem.amount * mockItem.price * 3;

    fireEvent.change(amountInput, { target: { value: 3 } });
    expect(amountInput.value).toBe('3');
    expect(mockedFunction).toBeCalled();
    // await waitFor(() => {
    //   expect(screen.getByTestId('item-price-sum').textContent).toEqual(
    //     `${price}$`
    //   );
    // });
  });
});
