
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  ClipboardList,
  FileSearch,
  FileText,
  GraduationCap,
  Search,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

const funcionalidades = [
  {
    titulo: "Cadastro completo",
    descricao:
      "Registre dados pessoais, resumo profissional, experiências e formações acadêmicas em um só lugar.",
    icon: UserPlus,
  },
  {
    titulo: "Busca inteligente",
    descricao:
      "Encontre rapidamente profissionais por nome ou cargo, com resultados atualizados durante a pesquisa.",
    icon: Search,
  },
  {
    titulo: "Currículos organizados",
    descricao:
      "Visualize informações profissionais em cards e acesse todos os detalhes de cada candidato.",
    icon: FileText,
  },
  {
    titulo: "Experiências profissionais",
    descricao:
      "Organize múltiplas experiências de trabalho e acompanhe o histórico profissional dos candidatos.",
    icon: BriefcaseBusiness,
  },
  {
    titulo: "Formação acadêmica",
    descricao:
      "Registre cursos, instituições de ensino e períodos de formação de maneira estruturada.",
    icon: GraduationCap,
  },
  {
    titulo: "Validação de dados",
    descricao:
      "Conte com formulários validados, máscaras de entrada e feedback visual para facilitar o preenchimento.",
    icon: ShieldCheck,
  },
];

const etapas = [
  {
    numero: "01",
    titulo: "Cadastre",
    descricao:
      "Preencha os dados pessoais, as experiências profissionais e a formação acadêmica.",
    icon: ClipboardList,
  },
  {
    numero: "02",
    titulo: "Organize",
    descricao:
      "Mantenha os currículos reunidos em uma listagem acessível e fácil de consultar.",
    icon: Users,
  },
  {
    numero: "03",
    titulo: "Encontre",
    descricao:
      "Pesquise o profissional desejado e visualize seu currículo completo.",
    icon: FileSearch,
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden bg-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <Badge
              variant="secondary"
              className="mb-6 gap-2 rounded-full bg-blue-50 px-4 py-2 text-blue-700"
            >
              <Sparkles size={15} />
              Uma nova forma de organizar talentos
            </Badge>

            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Conecte talentos a
              <span className="text-blue-600"> novas oportunidades.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Com o TalentFlow, você cadastra profissionais,
              organiza experiências e encontra currículos
              de maneira simples, rápida e intuitiva.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/curriculos/cadastrar"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "gap-2 bg-blue-600 text-white hover:bg-blue-700",
                })}
              >
                <UserPlus size={18} />
                Cadastrar currículo
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/curriculos/visualizar"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "gap-2",
                })}
              >
                <Search size={18} />
                Explorar currículos
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <BadgeCheck className="text-green-600" size={18} />
                Interface intuitiva
              </span>
              <span className="flex items-center gap-2">
                <BadgeCheck className="text-green-600" size={18} />
                Cadastro organizado
              </span>
            </div>
          </div>

          {/* PRÉVIA DO SISTEMA */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-100 to-sky-50 blur-xl" />

            <Card className="relative overflow-hidden border-slate-200 bg-white shadow-xl">
              <CardContent className="space-y-5 p-5 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-600 p-3 text-white">
                      <BriefcaseBusiness size={22} />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-900">
                        Painel de talentos
                      </h2>
                      <p className="text-xs text-slate-500">
                        Prévia ilustrativa do sistema
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-50 text-green-700"
                  >
                    TalentFlow
                  </Badge>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-400">
                    <Search size={17} />
                    Pesquisar talentos...
                  </div>

                  {[
                    {
                      nome: "Ana Oliveira",
                      cargo: "Desenvolvedora Front-end",
                      iniciais: "AO",
                    },
                    {
                      nome: "Carlos Mendes",
                      cargo: "Analista de Suporte de TI",
                      iniciais: "CM",
                    },
                    {
                      nome: "Mariana Costa",
                      cargo: "UX/UI Designer",
                      iniciais: "MC",
                    },
                  ].map((pessoa) => (
                    <div
                      key={pessoa.nome}
                      className="mb-3 flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 last:mb-0"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                        {pessoa.iniciais}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {pessoa.nome}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {pessoa.cargo}
                        </p>
                      </div>

                      <Badge variant="outline" className="hidden sm:inline-flex">
                        Perfil
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Organização e praticidade</span>
                  <span className="font-medium text-blue-600">
                    Gestão de currículos
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FUNCIONALIDADES */}
      <section
        id="funcionalidades"
        className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge
            variant="secondary"
            className="mb-4 bg-blue-50 text-blue-700"
          >
            Funcionalidades
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Tudo o que você precisa para organizar currículos
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Recursos pensados para facilitar o cadastro,
            a consulta e o gerenciamento das informações profissionais.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {funcionalidades.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.titulo}
                className="group border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="mb-5 inline-flex rounded-xl bg-blue-50 p-3 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {item.titulo}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.descricao}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="border-y border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge
              variant="secondary"
              className="mb-4 bg-blue-50 text-blue-700"
            >
              Simples de utilizar
            </Badge>

            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Como funciona o TalentFlow?
            </h2>

            <p className="mt-4 text-slate-600">
              Três passos para começar a gerenciar currículos.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {etapas.map((etapa) => {
              const Icon = etapa.icon;

              return (
                <div
                  key={etapa.numero}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-7"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-4xl font-extrabold text-blue-100">
                      {etapa.numero}
                    </span>
                    <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
                      <Icon size={22} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">
                    {etapa.titulo}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {etapa.descricao}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-14 text-center text-white sm:px-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
            <Users size={32} />
          </div>

          <h2 className="text-3xl font-bold sm:text-4xl">
            Comece a organizar seus talentos hoje.
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-blue-50">
            Cadastre currículos e mantenha informações profissionais
            organizadas em um único lugar.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/curriculos/cadastrar"
              className={buttonVariants({
                size: "lg",
                variant: "secondary",
                className:
                  "gap-2 bg-white text-blue-700 hover:bg-blue-50",
              })}
            >
              <UserPlus size={18} />
              Cadastrar agora
            </Link>

            <Link
              href="/curriculos/visualizar"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/60 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Ver currículos
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
