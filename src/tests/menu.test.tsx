/* eslint-disable react/react-in-jsx-scope */
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Menu } from '../components/Menu';
import { AuthContext } from '../context/authContext';
import { BrowserRouter } from 'react-router-dom';
import { mockUser } from '../mocks/moskUser';
import { UserState } from '../types';
import { useState } from 'react';

const mockedFunction = jest.fn();
jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as any),
  useNavigate: () => mockedFunction,
}));

const pizza = {
  id: 1,
  name: 'Pizza',
  price: 2.99,
  description: 'Tasty food, Tasty food, Tasty food, Tasty food',
  amount: 1,
};

const chicken = {
  id: 2,
  name: 'Chicken with rice',
  price: 1.99,
  description: 'Tasty food, Tasty food, Tasty food, Tasty food',
  amount: 1,
};

const fries = {
  id: 5,
  name: 'Fries',
  price: 2.05,
  description: 'Tasty food, Tasty food, Tasty food, Tasty food',
  amount: 1,
};

const MockMenu = ({ mockedUser }: { mockedUser: UserState | null }) => {
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
    <AuthContext.Provider value={value}>
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

describe('Menu', () => {
  test('is render', () => {
    render(<MockMenu mockedUser={null} />);

    expect(screen.getByTestId('menu')).toBeInTheDocument();
    expect(screen.getByTestId('brand')).toBeInTheDocument();
  });

  test('has login and register buttons, when is no user', () => {
    render(<MockMenu mockedUser={null} />);

    expect(screen.getByTestId('login')).toBeInTheDocument();
    expect(screen.getByTestId('register')).toBeInTheDocument();
    expect(screen.queryByTestId('my-card-link')).not.toBeInTheDocument();
    expect(screen.queryByTestId('menu-toggle')).not.toBeInTheDocument();
  });

  test('has users actions, when user is logged in', () => {
    render(<MockMenu mockedUser={mockUser} />);

    expect(screen.getByTestId('my-card-link')).toBeInTheDocument();
    expect(screen.getByTestId('menu-toggle')).toBeInTheDocument();
    expect(screen.queryByTestId('login')).not.toBeInTheDocument();
    expect(screen.queryByTestId('register')).not.toBeInTheDocument();
  });

  test('has users actions, when user is logged in', () => {
    render(<MockMenu mockedUser={mockUser} />);

    expect(screen.getByTestId('my-card-link')).toBeInTheDocument();
    expect(screen.getByTestId('menu-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('menu-dropdown')).toBeInTheDocument();
  });

  test('has dropdown, which is collapse', () => {
    render(<MockMenu mockedUser={mockUser} />);
    const dropdown = within(screen.getByTestId('menu-dropdown'));
    userEvent.click(dropdown.getByRole('button'));

    expect(screen.getByTestId('menu-dropdown-item1')).toBeInTheDocument();
    expect(screen.getByTestId('menu-dropdown-item2')).toBeInTheDocument();
    expect(screen.getByTestId('logout')).toBeInTheDocument();
  });

  test('brand link navigates ', () => {
    render(<MockMenu mockedUser={mockUser} />);
    userEvent.click(screen.getByTestId('brand-link'));

    expect(mockedFunction).toBeCalled();
  });

  test('login link navigates ', () => {
    render(<MockMenu mockedUser={null} />);
    userEvent.click(screen.getByTestId('login'));

    expect(mockedFunction).toBeCalled();
  });

  test('login link navigates ', () => {
    render(<MockMenu mockedUser={null} />);
    userEvent.click(screen.getByTestId('register'));

    expect(mockedFunction).toBeCalled();
  });

  test('logout button is functional', async () => {
    render(<MockMenu mockedUser={mockUser} />);
    const dropdown = within(screen.getByTestId('menu-dropdown'));
    userEvent.click(dropdown.getByRole('button'));
    userEvent.click(screen.getByTestId('logout'));

    expect(await screen.findByTestId('login')).toBeInTheDocument();
    expect(screen.getByTestId('register')).toBeInTheDocument();
  });

  test('badge is not displayed, if the quantity of products is 0', () => {
    render(<MockMenu mockedUser={mockUser} />);

    expect(screen.queryByTestId('badge')).not.toBeInTheDocument();
  });

  test('badge shows number of 1 product', () => {
    render(<MockMenu mockedUser={{ ...mockUser, products: [pizza] }} />);

    expect(screen.getByTestId('badge')).toBeInTheDocument();
    expect(screen.getByTestId('badge').textContent).toEqual(`+${pizza.amount}`);
  });

  test('badge shows number of 3 products', () => {
    render(
      <MockMenu
        mockedUser={{ ...mockUser, products: [pizza, chicken, fries] }}
      />
    );

    const amounts = pizza.amount + chicken.amount + fries.amount;

    expect(screen.getByTestId('badge')).toBeInTheDocument();
    expect(screen.getByTestId('badge').textContent).toEqual(`+${amounts}`);
  });

  test('badge shows the number of 3 products with different quantities', () => {
    const chicken2 = {
      ...chicken,
      amount: 2,
    };

    const fries5 = {
      ...fries,
      amount: 5,
    };

    render(
      <MockMenu
        mockedUser={{ ...mockUser, products: [pizza, chicken2, fries5] }}
      />
    );

    const amounts = pizza.amount + chicken2.amount + fries5.amount;
    expect(screen.getByTestId('badge')).toBeInTheDocument();
    expect(screen.getByTestId('badge').textContent).toEqual(`+${amounts}`);
  });
});
