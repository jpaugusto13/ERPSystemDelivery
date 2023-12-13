import { createContext, ReactNode, useReducer } from 'react';
import api from '../services/api';
import { SaleType } from '../shared/types/SaleType';
import ProdutoType from '../shared/types/ProdutoType';

interface SaleContextData {
  fetchSale: (props: SaleType) => Promise<SaleType[]>;
  productsSale: Array<ProdutoType>;
  updateSaleProducts: (newProducts: Array<ProdutoType>) => void;
}

interface SaleProviderProps {
  children: ReactNode;
}

const saleReducer = (state: ProdutoType[], action: { type: string; payload: ProdutoType[] }) => {
  switch (action.type) {
    case 'SET_PRODUCTS_SALE':
      return action.payload;
    default:
      return state;
  }
};

export const SaleContext = createContext({} as SaleContextData);

function SaleProvider({ children }: SaleProviderProps) {
  const [productsSale, dispatch] = useReducer(saleReducer, []);

  const updateSaleProducts = (array: ProdutoType[]) => {
    dispatch({ type: 'SET_PRODUCTS_SALE', payload: array });
  };

  const fetchSale = async (props: SaleType) => {
    try {
      const response = await api.get('/sale/get', {
        params: { ...props },
      });

      return response.data.vendas;
    } catch (error) {
      console.error('Erro ao obter vendas:', error);
      throw error;
    }
  };

  return (
    <SaleContext.Provider value={{ fetchSale, productsSale, updateSaleProducts }}>
      {children}
    </SaleContext.Provider>
  );
}

export default SaleProvider;
