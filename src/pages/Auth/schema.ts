import * as yup from "yup"

const schema = yup.object({
    email: yup.string().required("Campo usuário é obrigatório"),
    senha: yup.string().required("Campo senha é obrigatório")
  }).required()

export default schema;