import api from "../services/api";
import { SaleType } from "../types/SaleType";

export const createSale = async (props: SaleType) : Promise<void> => await api.post('/sale/post', { ...props });

export const getSales = async (props?: SaleType) : Promise<SaleType[]> => await api.get('/sale/get', { params: { ...props } }).then(({ data }) => data.vendas );