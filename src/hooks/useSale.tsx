import { useContext } from 'react';
import { SaleContext } from '../context/SaleContext';

export function useSale() {
  const context = useContext(SaleContext);

  const { fetchSale, productsSale, updateSaleProducts } = context;

  return {
    fetchSale,
    productsSale, 
    updateSaleProducts
  };
}