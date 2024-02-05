import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getSales } from '../../../../../data/sales';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const date = new Date();
const year = date.getFullYear();
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Capital Anual - ' + year,
    },
  },
};

const labels = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export default function CapitalChart() {
  const [ amountMonth, setAmountMonth ] = useState<number[]>([]);
  
  const { data: sales } = useQuery({
    queryKey: ['sales'],
    queryFn: () => getSales({ status_venda: "concluída" }),
  })

  useEffect(() => {
    const arrayAmount: number[] = [];

    labels.forEach((_, index) => {
      const salesMonth = sales?.filter(({ data_venda }) => {
        const saleDate = data_venda ? new Date(data_venda) : null;
        return saleDate && saleDate.getMonth() + 1 === Number(index+1);
      })

      const amountMonthValue : number | undefined = salesMonth?.reduce((accumulator, { pagamento }) => {
        const payment =
          pagamento?.reduce(
            (paymentAccumulator, { valor }) =>
              Number(paymentAccumulator.toFixed(2)) +
              Number(valor.toFixed(2)),
            0,
          ) || 0;
        return Number(payment.toFixed(2)) + Number(accumulator.toFixed(2));
      }, 0)

      amountMonthValue && arrayAmount.push(amountMonthValue);
    })
    setAmountMonth(arrayAmount)
  }, [sales]);
  

  const data = {
    labels,
    datasets: [
      {
        label: 'Capital R$',
        data: labels.map((_, index) => Number(amountMonth[index])),
        borderColor: '#58d68d',
        backgroundColor: '#58d68d',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}