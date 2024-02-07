import ProductType from "./ProdutoType";

export type PaymentType = {
  forma_pagamento: string;
  valor: number;
};

export type SaleType = {
  id?: number;
  pagamento?: PaymentType[];
  data_venda?: Date;
  hora_venda?: string;
  produtos?: ProductType[];
  observacao?: string;
  status_venda?: "concluida" | "cancelada" | "analise";
}
