import * as yup from 'yup';

const schema = yup
  .object({
    nome: yup.string().required('O campo nome não pode estar vazio'),
    preco: yup.string().typeError('O campo preço está inválido'),
    desconto: yup
      .number()
      .typeError('O campo desconto está inválido')
      .required('O campo desconto não pode estar vazio'),
    descricao: yup.string().required('O campo descrição não pode estar vazio'),
    imagem: yup.mixed().required('campo obrigatório'),
  })
  .required();

export default schema;
