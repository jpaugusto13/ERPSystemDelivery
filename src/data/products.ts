import { QueryFunction } from "@tanstack/react-query";
import api from "../services/api";
import ProdutoType from "../types/ProdutoType";

export const createProduct = async (props: ProdutoType) : Promise<void> => await api.post("/product/create", {...props})

export const getProducts: QueryFunction<ProdutoType[], string[], ProdutoType[]> = async (_, props?: ProdutoType) => {
  return await api.get("product/get", { params: { ...props }}).then(({ data }) => data.response);
}
