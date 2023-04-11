/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { Product } from '../types';
import { useAuthContext } from './authContext';

export type ProductsContextType = {
  addProduct: (newProduct: Product) => void;
  deleteProduct: (product: Product) => void;
  changeAmount: (product: Product, amount: number) => void;
};

export const ProductsContext = createContext<ProductsContextType>({
  addProduct: (newProduct: Product) => {},
  deleteProduct: (product: Product) => {},
  changeAmount: (product: Product, amount: number) => {},
});

export const ProductsContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { user, setUser } = useAuthContext();

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

  return (
    <ProductsContext.Provider
      value={{ addProduct, deleteProduct, changeAmount }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);
