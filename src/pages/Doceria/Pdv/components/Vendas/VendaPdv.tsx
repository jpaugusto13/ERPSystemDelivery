import EstoqueProdutos from "../../../Produtos/components/Inventário/EstoqueProdutos";
import TablePdv from "./components/tablePdv";

function VendaPdv() {
  return (
    <div className="grid grid-cols-6 w-full h-full">
      <div className="col-span-4">
        <EstoqueProdutos button="venda" descricaoOn={false} />
      </div>
      <div className="grid col-span-2">
        <div className="col-span-2">
          <TablePdv/>
        </div>
        <div className="grid p-4 rounded-sm grid-cols-2 col-span-2">
          <button className="p-4 col-span-1 bg-red-600"></button>
          <button className="p-4 col-span-1 bg-green-600"></button>
          <button className="p-4 col-span-1 bg-blue-600"></button>
          <button className="p-4 col-span-1 bg-yellow-600">Finalizar venda</button>
        </div>
      </div>
    </div>
  );
}

export default VendaPdv;