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
  isLoading: boolean;
  logout: () => void;
  login: (access_token: string) => void;
  addProduct: (newProduct: Product) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: mockUser,
  isLoading: false,
  logout: () => {},
  login: (token: string) => {},
  addProduct: (newProduct: Product) => {},
});

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserState | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [products, setProducts] = useState<Array<Product | null>>(() =>
  //   user ? user.products : []
  // );

  const login = (token: string) => {
    localStorage.setItem(LOCALSTORAGE_KEY_NAME, token);
    setUser(mockUser);
  };

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    setIsLoading(false);
    if (token) {
      login(token);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem(LOCALSTORAGE_KEY_NAME);
    setUser(null);
  };

  const addProduct = (newProduct: Product) => {
    // setProducts([...products, newProduct]);
    console.log('cos');
    if (user) {
      setUser({ ...user, products: [...user.products, newProduct] });
      console.log('done');
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, addProduct }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
