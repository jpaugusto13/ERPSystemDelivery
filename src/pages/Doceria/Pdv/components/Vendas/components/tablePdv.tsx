import { Table, TableData, TableHead, TableRow } from "../../../../../../shared/components/Table/Table";
import { useSale } from "../../../../../../hooks/useSale";
import { useEffect, useState } from "react";
import ProdutoType from "../../../../../../shared/types/ProdutoType";
import { NumericFormat } from "react-number-format";

function TablePdv() {
  const { productsSale } = useSale();

  const [produtos, setProdutos] = useState<Array<ProdutoType>>([]);

  useEffect(() => {
    setProdutos(() => [...productsSale]);
  }, [produtos, productsSale]);

  const uniqueProductIds = new Set();

  return (
    <div className="h-[21.3vw] overflow-scroll">
      <Table>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Produto</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Valor</TableHead>
        </TableRow>
        {produtos.length > 0 ? (
          produtos.map(({ id, nome, preco }, index) => {
            const arrayFilter: ProdutoType[] = produtos.filter((produto) => produto.id === id);
            const arraySize = arrayFilter.length;

            if (!uniqueProductIds.has(id)) {
              uniqueProductIds.add(id);

              return (
                <TableRow key={index}>
                  <TableData>{index+1}</TableData>
                  <TableData>{nome}</TableData>
                  <TableData>{arraySize}x</TableData>
                  <TableData>
                    <NumericFormat
                      value={preco}
                      color="000"
                      displayType={'text'}
                      thousandSeparator={'.'}
                      decimalSeparator={','}
                      prefix={'R$ '}
                      decimalScale={2}
                      fixedDecimalScale={true}
                    />
                  </TableData>
                </TableRow>
              );
            }

            return null;
          })
        ) : (
          <TableRow>
            <TableData>{" "}</TableData>
            <TableData>Nenhuma venda registrada no dia</TableData>
            <TableData>{" "}</TableData>
            <TableData>{" "}</TableData>
          </TableRow>
        )}
      </Table>
    </div>
  );
}

export default TablePdv;
