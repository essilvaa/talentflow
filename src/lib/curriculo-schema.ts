
import * as yup from "yup";

// ===================================
// VALIDAÇÃO DE CPF
// ===================================

function validarCPF(valor?: string): boolean {
  if (!valor) return false;

  const cpf = valor.replace(/\D/g, "");

  if (cpf.length !== 11) return false;

  // Impede CPFs com todos os dígitos iguais.
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  // Calcula os dígitos verificadores.
  for (let posicao = 9; posicao <= 10; posicao++) {
    let soma = 0;

    for (let i = 0; i < posicao; i++) {
      soma += Number(cpf[i]) * (posicao + 1 - i);
    }

    const resto = (soma * 10) % 11;
    const digito = resto === 10 ? 0 : resto;

    if (digito !== Number(cpf[posicao])) {
      return false;
    }
  }

  return true;
}

// ===================================
// VALIDAÇÃO DE DATA DE NASCIMENTO
// ===================================

function validarDataNascimento(valor?: string): boolean {
  if (!valor) return false;

  const formato = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const resultado = formato.exec(valor);

  if (!resultado) return false;

  const dia = Number(resultado[1]);
  const mes = Number(resultado[2]);
  const ano = Number(resultado[3]);

  if (ano < 1900) return false;

  const data = new Date(0);

  data.setFullYear(ano, mes - 1, dia);
  data.setHours(0, 0, 0, 0);

  // Confere se a data realmente existe.
  const dataValida =
    data.getFullYear() === ano &&
    data.getMonth() === mes - 1 &&
    data.getDate() === dia;

  if (!dataValida) return false;

  // Não permite nascimento no futuro.
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  return data <= hoje;
}

// ===================================
// VALIDAÇÃO DE PERÍODOS
// ===================================

function validarMes(valor?: string): boolean {
  if (!valor) return false;

  const resultado = /^(\d{4})-(\d{2})$/.exec(valor);

  if (!resultado) return false;

  const ano = Number(resultado[1]);
  const mes = Number(resultado[2]);

  return ano >= 1900 && mes >= 1 && mes <= 12;
}

function validarFim(
  fim: string | undefined,
  inicio: string
): boolean {
  if (!fim) return true;

  if (!validarMes(fim) || !validarMes(inicio)) {
    return false;
  }

  // Formato YYYY-MM permite comparação cronológica.
  return fim >= inicio;
}

// ===================================
// EXPERIÊNCIA PROFISSIONAL
// ===================================

const experienciaSchema = yup.object({
  empresa: yup
    .string()
    .trim()
    .required("Informe o nome da empresa.")
    .min(2, "O nome da empresa é muito curto."),

  cargo: yup
    .string()
    .trim()
    .required("Informe o cargo exercido.")
    .min(3, "O cargo deve ter pelo menos 3 caracteres."),

  inicio: yup
    .string()
    .required("Informe a data de início.")
    .test(
      "mes-valido",
      "Informe um mês e ano válidos.",
      (valor) => validarMes(valor)
    ),

  fim: yup
    .string()
    .defined()
    .test(
      "fim-valido",
      "A data final deve ser igual ou posterior à inicial.",
      function (valor) {
        return validarFim(valor, this.parent.inicio);
      }
    ),

  descricao: yup
    .string()
    .trim()
    .required("Descreva as atividades realizadas.")
    .min(
      10,
      "A descrição precisa ter pelo menos 10 caracteres."
    ),
});

// ===================================
// FORMAÇÃO ACADÊMICA
// ===================================

const formacaoSchema = yup.object({
  instituicao: yup
    .string()
    .trim()
    .required("Informe a instituição de ensino.")
    .min(3, "Informe uma instituição válida."),

  curso: yup
    .string()
    .trim()
    .required("Informe o nome do curso.")
    .min(3, "O curso deve ter pelo menos 3 caracteres."),

  inicio: yup
    .string()
    .required("Informe a data de início.")
    .test(
      "mes-valido",
      "Informe um mês e ano válidos.",
      (valor) => validarMes(valor)
    ),

  fim: yup
    .string()
    .defined()
    .test(
      "fim-valido",
      "A conclusão não pode ser anterior ao início.",
      function (valor) {
        return validarFim(valor, this.parent.inicio);
      }
    ),
});

// ===================================
// SCHEMA PRINCIPAL DO CURRÍCULO
// ===================================

export const curriculoSchema = yup.object({
  nome: yup
    .string()
    .trim()
    .required("O nome completo é obrigatório.")
    .min(3, "O nome deve ter pelo menos 3 caracteres."),

  cargo: yup
    .string()
    .trim()
    .required("O cargo pretendido é obrigatório.")
    .min(3, "Informe um cargo válido."),

  email: yup
    .string()
    .trim()
    .required("O e-mail é obrigatório.")
    .email("Informe um endereço de e-mail válido."),

  cpf: yup
    .string()
    .required("O CPF é obrigatório.")
    .test(
      "cpf-valido",
      "O CPF informado é inválido.",
      (valor) => validarCPF(valor)
    ),

  telefone: yup
    .string()
    .required("O telefone é obrigatório.")
    .matches(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "Informe um celular válido com DDD."
    ),

  dataNascimento: yup
    .string()
    .required("A data de nascimento é obrigatória.")
    .test(
      "data-valida",
      "Informe uma data de nascimento válida.",
      (valor) => validarDataNascimento(valor)
    ),

  resumo: yup
    .string()
    .trim()
    .required("O resumo profissional é obrigatório.")
    .min(
      30,
      "O resumo precisa ter pelo menos 30 caracteres."
    ),

  experiencias: yup
    .array()
    .of(experienciaSchema)
    .required(),

  formacoes: yup
    .array()
    .of(formacaoSchema)
    .required(),
});

// Tipo compartilhado com React Hook Form.
export type CurriculoFormData = yup.InferType<
  typeof curriculoSchema
>;
