
import * as yup from "yup";

const experienciaSchema = yup.object({
  empresa: yup.string().trim().required("Informe a empresa."),
  cargo: yup.string().trim().required("Informe o cargo."),
  inicio: yup.string().required("Informe a data de início."),
  fim: yup.string().defined(),
  descricao: yup
    .string()
    .trim()
    .min(10, "Descreva a experiência com pelo menos 10 caracteres.")
    .required("Descreva a experiência."),
});

const formacaoSchema = yup.object({
  instituicao: yup.string().trim().required("Informe a instituição."),
  curso: yup.string().trim().required("Informe o curso."),
  inicio: yup.string().required("Informe a data de início."),
  fim: yup.string().defined(),
});

export const curriculoSchema = yup.object({
  nome: yup
    .string()
    .trim()
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .required("O nome é obrigatório."),

  cargo: yup
    .string()
    .trim()
    .min(3, "Informe um cargo válido.")
    .required("O cargo é obrigatório."),

  email: yup
    .string()
    .email("Informe um e-mail válido.")
    .required("O e-mail é obrigatório."),

  cpf: yup
    .string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF incompleto.")
    .required("O CPF é obrigatório."),

  telefone: yup
    .string()
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone incompleto.")
    .required("O telefone é obrigatório."),

  dataNascimento: yup
    .string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Data incompleta.")
    .required("A data de nascimento é obrigatória."),

  resumo: yup
    .string()
    .trim()
    .min(30, "O resumo precisa de pelo menos 30 caracteres.")
    .required("O resumo profissional é obrigatório."),

  experiencias: yup.array().of(experienciaSchema).required(),
  formacoes: yup.array().of(formacaoSchema).required(),
});

export type CurriculoFormData = yup.InferType<typeof curriculoSchema>;
