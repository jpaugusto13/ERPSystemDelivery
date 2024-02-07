import { useState } from 'react';
import { NumericFormat } from 'react-number-format';

import AddIcon from '@mui/icons-material/Add';

import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../../../../data/products';
import ModalSignProduct from './components/RegistrarProduto/RegistrarProduto';
import CategoriaHeader from './components/CategoriaHeader/CategoriaHeader';
import { Product } from '../Product/Product';

function EstoqueProdutos() {
  const [isModalSignProduct, setIsModalSignProduct] = useState(false);

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  return (
    <div className='overflow-y-scroll w-full'>
      <ModalSignProduct
        openModal={isModalSignProduct} onCloseModal={setIsModalSignProduct}/>
      <CategoriaHeader />

        <div className="p-6 overflow-y-scroll bg-gray-100 mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {products?.map(({ id, nome, preco, descricao, imagem }) => <Product id={id} quantidade={0} nome={nome} preco={preco} descricao={descricao} imagem={imagem} />)}
          <div className='flex items-center justify-center'>
            <button onClick={() => setIsModalSignProduct(true)} className='p-4 items-center rounded-lg bg-blue-500 text-white duration-100 hover:bg-blue-600'>
              <AddIcon />
            </button>
          </div>
        </div>
    </div>
  );
}

export default EstoqueProdutos;
