/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react';
import { Actions, productsReducer } from '../reducer/productsReducer';
import { Product } from '../types';

export type InitialState = {
  products: Array<Product>;
};

const initialState: InitialState = {
  products: [],
};

export const ProductsContext = createContext<InitialState>(initialState);

export const ProductsDispatchContext = createContext<Dispatch<Actions>>(
  () => {}
);

export const ProductsContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  return (
    <ProductsContext.Provider value={state}>
      <ProductsDispatchContext.Provider value={dispatch}>
        {children}
      </ProductsDispatchContext.Provider>
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);
export const useDispatchContext = () => useContext(ProductsDispatchContext);
