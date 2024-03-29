/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createContext,
  PropsWithChildren,
  FC,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { mockUser } from '../mocks/moskUser';
import { UserState } from '../types';
import { useProductsContext } from './productsContext';

const LOCALSTORAGE_KEY_NAME = 'email';

const getDataFromLocalStorage = () =>
  typeof window !== 'undefined'
    ? localStorage.getItem(LOCALSTORAGE_KEY_NAME)
    : null;

export type AuthContextType = {
  user: UserState | null;
  logout: () => void;
  login: (email: string, password: string) => void;
  setUser: (user: UserState) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: () => {},
  login: (email: string, password: string) => {},
  setUser: (user: UserState) => {},
});

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserState | null>(null);
  const { products } = useProductsContext();

  const login = useCallback(
    (email: string, password: string) => {
      if (email === mockUser.email && password === mockUser.password) {
        localStorage.setItem(LOCALSTORAGE_KEY_NAME, mockUser.email);
        setUser({ ...mockUser, products: products });
      }
    },
    [products]
  );

  const logout = () => {
    localStorage.removeItem(LOCALSTORAGE_KEY_NAME);
    setUser(null);
  };

  useEffect(() => {
    const userEmail = getDataFromLocalStorage();
    if (userEmail === mockUser.email) {
      login(mockUser.email, mockUser.password);
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
