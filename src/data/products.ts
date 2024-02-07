import { QueryFunction } from "@tanstack/react-query";
import api from "../services/api";
import ProductType from "../types/ProdutoType";

export const createProduct = async (props: ProductType) : Promise<void> => await api.post("/product/create", { ...props })

export const getProducts: QueryFunction<ProductType[], string[], ProductType[]> = async (_, props?: ProductType) => {
  return await api.get("product/get", { params: { ...props }}).then(({ data }) => data.response);
}
