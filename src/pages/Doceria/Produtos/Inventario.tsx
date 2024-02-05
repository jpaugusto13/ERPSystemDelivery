import { useState } from "react";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { getProducts } from "../../../data/products";
import { useQuery } from "@tanstack/react-query";
import { NumericFormat } from "react-number-format";
import CategoriaHeader from "./components/Inventário/components/CategoriaHeader/CategoriaHeader";

import AddIcon from '@mui/icons-material/Add';
import ModalSignProduct from "./components/Inventário/components/RegistrarProduto/RegistrarProduto";

const classNameaa =
  'absolute h-10 top-2 right-2 flex items-center space-x-1.5 rounded-lg bg-blue-500 px-2 py-1.5 text-white duration-100 hover:bg-blue-600';

function Inventario() {
  const [isModalSignProduct, setIsModalSignProduct] = useState(false);

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })
  
  return (
    <>
      <nav className="flex justify-around h-[8vh] items-center bg-gray-800 text-white w-full">
        <div className="px-5 xl:px-12 py-6 flex w-full items-center">
          <p className="text-3xl font-bold font-heading">Estoque</p>
        </div>
      </nav>

      <ModalSignProduct
        openModal={isModalSignProduct}
        onCloseModal={setIsModalSignProduct}
      />

      <CategoriaHeader />

      <div className="h-[74vh] overflow-y-scroll p-6 bg-gray-100 mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {products?.map(({ nome, preco, descricao, imagem }) => (
          <article
                key={nome + imagem}
                className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 "
              >
                <div className="relative flex items-end overflow-hidden rounded-xl">
                  <img  className="w-full" height={150} src={imagem} alt={descricao}/>
                    <button className={classNameaa}>
                      <ModeEditOutlineOutlinedIcon />
                    </button>
                </div>

                <div className="mt-1 p-2">
                  <h2 className="text-slate-700">{nome}</h2>
                  <p className="mt-1 text-sm text-slate-400">{descricao}</p>
                  <div className="mt-3 flex items-end justify-between">
                    <p className="text-lg font-bold text-blue-500">
                      {
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
                      }
                    </p>
                  </div>
                </div>
              </article>
            ))
          }
          <div className='flex items-center justify-center'>
            <button onClick={() => setIsModalSignProduct(true)} className='p-4 items-center rounded-lg bg-blue-500 text-white duration-100 hover:bg-blue-600'>
              <AddIcon />
            </button>
          </div>
      </div>
    </>
  );
}

export default Inventario;
