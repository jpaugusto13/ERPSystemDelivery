import { useEffect, useState } from "react";
import api from "../../../../../services/api";

import Input from "../../../../../shared/components/Form/Input";

import { NumericFormat } from "react-number-format";
import ReactLoading from 'react-loading';

import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ProdutoType from "../../../../../shared/types/ProdutoType";
import { useSale } from "../../../../../hooks/useSale";

interface Categoria {
  categoria: string;
  id: number;
}

interface EstoqueProps {
  button: "venda" | "editar";
  descricaoOn: boolean;
}

const classNameaa = "absolute h-10 top-2 right-2 flex items-center space-x-1.5 rounded-lg bg-blue-500 px-2 py-1.5 text-white duration-100 hover:bg-blue-600"

function EstoqueProdutos({ button, descricaoOn } : EstoqueProps) {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const { productsSale, updateSaleProducts } = useSale();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const [produtosResponse, categoriasResponse] = await Promise.all([
          api.post('/product/get').then(({ data }) => data.produtos),
          api.get('/category/get').then(({ data }) => data.categorias),
        ]);

        setProdutos(produtosResponse);
        setCategorias(categoriasResponse);
      } catch (error) {
        console.error('Erro ao buscar produtos e categorias:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClick = async (value: string) => {
    if(value != "") {
      try {
        const response = await api.post('/product/get', { categoria: value });
        const arrayProdutos: ProdutoType[] = response.data.produtos;
        setProdutos(arrayProdutos);
      } catch (error) {
        console.error('Erro ao buscar produtos por categoria:', error);
      }
    } else {
      const response = await api.post('/product/get').then(({ data }) => data.produtos)
      setProdutos(response);
    }
  };

  const handleUpdateSaleProducts = async (id: number) => {
    const response : Promise<ProdutoType> = await api.post('/product/get', {id: id}).then(({ data }) => data.produtos[0])
    let sales: ProdutoType[] = [];
    sales = productsSale;
    sales.push(response);
    updateSaleProducts(sales);
  }

  const handleChange = async (e) => {
    const nome = e.target.value;
  
    if (nome === "") {
      setLoading(true);
  
      try {
        const response = await api.post('/product/get');
        const arrayProdutos: ProdutoType[] = response.data.produtos;
        setProdutos(arrayProdutos);
      } catch (error) {
        console.error('Erro ao buscar todos os produtos:', error);
      } finally {
        setLoading(false);
      }
  
      return;
    }
  
    try {
      const response = await api.post('/product/get', { nome: nome });
      const arrayProdutos: ProdutoType[] = response.data.produtos;
      setProdutos(arrayProdutos);
    } catch (error) {
      return "";
    }
  };
  

  return (
    <>  
      <div>
      <div>
        <header className="w-full relative text-gray-700 shadow-md shadow-slate-300 bg-white border-t border-b border-gray-100 body-font">
          <div className="container flex flex-col items-center justify-between p-6 mx-auto md:flex-row">
            <h1 className="flex items-center text-xl mb-4 text-gray-900 md:mb-0">{<RestaurantMenuOutlinedIcon />}Categorias</h1>
            <nav className="flex flex-wrap items-center justify-center pl-6 ml-6 text-base border-l border-gray-200 md:mr-auto">
              <ul className="flex justify-around font-semibold font-heading space-x-0">
              <li onClick={() => handleClick("")} className="p-2 px-4 mr-5 font-medium rounded-lg hover:text-gray-900 hover:bg-blue-300 duration-200 capitalize cursor-pointer"> 
                Todos
              </li>
                {
                  categorias.map(({ categoria, id }) => (
                    
                    <li key={categoria+id} onClick={() => handleClick(categoria)} className="p-2 px-4 mr-5 font-medium rounded-lg hover:text-gray-900 hover:bg-blue-300 duration-200 capitalize cursor-pointer"> 
                      {categoria}
                    </li>
                  ))
                }
              </ul>
            </nav>
          </div>
          <div className="w-full flex justify-center items-center p-1 mb-4">
            <div className="relative w-full">
              <Input type="text" className="w-full backdrop-blur-sm bg-white/20 py-2 pl-10 pr-4 rounded-lg focus:outline-none border-2 border-gray-300 focus:border-violet-300 transition-colors duration-300" placeholder="Procurar..."/>
              <div className="absolute w-4 h-11 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchOutlinedIcon />
              </div>
            </div>    
          </div>
        </header>
      </div>
      </div>

      <section className="py-1 bg-gray-100 h-full overflow-scroll">
        <div className="mx-auto grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

          {loading ? (
            <div className="loading"><ReactLoading type="spin" color="#000" height={100} width={100}/></div>
          ) : (
            produtos.map(({ id, nome, preco, descricao,imagem }) => (
              <article key={nome+imagem} className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                <div className="relative flex items-end overflow-hidden rounded-xl">
                  <img className="w-full" height={350} src={imagem} alt={descricao} />
                  {button == "editar" ? <button className={classNameaa}> <ModeEditOutlineOutlinedIcon /> </button> : <button onClick={() => handleUpdateSaleProducts(id)} className={classNameaa}> <AddIcon /></button> }
                </div>

                <div className="mt-1 p-2">
                  <h2 className="text-slate-700">{nome}</h2>
                  {
                    descricaoOn ? <p className="mt-1 text-sm text-slate-400">{descricao}</p> : <></>
                  }

                  <div className="mt-3 flex items-end justify-between">
                    <p className="text-lg font-bold text-blue-500">{<NumericFormat value={preco} color="000" displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'R$ '} decimalScale={2} fixedDecimalScale={true}/>}</p>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default EstoqueProdutos;
