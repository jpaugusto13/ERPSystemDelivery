import { NumericFormat } from "react-number-format";
import ProductType from "../../../../../types/ProdutoType";
import imgDefault from "../../../../../../public/imgs/default.png";

export function Product({ nome, imagem, descricao, preco } : ProductType) {
  return (
    <div
      key={nome && descricao}
      className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 "
    >
      <img
        className="w-full rounded-xl"
        src={imagem ? imagem : imgDefault}
        alt={descricao}
      />

      <div className="mt-1 p-2">
        <h2 className="text-slate-700">{nome}</h2>
        <p className="mt-1 text-sm text-slate-400">{descricao}</p>
        <div className="mt-3 flex items-end justify-between">
          <p className="text-lg font-bold text-blue-500">
            {
              <NumericFormat
                value={preco}
                color="000"
                displayType={'text'}
                thousandSeparator={'.'}
                decimalSeparator={','}
                prefix={'R$ '}
                decimalScale={2}
                fixedDecimalScale={true}
              />
            }
          </p>
        </div>
      </div>
    </div>
  )
}