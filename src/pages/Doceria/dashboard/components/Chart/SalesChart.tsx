import { useEffect, useState } from 'react';
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
import api from '../../../../../services/api';
import { SaleType } from '../../../../../shared/types/SaleType';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const date = new Date();
const year = date.getFullYear()

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Vendas Anuais - '+year,
    },
  },
};

const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export default function SalesChart() {
  const [montanteVendasAnual, setMontanteVendasAnual] = useState(Array<number>);

  useEffect(() => {
    const getProdutos = async () => {
      const vendas: SaleType[] = await api.get('/sale/get').then(response => response.data.vendas);

      let vendasAnual: Array<number> = [];
      vendasAnual = [];

      labels.forEach((_, index) => {
        const numeralMensal = Number(index + 1);

        const vendasMensal = vendas.filter(({ data_venda }) => {
          const data = data_venda.toString().replace("T", " ").split(" ");
          const dataFormatada = data[0].replace("-", " ").replace("-", " ").split(" ");
          const mesFormatado = dataFormatada[1];

          return Number(mesFormatado) == numeralMensal;
        });

        const vendasValidas = vendasMensal.filter(({ status_venda }) => status_venda == "concluída")
        vendasAnual.push(vendasValidas.length);
      });

      setMontanteVendasAnual(vendasAnual);
    };
    getProdutos();
  }, []);
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Montante',
        data: labels.map((_, index) => montanteVendasAnual[index]),
        borderColor: '#6495ED',
        backgroundColor: '#6495ED',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
