
export interface Experiencia {
  empresa: string;
  cargo: string;
  inicio: string;
  fim: string;
  descricao: string;
}

export interface Formacao {
  instituicao: string;
  curso: string;
  inicio: string;
  fim: string;
}

export interface Curriculo {
  id: string;
  nome: string;
  dataNascimento?: string;
  cargo: string;
  email: string;
  telefone: string;
  cpf: string;
  resumo: string;
  experiencias: Experiencia[];
  formacoes: Formacao[];
  imagem?: string;
}

export const curriculosMock: Curriculo[] = [
  {
    id: "1",
    nome: "Ana Oliveira",
    cargo: "Desenvolvedora Front-end",
    email: "ana@example.com",
    telefone: "(47) 99999-1111",
    cpf: "000.000.000-00",
    resumo:
      "Desenvolvedora com experiência em React, Next.js e TypeScript. Focada na criação de interfaces modernas e acessíveis.",
    experiencias: [
      {
        empresa: "Tech Solutions",
        cargo: "Desenvolvedora Front-end",
        inicio: "2023-01",
        fim: "",
        descricao: "Desenvolvimento de aplicações web.",
      },
    ],
    formacoes: [
      {
        instituicao: "Universidade Exemplo",
        curso: "Análise e Desenvolvimento de Sistemas",
        inicio: "2020-02",
        fim: "2022-12",
      },
    ],
  },
  {
    id: "2",
    nome: "Carlos Mendes",
    cargo: "Analista de Suporte de TI",
    email: "carlos@example.com",
    telefone: "(47) 99999-2222",
    cpf: "000.000.000-00",
    resumo:
      "Profissional de suporte técnico com conhecimentos em infraestrutura, atendimento ao usuário e banco de dados SQL.",
    experiencias: [
      {
        empresa: "Inova Tecnologia",
        cargo: "Analista de Suporte",
        inicio: "2022-05",
        fim: "",
        descricao: "Atendimento técnico e análise de incidentes.",
      },
    ],
    formacoes: [],
  },
  {
    id: "3",
    nome: "Mariana Costa",
    cargo: "UX/UI Designer",
    email: "mariana@example.com",
    telefone: "(47) 99999-3333",
    cpf: "000.000.000-00",
    resumo:
      "Designer especializada em experiência do usuário, prototipação no Figma e desenvolvimento de interfaces intuitivas.",
    experiencias: [],
    formacoes: [
      {
        instituicao: "Faculdade Exemplo",
        curso: "Design Digital",
        inicio: "2019-02",
        fim: "2022-12",
      },
    ],
  },
];
