import * as yup from "yup"

const schema = yup.object({
    categoria: yup.string().required("Campo usuário é obrigatório"),
  }).required()

export default schema;