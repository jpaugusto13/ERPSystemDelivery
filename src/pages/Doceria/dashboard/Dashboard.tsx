import { useEffect, useState } from "react";

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import { NumericFormat } from "react-number-format";
import InfoCard from "./components/InfoCard/InfoCard";
import SalesChart from "./components/Chart/SalesChart";
import CapitalChart from "./components/Chart/CapitalChart";
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
import ProductChart from "./components/Chart/ProductChart";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

import PixIcon from '@mui/icons-material/Pix';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AlarmIcon from '@mui/icons-material/Alarm';

import { Table, TableRow, TableHead, TableData, TableDataColor } from "../../../shared/components/Table/Table";

import { SaleType } from "../../../shared/types/SaleType";
import ProdutoType from "../../../shared/types/ProdutoType";
import { useSale } from "../../../hooks/useSale";

function Dashboard() {
  const [ vendas, setVendas ] = useState(Array<SaleType>);
  const [ produtos, setProdutos ] = useState(Array<ProdutoType>);
  
  const { getSale } = useSale();

  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  // const [ somaAcumulativa, setSomaAcumulativa] = useState(0);
  // const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const getAaa = async () => {
      setVendas(await getSale({data_venda: `${year}-${month}-${day}`}))
    }

    getAaa();
  }, []);

  return (
    <div className="p-6 md:px-6 mx-auto w-full h-full bg-gray-100 grid grid-cols-4 gap-4">

        <div className="col-span-3 rounded-xl bg-white p-3 shadow-lg hover:shadow-xl duration-300">
          <div className="p-3">
            <h1 className="font-medium font">Faturamento diário</h1>
          </div>
          <div className="h-[27em] overflow-x-hidden">
            <Table>
              <TableRow>
                <TableHead>
                  #
                </TableHead>
                <TableHead>
                  Forma de pagamento
                </TableHead>
                <TableHead>
                  Valor
                </TableHead>
                <TableHead>
                  Status da venda
                </TableHead>
                <TableHead>
                  Hora
                </TableHead>
              </TableRow>
              {
                vendas.length > 0 ? (
                  vendas.map(({pagamento, status_venda, hora_venda}, index) => {
            
                    const totalValorVenda = pagamento.reduce((acumulador, { valor }) => acumulador + valor, 0);
                    return (
                      <TableRow>
                        <TableData>{vendas.length-index}</TableData>
                        <TableData>{pagamento.map(({type}) => {
                            if(type == "pix") {
                              return <PixIcon />
                            }
                        
                            else if(type == "debito" || type == "credito")  {
                              return <CreditCardIcon />
                            }
                        
                            else if(type == "dinheiro") {
                              return <LocalAtmIcon />
                            }
                        })} {pagamento.length > 1 ? "Mista" : pagamento.map(({type}) => type)}</ TableData>
                        <TableData>{<NumericFormat value={totalValorVenda} color="000" displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'R$ '} decimalScale={2} fixedDecimalScale={true}/>}</TableData>
                        <TableDataColor color={status_venda}>{status_venda.charAt(0).toUpperCase() + status_venda.slice(1).toLowerCase()}</TableDataColor>
                        <TableData>{hora_venda.substring(0,5)} {<AlarmIcon />}</TableData>
                      </TableRow>
                    )
                  })
                ) : (
                <TableRow>
                  <TableData>{" "}</TableData>
                  <TableData>{" "}</TableData>
                  <TableData>Nenhuma venda registrada no dia {`${day}/${month}/${year}`}</TableData>
                  <TableData>{" "}</TableData>
                  <TableData>{" "}</TableData>
                </TableRow>)
              }
            </Table>
          </div>
        </div>

        <div className="col-span-1 rounded-xl bg-white p-3 shadow-lg hover:shadow-xl duration-300">
          <div className="p-3">
            <h1 className="font-medium font">Estoque</h1>
          </div>
          <div className="w-full h-full">
            <ProductChart />
          </div>
        </div>

        <div className="col-span-2 w-full rounded-xl bg-white p-3 shadow-lg hover:shadow-xl duration-300">
          <CapitalChart/>
        </div>
        <div className="col-span-2  w-full rounded-xl bg-white p-3 shadow-lg hover:shadow-xl duration-300">
          <SalesChart/>
        </div>

      <div className="col-span-4 py-6 w-full flex flex-wrap">
        <InfoCard title="Faturamento Mensal" color="000" icon={<MonetizationOnIcon />} value={<NumericFormat value={0} color="000" displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'R$ '} decimalScale={2} fixedDecimalScale={true}/>}/>
        <InfoCard title="Despesa Mensal" color="#d51b5e" icon={<TrendingDownOutlinedIcon />} value={<NumericFormat value={0} color="000" displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'R$ '} decimalScale={2} fixedDecimalScale={true}/>} />
        <InfoCard title="Montante Mensal" color="#1bdb68" icon={<MonetizationOnIcon />} value={<NumericFormat value={0} color="000" displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'R$ '} decimalScale={2} fixedDecimalScale={true}/>}/>
        <InfoCard title="Montante anual" color="#d51b5e" icon={<MonetizationOnIcon />} value={<NumericFormat value={0} color="000" displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'R$ '} decimalScale={2} fixedDecimalScale={true}/>}/>
      </div>
    </div>
  )
}

export default Dashboard;
