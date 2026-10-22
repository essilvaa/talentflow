
"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  BriefcaseBusiness,
  GraduationCap,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

import {
  type Curriculo,
  curriculosMock,
} from "@/data/curriculos";

const STORAGE_KEY = "talentflow_curriculos";

function CarregandoCurriculo() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-6 py-12">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-44 w-full rounded-2xl" />
      <Skeleton className="h-64 w-full rounded-2xl" />
      <Skeleton className="h-48 w-full rounded-2xl" />
    </div>
  );
}

function DetalhesConteudo() {
  const params = useParams<{ id: string }>();

  const [curriculo, setCurriculo] =
    useState<Curriculo | null>(null);

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const dados = localStorage.getItem(STORAGE_KEY);

        const lista: Curriculo[] =
          dados === null ? curriculosMock : JSON.parse(dados);

        if (!Array.isArray(lista)) {
          throw new Error("Lista de currículos inválida.");
        }

        const encontrado = lista.find(
          (item) => item.id === params.id
        );

        setCurriculo(encontrado ?? null);
      } catch (error) {
        console.error("Erro ao carregar currículo:", error);
        setCurriculo(null);
      } finally {
        setCarregando(false);
      }
    }, 500);

    return () => window.clearTimeout(timer);
  }, [params.id]);

  if (carregando) {
    return <CarregandoCurriculo />;
  }

  if (!curriculo) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <UserRound
          size={48}
          className="mx-auto mb-5 text-slate-400"
        />

        <h1 className="text-3xl font-bold text-slate-900">
          Currículo não encontrado
        </h1>

        <p className="mt-3 text-slate-600">
          O currículo solicitado não existe ou foi removido.
        </p>

        <Link
          href="/curriculos/visualizar"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          <ArrowLeft size={18} />
          Voltar aos currículos
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-12 sm:px-6">
      {/* Voltar */}
      <Link
        href="/curriculos/visualizar"
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft size={18} />
        Voltar aos currículos
      </Link>

      {/* Informações principais */}
      <Card className="border-slate-200 bg-white">
        <CardContent>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50">
              <Image
                src="/images/avatar.svg"
                alt={`Avatar ilustrativo de ${curriculo.nome}`}
                width={96}
                height={96}
                unoptimized
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <h1 className="break-words text-3xl font-bold text-slate-900">
                {curriculo.nome}
              </h1>

              <p className="mt-2 flex items-center gap-2 text-blue-600">
                <BriefcaseBusiness size={18} />
                {curriculo.cargo}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-6 text-sm text-slate-600 sm:flex-row sm:gap-8">
            <span className="flex items-center gap-2 break-all">
              <Mail size={17} />
              {curriculo.email}
            </span>

            <span className="flex items-center gap-2">
              <Phone size={17} />
              {curriculo.telefone}
            </span>
          </div>

          {curriculo.imagem && (
            <p className="mt-4 text-xs text-slate-500">
              Upload simulado: {curriculo.imagem}.
              A imagem original não é armazenada.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Resumo profissional */}
      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <CardTitle>Resumo profissional</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="whitespace-pre-line leading-7 text-slate-600">
            {curriculo.resumo}
          </p>
        </CardContent>
      </Card>

      {/* Experiências */}
      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BriefcaseBusiness
              size={21}
              className="text-blue-600"
            />
            Experiência profissional
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {curriculo.experiencias.length === 0 ? (
            <p className="text-slate-500">
              Nenhuma experiência profissional informada.
            </p>
          ) : (
            curriculo.experiencias.map((experiencia, index) => (
              <div
                key={index}
                className="border-l-2 border-blue-200 pl-5"
              >
                <h3 className="font-semibold text-slate-900">
                  {experiencia.cargo}
                </h3>

                <p className="mt-1 text-sm font-medium text-blue-600">
                  {experiencia.empresa}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {experiencia.inicio} —{" "}
                  {experiencia.fim || "Atual"}
                </p>

                <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
                  {experiencia.descricao}
                </p>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Formações */}
      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap
              size={22}
              className="text-blue-600"
            />
            Formação acadêmica
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {curriculo.formacoes.length === 0 ? (
            <p className="text-slate-500">
              Nenhuma formação acadêmica informada.
            </p>
          ) : (
            curriculo.formacoes.map((formacao, index) => (
              <div
                key={index}
                className="border-l-2 border-blue-200 pl-5"
              >
                <h3 className="font-semibold text-slate-900">
                  {formacao.curso}
                </h3>

                <p className="mt-1 text-sm font-medium text-blue-600">
                  {formacao.instituicao}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {formacao.inicio} —{" "}
                  {formacao.fim || "Atual"}
                </p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </section>
  );
}

export default function DetalhesCurriculo() {
  return (
    <Suspense fallback={<CarregandoCurriculo />}>
      <DetalhesConteudo />
    </Suspense>
  );
}
