import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getProducts } from '../../../../../data/products';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const redColor = 'rgba(255, 99, 132, 0.2)';
const redBorder = 'rgba(255, 99, 132, 1)';

const blueColor = 'rgba(54, 162, 235, 0.2)';
const blueBorder = 'rgba(54, 162, 235, 1)';

function ProductChart() {
  const [ activeProducts, setActiveProducts ] = useState<number>(0);
  const [ inactiveProducts, setInactiveProducts ] = useState<number>(0);

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })
  
  useEffect(() => {
    products && setActiveProducts(products?.filter(({ quantidade }) => quantidade > 0).length)
    products && setInactiveProducts(products.filter(({ quantidade }) => quantidade == 0).length)
  }, [ products ])

  const data = {
    labels: ['Produtos Inativos', 'Produtos Ativos'],
    datasets: [
      {
        label: 'Estoque',
        data: [ inactiveProducts, activeProducts ],
        backgroundColor: [redColor, blueColor],
        borderColor: [redBorder, blueBorder],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
}

export default ProductChart;
