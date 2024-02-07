import {
  Table,
  TableData,
  TableHead,
  TableRow,
} from '../../../../../../../shared/components/Table/Table';
import ProductType from '../../../../../../../types/ProdutoType';
import ProdutoType from '../../../../../../../types/ProdutoType';
import { NumericFormat } from 'react-number-format';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

type ProductSaleTableProps = {
  products: ProductType[];
}

function ProductSaleTable({ products }: ProductSaleTableProps) {
  const uniqueProductIds = new Set();

  return (
    <div className="h-[21.3vw] overflow-x-hidden shadow-md">
      <Table>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead>Qtd</TableHead>
          <TableHead>Desc</TableHead>
          <TableHead>Subtotal</TableHead>
          <TableHead> </TableHead>
        </TableRow>
        <tbody className="overflow-y-scroll">
          {products.length > 0 ? (
            products.map(({ id, nome, preco, desconto  }, index) => {
              const arrayFilter: ProdutoType[] = products.filter(
                (produto) => produto.id === id,
              );
              const arraySize = arrayFilter.length;

              if (!uniqueProductIds.has(id)) {
                uniqueProductIds.add(id);

                return (
                  <TableRow key={index}>
                    <TableData>{nome}</TableData>
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
                    <TableData>
                      {arraySize}x
                    </TableData>
                    <TableData><span className='flex rounded-lg p-1 bg-[#79E8BD]'>-{desconto.toString().replace(".00","")}%</span></TableData>
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
                    <TableData>
                      <button><DeleteOutlineIcon/></button>
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
