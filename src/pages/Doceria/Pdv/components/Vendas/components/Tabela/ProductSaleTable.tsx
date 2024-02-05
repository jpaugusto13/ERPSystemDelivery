import {
  Table,
  TableData,
  TableHead,
  TableRow,
} from '../../../../../../../shared/components/Table/Table';
import { useState } from 'react';
import ProdutoType from '../../../../../../../types/ProdutoType';
import { NumericFormat } from 'react-number-format';

function ProductSaleTable() {
  const [produtos, setProdutos] = useState<Array<ProdutoType>>([]);

  const uniqueProductIds = new Set();

  return (
    <div className="h-[21.3vw] overflow-x-hidden shadow-md">
      <Table>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Produto</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Valor</TableHead>
        </TableRow>
        <tbody className="overflow-y-scroll">
          {produtos.length > 0 ? (
            produtos.map(({ id, nome, preco }, index) => {
              const arrayFilter: ProdutoType[] = produtos.filter(
                (produto) => produto.id === id,
              );
              const arraySize = arrayFilter.length;

              if (!uniqueProductIds.has(id)) {
                uniqueProductIds.add(id);

                return (
                  <TableRow key={index}>
                    <TableData>{index + 1}</TableData>
                    <TableData>{nome}</TableData>
                    <TableData>{arraySize}x</TableData>
                    <TableData>
                      <NumericFormat
                        value={preco * arraySize}
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
              <TableData> </TableData>
              <TableData>Nenhum produto adicionado</TableData>
              <TableData> </TableData>
              <TableData> </TableData>
            </TableRow>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductSaleTable;
