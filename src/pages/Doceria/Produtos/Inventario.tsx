import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Inventario() {
  const [ routeActive, setRouteActive ] = useState("estoque")

  const handleClick = (route : string) => {
    setRouteActive(route)
  }

  const navigate = useNavigate();
  useEffect(() => {
    navigate('estoque/produto');
  },[]);

  return (
    <div className="inventory-main">
      <nav className="flex justify-around h-[8vh] items-center bg-gray-800 text-white w-full">
        <div className="px-5 xl:px-12 py-6 flex w-full items-center">
          <p className="text-3xl font-bold font-heading">
            Estoque
          </p>
        </div>
        <ul className="flex-col flex-grow hidden pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
          <Link onClick={() => handleClick("estoque")} to="estoque/produto"><li className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Estoque</li></Link>
          <Link onClick={() => handleClick("cadastrar")} to="cadastrar/produto"><li className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Cadastrar</li></Link>
        </ul>
      </nav>

      <div className="inventory-info">
        <Outlet/>
      </div>
    </div>
  )
}

export default Inventario;