import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function Pdv() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('vendas');
  }, []);

  return (
    <div className="w-full">
      <nav className="flex relative z-30 justify-around h-[8vh] items-center shadow-md bg-gray-800 text-white w-full">
        <div className="px-5 xl:px-12 py-6 flex w-full items-center">
          <p className="text-3xl font-bold font-heading">Ponto de venda</p>
        </div>
        <ul className="flex-col flex-grow hidden pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
          <li className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <Link to="vendas">Vendas</Link>
          </li>
          <li className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <Link to="categorias">Categorias</Link>
          </li>
          <li className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <Link to="agendamentos">Agendamentos</Link>
          </li>
        </ul>
      </nav>
      <div className="w-full h-[92vh]">
        <Outlet />
      </div>
    </div>
  );
}

export default Pdv;