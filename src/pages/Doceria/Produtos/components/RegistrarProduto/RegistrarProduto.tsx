import React, { useState } from 'react';
import Input from '../../../../../shared/components/Form/Input';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';
import schema from './schema';
import api from '../../../../../services/api';

export type FormDataProduct = yup.InferType<typeof schema>;

function SignProduto() {
  const [image, setImage] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDataProduct>({
    resolver: yupResolver(schema),
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const base64 = await convertFileToBase64(file);
      setImage(base64);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          resolve(event.target.result as string);
        } else {
          reject('Falha ao converter arquivo para base64');
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const formatarValor = (e: React.ChangeEvent<HTMLInputElement>) => {
    let valorNumerico = e.target.value.replace(/\D/g, '');
    valorNumerico = (Number(valorNumerico) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    setValor(valorNumerico);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescricao(e.target.value);
  };

  const handleClickPreco = (e: React.MouseEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    input.setSelectionRange(input.value.length, input.value.length);
    console.log(valor)
  };

  const onSubmit = async (data: FormDataProduct) => {
    const valorNumerico = Number(valor.replace('R$', '').replace(",","."));

    const dataForm = {
      nome: data.nome,
      preco: valorNumerico,
      desconto: data.desconto,
      descricao: descricao,
      imagem: image,
    };

    Swal.fire({
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const { status } = await api.post('/product/register', dataForm);
      if (status === 201) {
        reset();
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Produto cadastrado com sucesso!',
        });
      } else if (status === 409) {
        Swal.fire({
          icon: 'error',
          title: 'Ops...',
          text: 'Produto já está cadastrado!',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Ops...',
        text: 'Erro ao se conectar no servidor!',
      });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" method="post">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium leading-6 text-gray-900">
                Nome do Produto
              </label>
              <div className="mt-2">
                <Input
                  className="backdrop-blur-sm bg-white/20 py-2 pl-4 pr-4 rounded-lg focus:outline-none border-2 border-gray-300 focus:border-violet-300 transition-colors duration-300"
                  label="Nome do Produto"
                  type="text"
                  {...register('nome')}
                  error={errors?.nome?.message}
                  autoComplete="off"
                />
              </div>
            </div>

            <div>
              <label htmlFor="preco" className="block text-sm font-medium leading-6 text-gray-900">
                Preço
              </label>
              <div className="mt-2">
                <Input
                  className="backdrop-blur-sm bg-white/20 py-2 pl-4 pr-4 rounded-lg focus:outline-none border-2 border-gray-300 focus:border-violet-300 transition-colors duration-300"
                  label="Preço"
                  type="text"
                  placeholder="$"
                  value={valor}
                  onChange={formatarValor}
                  onClick={handleClickPreco}
                  error={errors?.preco?.message}
                  autoComplete="off"
                />
              </div>
            </div>

            <div>
              <label htmlFor="desconto" className="block text-sm font-medium leading-6 text-gray-900">
                Desconto
              </label>
              <div className="mt-2">
                <Input
                  className="backdrop-blur-sm bg-white/20 py-2 pl-4 pr-4 rounded-lg focus:outline-none border-2 border-gray-300 focus:border-violet-300 transition-colors duration-300"
                  type="text"
                  placeholder="%"
                  {...register('desconto')}
                  error={errors?.desconto?.message}
                  autoComplete="off"
                />
              </div>
            </div>

            <div>
              <label htmlFor="descricao" className="block text-sm font-medium leading-6 text-gray-900">
                Descrição
              </label>
              <div className="mt-2">
                <textarea
                  className="w-full backdrop-blur-sm resize-none bg-white/20 py-2 pl-4 pr-4 rounded-lg focus:outline-none border-2 border-gray-300 focus:border-violet-300 transition-colors duration-300"
                  {...register('descricao', { onChange: handleChange })}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="p-5">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:bg-blue-200 duration-200">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
                  />
                </svg>
                <span className="mt-2 text-base leading-normal">Selecione a imagem</span>
                <Input
                  type="file"
                  className="hidden"
                  {...register('imagem', { onChange: handleFileChange })}
                  error={errors?.imagem?.message}
                />
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignProduto;
