
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  FileText,
  Search,
  UserPlus,
  Users,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Curriculo,
  curriculosMock,
} from "@/data/curriculos";

const STORAGE_KEY = "talentflow_curriculos";

export default function ListagemCurriculos() {
  const [curriculos, setCurriculos] = useState<Curriculo[]>([]);
  const [busca, setBusca] = useState("");
  const [buscaAplicada, setBuscaAplicada] = useState("");
  const [carregando, setCarregando] = useState(true);

  // Simula o carregamento inicial dos currículos.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const dados = localStorage.getItem(STORAGE_KEY);

        if (dados === null) {
          setCurriculos(curriculosMock);
        } else {
          const lista: unknown = JSON.parse(dados);

          if (!Array.isArray(lista)) {
            throw new Error("Dados armazenados inválidos");
          }

          setCurriculos(lista as Curriculo[]);
        }
      } catch (error) {
        console.error("Erro ao carregar currículos:", error);
        setCurriculos(curriculosMock);
      } finally {
        setCarregando(false);
      }
    }, 650);

    return () => window.clearTimeout(timer);
  }, []);

  // Debounce: aguarda 300ms após a digitação.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setBuscaAplicada(busca);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [busca]);

  const curriculosFiltrados = useMemo(() => {
    const termo = buscaAplicada.toLocaleLowerCase("pt-BR").trim();

    return curriculos.filter((curriculo) => {
      const nome = curriculo.nome.toLocaleLowerCase("pt-BR");
      const cargo = curriculo.cargo.toLocaleLowerCase("pt-BR");

      return nome.includes(termo) || cargo.includes(termo);
    });
  }, [curriculos, buscaAplicada]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            <Users size={16} />
            Banco de talentos
          </span>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Currículos cadastrados
          </h1>

          <p className="mt-3 text-slate-600">
            Encontre profissionais e explore suas experiências.
          </p>
        </div>

        <Link
          href="/curriculos/cadastrar"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <UserPlus size={18} />
          Novo currículo
        </Link>
      </div>

      <Card className="mb-8 border-slate-200 bg-white">
        <CardContent className="space-y-4">
          <div className="relative">
            <Search
              size={19}
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
            />

            <Input
              type="search"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
              placeholder="Pesquisar por nome ou cargo..."
              aria-label="Pesquisar currículos por nome ou cargo"
              className="h-12 pl-11"
            />
          </div>

          <p className="text-sm text-slate-500" aria-live="polite">
            {carregando
              ? "Carregando currículos..."
              : `${curriculosFiltrados.length} currículo(s) encontrado(s)`}
          </p>
        </CardContent>
      </Card>

      {carregando ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="space-y-5">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : curriculosFiltrados.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <FileText className="mx-auto mb-4 text-slate-400" size={45} />

          <h2 className="text-xl font-semibold text-slate-900">
            Nenhum currículo encontrado
          </h2>

          <p className="mx-auto mt-3 max-w-md text-slate-500">
            {buscaAplicada.trim()
              ? "Não encontramos candidatos para sua pesquisa. Tente outro nome ou cargo."
              : "Ainda não existem currículos cadastrados. Comece adicionando o primeiro."}
          </p>

          {buscaAplicada.trim() ? (
            <button
              type="button"
              onClick={() => {
                setBusca("");
                setBuscaAplicada("");
              }}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Limpar pesquisa
            </button>
          ) : (
            <Link
              href="/curriculos/cadastrar"
              className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Criar meu primeiro currículo
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {curriculosFiltrados.map((curriculo) => (
            <Card
              key={curriculo.id}
              className="border-slate-200 bg-white transition-shadow hover:shadow-lg"
            >
              <CardContent className="flex h-full flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xl font-bold text-blue-700">
                    {curriculo.nome.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-bold text-slate-900">
                      {curriculo.nome}
                    </h2>

                    <p className="flex items-center gap-1 text-sm text-blue-600">
                      <BriefcaseBusiness size={15} />
                      <span className="truncate">{curriculo.cargo}</span>
                    </p>
                  </div>
                </div>

                <p className="line-clamp-3 min-h-18 text-sm leading-6 text-slate-600">
                  {curriculo.resumo}
                </p>

                <Link
                  href={`/curriculos/visualizar/${curriculo.id}`}
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 px-4 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Ver currículo completo
                  <ArrowRight size={17} />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
