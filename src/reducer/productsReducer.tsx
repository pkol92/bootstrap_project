import { InitialState } from '../context/productsContext';
import { Product } from '../types';

export type Actions =
  | { type: 'ADD'; payload: Product }
  | { type: 'UPDATE'; payload: { product: Product; newAmount?: number } }
  | { type: 'DELETE'; payload: Product };

export const productsReducer = (state: InitialState, action: Actions) => {
  switch (action.type) {
    case 'ADD': {
      return { ...state, products: [...state.products, action.payload] };
    }

    case 'UPDATE': {
      const { product, newAmount } = action.payload;

      return {
        ...state,
        products: state.products.map((item) =>
          item.id === product.id
            ? { ...item, amount: newAmount ? newAmount : (item.amount += 1) }
            : item
        ),
      };
    }
    case 'DELETE': {
      return {
        ...state,
        products: state.products.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    }
    default:
      return state;
  }
};
