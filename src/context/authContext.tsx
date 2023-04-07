/* eslint-disable @typescript-eslint/no-empty-function */
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

const LOCALSTORAGE_KEY_NAME = 'email';

const getDataFromLocalStorage = () =>
  typeof window !== 'undefined'
    ? localStorage.getItem(LOCALSTORAGE_KEY_NAME)
    : null;

export type AuthContextType = {
  user: UserState | null;
  logout: () => void;
  login: (email: string, password: string) => void;
  addProduct: (newProduct: Product) => void;
  deleteProduct: (product: Product) => void;
  changeAmount: (product: Product, amount: number) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: () => {},
  login: (email: string, password: string) => {},
  addProduct: (newProduct: Product) => {},
  deleteProduct: (product: Product) => {},
  changeAmount: (product: Product, amount: number) => {},
});

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserState | null>(null);

  const login = (email: string, password: string) => {
    if (email === mockUser.email && password === mockUser.password) {
      localStorage.setItem(LOCALSTORAGE_KEY_NAME, mockUser.email);
      setUser(mockUser);
    }
  };

  const logout = () => {
    localStorage.removeItem(LOCALSTORAGE_KEY_NAME);
    setUser(null);
  };

  const addProduct = (newProduct: Product) => {
    if (!user) return;
    const products = user.products;
    const productIndex = products.findIndex(
      (item) => item.id === newProduct.id
    );

    if (productIndex > -1) {
      products[productIndex].amount += 1;
    } else {
      products.push({ ...newProduct, amount: 1 });
    }
    setUser({ ...user, products });
  };

  const changeAmount = (product: Product, amount: number) => {
    if (!user) return;

    const products = [...user.products];
    const productIndex = products.findIndex((item) => item.id === product.id);

    if (productIndex > -1) {
      products[productIndex].amount = amount;
      setUser({ ...user, products });
    }
  };

  const deleteProduct = (product: Product) => {
    if (!user) return;

    const products = user.products.filter((item) => item?.id !== product.id);

    setUser({ ...user, products: products });
  };

  useEffect(() => {
    const userEmail = getDataFromLocalStorage();
    if (userEmail === mockUser.email) {
      login(mockUser.email, mockUser.password);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, addProduct, deleteProduct, changeAmount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
