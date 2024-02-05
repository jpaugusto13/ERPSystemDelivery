import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import schema from './schema';
import Input from '../../shared/components/Form/Input';
import { keyToken } from '../../context/AuthContext';

export type FormDataLogin = yup.InferType<typeof schema>;

function Login() {
  const navigate = useNavigate();
  const { signIn, isLoggedIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataLogin>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const token = localStorage.getItem(keyToken);

    if (token) {
      navigate('/doceria');
    }
  }, [isLoggedIn]);

  const onSubmit = async (data: FormDataLogin) => signIn(data);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto w-auto"
          src="../imgs/logo.jpeg"
          alt="Company Logo"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Entra com seu usuário
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Endereço de email
            </label>
            <div className="mt-2">
              <Input
                type="text"
                {...register('email')}
                error={errors?.email?.message}
                className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Senha
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Esqueceu a senha?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <Input
                type="password"
                {...register('senha')}
                error={errors?.email?.message}
                className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
