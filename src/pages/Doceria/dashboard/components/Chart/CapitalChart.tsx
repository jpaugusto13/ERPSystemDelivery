import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { SaleType, PagamentoType } from '../../../../../shared/types/SaleType';
import api from '../../../../../services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export default function CapitalChart() {
  const [montanteCapitalAnual, setMontanteCapitalAnual] = useState<Array<number>>([]);

  useEffect(() => {
    const getProdutos = async () => {
      const vendas: SaleType[] = await api.get('/sale/get').then(response => response.data.vendas);

      let capitalAnual: number[] = [];
      capitalAnual = [];
      labels.forEach((_, index) => {
        const numeralMensal = Number(index + 1);

        const vendasMensal = vendas.filter(({ data_venda }) => {
          const data = data_venda?.toString().replace("T", " ").split(" ");
          const dataFormatada = data?.[0].replace("-", " ").replace("-", " ").split(" ");
          const mesFormatado = dataFormatada?.[1];

          return Number(mesFormatado) === numeralMensal;
        });

        if (vendasMensal.length > 0) {
          const vendasValidas = vendasMensal.filter(({ status_venda }) => status_venda === "concluída");

          if (vendasValidas.length > 0) {
            const montanteMensal = vendasValidas.reduce((acumulador, venda: SaleType) => {
              const somaValores = venda.pagamento?.reduce((acumuladorPagamento: number, pagamento: PagamentoType) => {
                return acumuladorPagamento + pagamento.valor;
              }, 0) || 0;

              return acumulador + somaValores;
            }, 0);

            capitalAnual.push(montanteMensal);
          } else {
            capitalAnual.push(0);
          }
        } else {
          capitalAnual.push(0);
        }
      });

      setMontanteCapitalAnual(capitalAnual);
    };

    getProdutos();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: 'Capital $',
        data: labels.map((_, index) => Number(montanteCapitalAnual[index])),
        borderColor: '#58d68d',
        backgroundColor: '#58d68d',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
