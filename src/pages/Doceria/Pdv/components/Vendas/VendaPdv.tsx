import {useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';

import AlarmIcon from '@mui/icons-material/Alarm';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DoneIcon from '@mui/icons-material/Done';
import PaymentIcon from '@mui/icons-material/Payment';

import ProductSaleTable from './components/Tabela/ProductSaleTable';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonPdv from './components/Button/ButtonPdv';
import ModalPayment from './components/Modal/ModalPayment';
import { Product } from '../../../Produtos/components/Product/Product';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../../../../data/products';
import ProductType from '../../../../../types/ProdutoType';
import Swal from 'sweetalert2';
import { createSale } from '../../../../../data/sales';

import CurrencyInput from '../../../../../shared/components/Form/CurrencyInput';

function VendaPdv() {

  const [isModalPayment, setIsModalPayment] = useState(false);

  const [productsSale, setProductsSale] = useState<ProductType[]>([]);
  const [availableProducts, setAvailableProducts] = useState<ProductType[]>([]);
  const [amountSale, setAmountSale] = useState(0);

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })
  useEffect(() => {
    products && setAvailableProducts(products?.filter(({ quantidade }) => quantidade > 0 ))
  }, [ products ])

  useEffect(() => {
    const amount: number = productsSale.reduce((accumulator, { preco }) => Number(accumulator) + Number(preco), 0);
    setAmountSale(amount)
  }, [ productsSale ])

  const getProductById = (idProduct: number) => {
    const productFilter: ProductType[] | undefined = products?.filter(({id}) => id === idProduct);

    const product : ProductType | undefined = productFilter && productFilter[0];
    product && setProductsSale([...productsSale, product]);
  }
  
  const handleCancel = () => {
    if(productsSale.length > 0) {
      Swal.fire({
        title: "Você tem certeza que quer cancelar a venda?",
        text: "Você não pode reverter essa ação",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#5cb85c",

        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        reverseButtons: true,
        cancelButtonText: "Não"
      }).then((result) => {
        if (result.isConfirmed) {
          setProductsSale([]);
          Swal.fire({
            title: "Sucesso!",
            text: "Venda cancelada!",
            icon: "success"
          });
        }
      });
    } else {
      toast.error("Nenhum produto foi adicionado à tabela de venda" , {
        position: "top-right",
        autoClose: 5000,
        rtl: false,
        theme: "colored"
      })
    }
  }

  const handleConfirm = async () => {
    await createSale({produtos: productsSale,  })
  }

  return (
    <>
      <ModalPayment
        openModal={isModalPayment}
        onCloseModal={setIsModalPayment}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="grid grid-cols-2 w-full h-full overflow-hidden">
       <div className="p-5 w-full h-full col-span-1 overflow-y-scroll bg-gray-100 mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {availableProducts?.map(({ id, nome, preco, descricao, imagem, quantidade, desconto }) => (
            <div className='h-full cursor-pointer' onClick={() => getProductById(id)}>
              <Product desconto={desconto} quantidade={quantidade} id={id} nome={nome} preco={preco} descricao={descricao} imagem={imagem} />
            </div>
          ))}
        </div>

        <div className="grid col-span-1">
          <div className="col-span-2 overflow-y-hidden">
            <ProductSaleTable products={productsSale} />
          </div>

          <div className="p-4">
            <h1 className="text-3xl">Total da Venda</h1>
            <h2 className="">
              {
                <NumericFormat
                  value={amountSale}
                  color="000"
                  displayType={'text'}
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                  prefix={'R$ '}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
              }
            </h2>
            <h3>
              <CurrencyInput />
            </h3>
          </div>

          <div className="grid p-4 gap-2 rounded-sm grid-cols-2 col-span-2">
            <ButtonPdv
              onClick={() => handleCancel()}
              className="bg-red-600"
              icon={<DoNotDisturbIcon />}
            >
              Cancelar Venda
            </ButtonPdv>
            <ButtonPdv
              onClick={() => null}
              className="bg-yellow-600"
              icon={<AlarmIcon />}
            >
              Agendar Venda
            </ButtonPdv>
            <ButtonPdv
              onClick={() => null}
              className="bg-blue-600"
              icon={<PaymentIcon />}
            >
              Forma de pagamento
            </ButtonPdv>
            <ButtonPdv
              onClick={() => null}
              className="bg-green-600"
              icon={<DoneIcon />}
            >
              Finalizar Venda
            </ButtonPdv>
          </div>
        </div>
      </div>
    </>
  );
}

export default VendaPdv;
