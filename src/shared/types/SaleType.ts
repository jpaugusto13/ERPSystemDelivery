export type PagamentoType = {
  type: string;
  valor: number;
}

export type SaleType = {
  id?: number;
  pagamento?: PagamentoType[];
  valor_venda?: number;
  data_venda?: Date | string;
  hora_venda?: string;
  id_produto_vendido?: number;
  status_venda?: "concluída" | "cancelada" | "analise";
};