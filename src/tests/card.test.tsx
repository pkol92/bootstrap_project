/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { FoodCard } from '../components/Card';

const mockedFunction = jest.fn();
const mockItem = {
  id: 1,
  name: 'Pizza',
  price: 3.99,
  description: 'Delicious pizza with vegetables',
  amount: 1,
};

describe('FoodCard', () => {
  test('is render', () => {
    render(<FoodCard addItem={mockedFunction} item={mockItem} />);

    expect(screen.getByTestId('food-card')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('is render valid product properties', () => {
    render(<FoodCard addItem={mockedFunction} item={mockItem} />);

    expect(screen.getByText(mockItem.name)).toBeInTheDocument();
    expect(screen.getByText(`${mockItem.price}$`)).toBeInTheDocument();
    expect(screen.getByText(mockItem.description)).toBeInTheDocument();
  });

  test('button works', () => {
    render(<FoodCard addItem={mockedFunction} item={mockItem} />);
    const button = screen.getByTestId('food-card-button');

    userEvent.click(button);

    expect(mockedFunction).toBeCalled();
  });
});
