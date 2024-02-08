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
    <div className='flex flex-col gap-6 p-2 w-full'>
      {products?.map(({ id, nome, preco, desconto, imagem  }, index) => {
          const arrayFilter: ProdutoType[] = products.filter(
            (produto) => produto.id === id,
          );
          const arraySize = arrayFilter.length;

          if (!uniqueProductIds.has(id)) {
            uniqueProductIds.add(id);

            return (
              <div className='flex w-full shadow-sm gap-3 px-5 py-3 items-center' key={index}>
                <div>
                  <img className='cover h-[80px] w-[120px] rounded-2xl shadow-xl' src={imagem} alt={nome+id} />
                </div>

                <div className='flex flex-col w-full p-2 gap-2'>
                  <h1>{nome}</h1>
                  <div className='flex justify-between'>
                    <p>x{arraySize} </p>

                    <span className='text-slate-400'>
                      <NumericFormat 
                      value={preco}
                      displayType={'text'}
                      thousandSeparator={'.'}
                      decimalSeparator={','}
                      prefix={'R$ '}
                      decimalScale={2}
                      fixedDecimalScale={true}/>
                    </span>
                  </div>

                </div>
              </div>
            );
          }

          return null;
        })
      }
    </div>
  )
}

export default ProductSaleTable;
