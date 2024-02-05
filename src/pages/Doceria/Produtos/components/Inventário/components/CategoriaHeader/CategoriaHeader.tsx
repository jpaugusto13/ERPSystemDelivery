import Input from "../../../../../../../shared/components/Form/Input";

import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState } from "react";

interface Categoria {
  categoria: string;
  id: number;
}

export default function CategoriaHeader() {
  const [categorias] = useState<Categoria[]>([]);

  return (
    <header className="w-full relative text-gray-700 shadow-md shadow-slate-300 bg-white border-t border-b border-gray-100 body-font">
      <div className="container flex flex-col items-center justify-between p-6 mx-auto md:flex-row">
        <h1 className="flex items-center text-xl mb-4 text-gray-900 md:mb-0">
          Categorias {<RestaurantMenuOutlinedIcon />}
        </h1>
        <nav className="flex flex-wrap items-center justify-center pl-6 ml-6 text-base border-l border-gray-200 md:mr-auto">
          <ul className="flex justify-around font-semibold font-heading space-x-0">
            <li
              className="p-2 px-4 mr-5 font-medium rounded-lg hover:text-gray-900 hover:bg-blue-300 duration-200 capitalize cursor-pointer"
            >
              Todos
            </li>
            {categorias.map(({ categoria, id }) => (
              <li
                key={categoria + id}
                className="p-2 px-4 mr-5 font-medium rounded-lg hover:text-gray-900 hover:bg-blue-300 duration-200 capitalize cursor-pointer"
              >
                {categoria}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="w-full flex justify-center items-center p-1 mb-4">
        <div className="relative w-full">
          <Input
            type="text"
            className="w-full backdrop-blur-sm bg-white/20 py-2 pl-10 pr-4 rounded-lg focus:outline-none border-2 border-gray-300 focus:border-violet-300 transition-colors duration-300"
            placeholder="Procurar..."
          />
          <div className="absolute w-4 h-11 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchOutlinedIcon />
          </div>
        </div>
      </div>
    </header>
  )
}