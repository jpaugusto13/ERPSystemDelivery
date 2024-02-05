import * as yup from 'yup';

import Input from '../../../../../../shared/components/Form/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import schema from './schema';
import api from '../../../../../../services/api';
import Swal from 'sweetalert2';

type FormData = yup.InferType<typeof schema>;

function SignCategoria() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    await api
      .post('/category/register', data)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          text: response.data.message,
        });
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          text: 'Categoria já existente!',
        });
      });
  };
  return (
    <div>
      <h1>Cadastrar categoria</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          {...register('categoria')}
          error={errors?.categoria?.message}
        />
        <button>Cadastrar</button>
      </form>
    </div>
  );
}

export default SignCategoria;
