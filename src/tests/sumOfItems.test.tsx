/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { getSumOfItems } from '../components/Menu';

const pizza = {
  id: 3,
  name: 'Potato with vegetables',
  price: 0.99,
  description: 'Tasty food, Tasty food, Tasty food, Tasty food',
  amount: 1,
};

const fries = {
  id: 5,
  name: 'Fries',
  price: 2.05,
  description: 'Tasty food, Tasty food, Tasty food, Tasty food',
  amount: 9,
};

const mockProducts = [
  pizza,
  fries,
  {
    id: 4,
    name: 'Onion soup',
    price: 3.49,
    description: 'Tasty food, Tasty food, Tasty food, Tasty food',
    amount: 5,
  },
];

describe('function getSumOfItems', () => {
  test('return 15 if amounts of products is', () =>
    expect(getSumOfItems(mockProducts)).toBe(15));

  test('return 0 if there is no products', () =>
    expect(getSumOfItems([])).toBe(0));

  test('return 1 if there is 1 product', () =>
    expect(getSumOfItems([pizza])).toBe(pizza.amount));

  test('return 9 if amount of 1 product is 9', () =>
    expect(getSumOfItems([fries])).toBe(fries.amount));
});
