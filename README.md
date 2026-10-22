
# TalentFlow — Sistema de Gestão de Currículos

Sistema web desenvolvido como trabalho acadêmico da disciplina de Desenvolvimento Web.

O TalentFlow permite cadastrar, organizar, pesquisar e visualizar currículos profissionais através de uma interface moderna, intuitiva e responsiva.

## Objetivo

Desenvolver uma aplicação web utilizando Next.js, React, Tailwind CSS e componentes reutilizáveis, com foco em experiência do usuário, gerenciamento de formulários e validação de dados.

## Funcionalidades

- Landing page responsiva
- Listagem de currículos em cards
- Pesquisa de candidatos por nome ou cargo
- Página dinâmica com detalhes do candidato
- Cadastro completo de currículos
- Múltiplas experiências profissionais
- Múltiplas formações acadêmicas
- Validação de formulários com Yup
- Verificação dos dígitos do CPF
- Validação de datas e períodos
- Máscaras para CPF, telefone e nascimento
- Upload fictício de imagem
- Persistência local no navegador
- Notificações de sucesso e erro
- Confirmações de cadastro
- Skeleton durante o carregamento
- Empty State para listas sem resultados
- Navegação responsiva com indicação da página ativa

## Tecnologias

| Tecnologia | Utilização |
|------------|------------|
| Next.js 16 | Framework e App Router |
| React 19 | Desenvolvimento de componentes |
| TypeScript | Tipagem estática |
| Tailwind CSS | Estilização responsiva |
| shadcn/ui | Componentes de interface |
| React Hook Form | Gerenciamento de formulários |
| Yup | Validação de dados |
| Sonner | Notificações |
| SweetAlert2 | Alertas e confirmações |
| Lucide React | Ícones |
| Next Image | Exibição otimizada de imagens |
| localStorage | Persistência simulada |

### Observação sobre máscaras

O enunciado solicita `react-input-mask-next`.

Durante o desenvolvimento, foi identificada uma incompatibilidade entre a versão disponível dessa biblioteca e o React 19, relacionada à utilização da API `findDOMNode`.

Para manter a aplicação funcional, foi implementado um componente próprio chamado `MaskedInput`, que aplica máscaras de CPF, telefone e data.

A biblioteca solicitada permanece como dependência do projeto, mas não é utilizada diretamente nos campos atuais.

Essa decisão técnica deverá ser validada com o professor.

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial |
| `/curriculos/visualizar` | Listagem de currículos |
| `/curriculos/visualizar/[id]` | Detalhes de um currículo |
| `/curriculos/cadastrar` | Cadastro de currículo |

## Estrutura do projeto

```text
talentflow/
├── public/
│   └── images/
│       └── avatar.svg
├── src/
│   ├── app/
│   │   ├── curriculos/
│   │   │   ├── cadastrar/
│   │   │   │   └── page.tsx
│   │   │   └── visualizar/
│   │   │       ├── [id]/
│   │   │       │   └── page.tsx
│   │   │       └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   └── MaskedInput.tsx
│   ├── data/
│   │   └── curriculos.ts
│   └── lib/
│       ├── curriculo-schema.ts
│       └── utils.ts
├── package.json
└── README.md
```

## Como executar o projeto

### Pré-requisitos

- Node.js compatível com a versão do Next.js
- npm
- Git

### 1. Clonar o repositório

```bash
git clone https://github.com/essilvaa/talentflow.git
```

### 2. Acessar o diretório

```bash
cd talentflow
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Executar localmente

```bash
npm run dev
```

Acesse:

http://localhost:3000

### 5. Testar o build de produção

```bash
npm run build
```

## Persistência de dados

Nesta primeira etapa, o sistema utiliza dados fictícios e `localStorage`.

Quando ainda não há dados salvos, a aplicação apresenta candidatos demonstrativos.

Os novos cadastros são armazenados no navegador, utilizando a chave:

`talentflow_curriculos`

### Limitações

- Os dados não são compartilhados entre usuários ou dispositivos.
- Não existe banco de dados ou backend nesta etapa.
- Limpar o armazenamento do navegador pode excluir cadastros.
- O upload é fictício e armazena apenas o nome do arquivo.
- Não existe autenticação ou controle de acesso real.
- O projeto não deve ser utilizado para armazenar dados pessoais reais ou sensíveis.

## Validações implementadas

O formulário utiliza React Hook Form integrado ao Yup.

As regras incluem:

- Campos obrigatórios
- E-mail em formato válido
- Tamanho mínimo de textos
- CPF com dígitos verificadores válidos
- Telefone com máscara
- Data de nascimento válida
- Períodos de experiências e formações
- Validação individual dos campos dinâmicos
- Verificação de CPF duplicado nos dados armazenados

## Experiência do usuário

A interface foi construída utilizando uma identidade visual em azul, branco e tons neutros.

Os principais recursos de UX incluem:

- Layout responsivo
- Menu com página ativa
- Estados de hover e foco
- Skeleton durante o carregamento
- Mensagens para listas vazias
- Feedback por notificações
- Confirmações de cadastro
- Busca com debounce

## Entrega acadêmica

Projeto referente à Etapa 1 — Frontend do Sistema de Gestão de Currículos.

O histórico de commits está disponível no GitHub e documenta a evolução das funcionalidades.

## Repositório

https://github.com/essilvaa/talentflow

## Autor

Enzo Silva

Projeto acadêmico — Desenvolvimento Web.

## Licença

Desenvolvido para fins acadêmicos e demonstrativos.
```
