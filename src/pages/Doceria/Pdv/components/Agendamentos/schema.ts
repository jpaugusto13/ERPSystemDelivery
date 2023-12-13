import * as yup from "yup"

const schema = yup.object({
    nome_cliente: yup.string().required("Campo nome do cliente é obrigatório."),
    numero_contato: yup.number().required("Campo número de contato é obrigatório."),
    data_busca: yup.string().required("Campo de data é obrigatório."),
    hora_entrega: yup.string().required("Campo de hora é obrigatório. ")
  }).required()

export default schema;