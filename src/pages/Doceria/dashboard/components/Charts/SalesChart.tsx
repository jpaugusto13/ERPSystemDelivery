import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { useQuery } from '@tanstack/react-query';
import { getSales } from '../../../../../data/sales';
import { useEffect, useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: 'Vendas Anuais - ' + year,
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

export default function SalesChart() {
  const [ salesQuantity, setSalesQuantity ] = useState<number[]>([])

  const { data: sales } = useQuery({ 
    queryKey: ['sales'],
    queryFn: () => getSales({status_venda: "concluída"}),
  })

  useEffect(() => {
    const arraySales: number[] = [];

    labels.forEach((_, index) => {
      const salesMonth = sales?.filter(({ data_venda }) => {
        const saleDate = data_venda ? new Date(data_venda) : null;
        return saleDate && saleDate.getMonth() + 1 === Number(index+1);
      })

      salesMonth && arraySales.push(salesMonth.length);
    })
  
    setSalesQuantity(arraySales);
  }, [sales]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Vendas',
        data: labels.map((_, index) => salesQuantity[index]),
        borderColor: '#6495ED',
        backgroundColor: '#6495ED',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
