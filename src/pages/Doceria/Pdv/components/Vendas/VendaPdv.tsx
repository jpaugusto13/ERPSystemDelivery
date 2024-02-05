import {useState } from 'react';
import { NumericFormat } from 'react-number-format';

import AlarmIcon from '@mui/icons-material/Alarm';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DoneIcon from '@mui/icons-material/Done';
import PaymentIcon from '@mui/icons-material/Payment';

import EstoqueProdutos from '../../../Produtos/components/Inventário/EstoqueProdutos';
import ProductSaleTable from './components/Tabela/ProductSaleTable';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonPdv from './components/Button/ButtonPdv';
import ModalPayment from './components/Modal/ModalPayment';

function VendaPdv() {
  const [isModalPayment, setIsModalPayment] = useState(false);

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

      <div className="grid grid-cols-2 w-full h-full">
        <div className="col-span-1">
          <EstoqueProdutos button="venda" descricaoOn={false} />
        </div>

        <div className="grid col-span-1">
          <div className="col-span-2 overflow-y-hidden">
            <ProductSaleTable />
          </div>

          <div className="p-4">
            <h1 className="text-3xl">Total da Venda</h1>
            <h2 className="">
              {
                <NumericFormat
                  value={0}
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
              {pagamento.map(({ forma_pagamento, valor }) => (
                <>
                  <h1>
                    Forma de pagamento <br /> R${' '}
                    {valor.toFixed(2).toString().replace('.', ',')} -{' '}
                    <span className="capitalize">{forma_pagamento}</span>
                  </h1>
                </>
              ))}
            </h3>
          </div>

          <div className="grid p-4 gap-2 rounded-sm grid-cols-2 col-span-2">
            <ButtonPdv
              onClick={() => null}
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
