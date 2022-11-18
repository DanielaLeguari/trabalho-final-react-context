import * as yup from "yup";

export const personFormSchema = yup.object().shape({
  nome: yup.string().required("Por favor, digite seu nome").min(2, "O nome precisa ter no mínimo 2 caracteres"),
  dataNascimento: yup.string().required("Por favor, digite sua data de nascimento"),
  cpf: yup.string().required("Por favor, digite seu CPF").length(14, "O CPF precisa ter 11 dígitos"),
  email: yup.string().required("Por favor, digite seu e-mail").email("Por favor, digite um e-mail válido")
})