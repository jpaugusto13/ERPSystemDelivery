import * as yup from 'yup';

import Input from '../../../../../shared/components/Form/Input';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import schema from "./schema";
import api from '../../../../../services/api';
import Swal from 'sweetalert2';

import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';

type FormData = yup.InferType<typeof schema>;

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 5 },
};

function Agendamentos() {

  const [ produtos, setProdutos ] = useState<Produto[]>([]);

  useEffect(() => {
    const getProdutos = async () => {
      await api.get('/product/get').then(({ data }) => setProdutos(data.produtos));
    }
    getProdutos();
  }, []);

  const items = []

  produtos.forEach(({ nome, preco, imagem }) => (
    items.push(
      <div key={nome+imagem} className="produto-container">
        <img src={imagem} alt="Imagem do produto" />
        <div>
          <h1>{nome}</h1>
          <h2>{<NumericFormat
            value={preco}
            color="000"
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'R$ '}
            decimalScale={2}
            fixedDecimalScale={true}
          />}</h2>
        </div>
      </div>
    )
  ))

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    console.log(data)
    await api.post("/scheduling/register", data)
    .then(response => {
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: response.data.message
        })
      }
    )
    .catch(({response}) => {
      console.log(response)
      Swal.fire({
        icon: "error",
        title: "Ops...",
        text: response.data.error
      })
    })
  }
  return (
    <div>
      <h1>Cadastrar categoria</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder='Nome do cliente' type='text' {...register("nome_cliente")} error={errors?.nome_cliente?.message} />
        <Input placeholder='Numero de contato' type='text' {...register("numero_contato")} error={errors?.numero_contato?.message} />
        <div style={{padding: "20px", overflowX: "hidden"}}>
          <AliceCarousel  keyboardNavigation disableDotsControls controlsStrategy="alternate" disableButtonsControls responsive={responsive} mouseTracking items={items}/>
        </div>
        <Input placeholder='Data de busca' type='text' {...register("data_busca")} error={errors?.data_busca?.message} />
        <Input placeholder='Hora da entrega' type='text' {...register("hora_entrega")} error={errors?.hora_entrega?.message} />
        <button>Cadastrar</button>
      </form>
    </div>
  )
}

export default Agendamentos;