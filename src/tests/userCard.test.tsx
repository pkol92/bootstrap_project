import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { debug } from 'console';
import { useReducer, useState } from 'react';
import { UserCard } from '../components/UserCard';
import { AuthContext } from '../context/authContext';
import {
  ProductsContext,
  ProductsContextProvider,
  ProductsDispatchContext,
} from '../context/productsContext';
import { mockUser } from '../mocks/moskUser';
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
    amount: 9,
  },
];

// const state = { products: mockProducts };
// const dispatch = jest.fn();

// const MockUserCard = () => {
//   const [user, setUser] = useState({ ...mockUser, products: mockProducts });

//   const value = {
//     logout: mockedFunction,
//     user: user,
//     login: mockedFunction,
//     setUser: mockedFunction,
//   };

//   return (
//     <ProductsContext.Provider value={state}>
//       <ProductsDispatchContext.Provider value={dispatch}>
//         <AuthContext.Provider value={value}>
//           <UserCard items={user.products} />
//         </AuthContext.Provider>
//       </ProductsDispatchContext.Provider>
//     </ProductsContext.Provider>
//   );
// };

// const mockUseContext = jest
//   .fn()
//   .mockImplementation(() => ({ state, dispatch }));
// React.useContext(mockUseContext);

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

  //   test('is not showing product after remove action', async () => {
  //     render(<UserCard items={mockProducts} />);
  //     const firstDeleteButton = screen.getAllByRole('button')[1];
  //     userEvent.click(firstDeleteButton);
  //     await new Promise(process.nextTick);
  //     // // expect(mockedFunction).toBeCalled();
  //     expect(screen.queryByText('Fries')).not.toBeInTheDocument();
  //   });

  test('shows total price of all products', () => {
    render(<UserCard items={mockProducts} />);
    const amount = (9 * 2.05 + 0.99).toFixed(2);
    expect(screen.getByTestId('table-price-sum').textContent).toEqual(amount);
  });
});
