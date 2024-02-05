import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import { NumericFormat } from 'react-number-format';
import InfoCard from './components/Cards/InfoCard';
import SalesChart from './components/Charts/SalesChart';
import CapitalChart from './components/Charts/CapitalChart';
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
import ProductChart from './components/Charts/ProductChart';

import SaleTable from './components/Tables/SaleTable';

function Dashboard() {
  return (
    <div className="p-6 md:px-6 mx-auto w-full h-full bg-gray-100 grid grid-cols-4 gap-4 overflow-scroll overflow-x-hidden">

      <div className="col-span-3 rounded-xl bg-white p-3 shadow-lg hover:shadow-xl duration-300">

        <div className="p-3">
          <h1 className="font-medium font">Faturamento diário</h1>
        </div>
        <div className="h-[27em] overflow-x-hidden">
          <SaleTable />
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
        <CapitalChart />
      </div>
      <div className="col-span-2  w-full rounded-xl bg-white p-3 shadow-lg hover:shadow-xl duration-300">
        <SalesChart />
      </div>

      <div className="col-span-4 py-6 w-full flex flex-wrap">
        <InfoCard
          title="Faturamento Mensal"
          color="000"
          icon={<MonetizationOnIcon />}
          value={
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
        />
        <InfoCard
          title="Despesa Mensal"
          color="#d51b5e"
          icon={<TrendingDownOutlinedIcon />}
          value={
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
        />
        <InfoCard
          title="Montante Mensal"
          color="#1bdb68"
          icon={<MonetizationOnIcon />}
          value={
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
        />
        <InfoCard
          title="Montante anual"
          color="#d51b5e"
          icon={<MonetizationOnIcon />}
          value={
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
        />
      </div>
    </div>
  );
}

export default Dashboard;
