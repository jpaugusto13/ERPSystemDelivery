import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import api from '../../../../../services/api';
import ProdutoType from '../../../../../shared/types/ProdutoType';

ChartJS.register(ArcElement, Tooltip, Legend);

function ProductChart() {
  const [produtosAtivos, setProdutosAtivos] = useState(Array<ProdutoType>);
  const [produtosFalta, setProdutosFalta] = useState(Array<ProdutoType>);

  useEffect(() => {
    const getProdutos = async () => {
      const produtos: ProdutoType[] = await api.post("/product/get").then(response => response.data.produtos);
      const ativos: ProdutoType[] = produtos.filter(produto => produto.quantidade > 0) ;
      const faltas: ProdutoType[] = produtos.filter(produto => produto.quantidade == 0) ;

      setProdutosAtivos(ativos);
      setProdutosFalta(faltas);
    }
    getProdutos();
  }, []);

  const data = {
    labels: ['Produtos Inativos', 'Produtos Ativos'],
    datasets: [
      {
        label: 'Estoque',
        data: [produtosFalta.length, produtosAtivos.length],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
}

export default ProductChart;