/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-empty-function */
import {
  createContext,
  PropsWithChildren,
  FC,
  useState,
  useEffect,
  useContext,
} from 'react';
import { mockUser } from '../mocks/moskUser';
import { Product, UserState } from '../types';

const LOCALSTORAGE_KEY_NAME = 'token';

const getTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(LOCALSTORAGE_KEY_NAME);
  } else {
    return null;
  }
};

type AuthContextType = {
  user: UserState | null;
  logout: () => void;
  login: (access_token: string) => void;
  addProduct: (newProduct: Product) => void;
  deleteProduct: (product: Product) => void;
  changeAmount: (product: Product, amount: number) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: mockUser,
  logout: () => {},
  login: (token: string) => {},
  addProduct: (newProduct: Product) => {},
  deleteProduct: (product: Product) => {},
  changeAmount: (product: Product, amount: number) => {},
});

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserState | null>(mockUser);

  const login = (token: string) => {
    localStorage.setItem(LOCALSTORAGE_KEY_NAME, token);
    setUser(mockUser);
  };

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      login(token);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem(LOCALSTORAGE_KEY_NAME);
    setUser(null);
  };

  const addProduct = (newProduct: Product) => {
    if (user) {
      const searchProduct = user.products.find(
        (item) => item.id === newProduct.id
      );
      const filteredProducts = user.products.filter(
        (item) => item?.id !== newProduct.id
      );

      const amountItem: Product = {
        ...newProduct,
        amount: searchProduct
          ? (searchProduct.amount! += 1)
          : newProduct.amount,
      };
      const products = [...filteredProducts, amountItem];
      setUser({ ...user, products: products });
    }
  };

  const changeAmount = (product: Product, amount: number) => {
    if (user) {
      const productIndex = user.products.indexOf(product);

      const amountItem: Product = {
        ...product,
        amount: (product.amount = amount),
      };

      const updateProducts = [...user.products];
      updateProducts.splice(productIndex, 1, amountItem);

      setUser({ ...user, products: updateProducts });
    }
  };

  const deleteProduct = (product: Product) => {
    if (user) {
      const products = user.products.filter((item) => item?.id !== product.id);

      setUser({ ...user, products: products });
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, addProduct, deleteProduct, changeAmount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
