
"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Controller,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import Swal from "sweetalert2";

import {
  ArrowLeft,
  BriefcaseBusiness,
  GraduationCap,
  Plus,
  Save,
  Trash2,
  Upload,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import MaskedInput from "@/components/MaskedInput";

import {
  Curriculo,
  curriculosMock,
} from "@/data/curriculos";

import {
  curriculoSchema,
  CurriculoFormData,
} from "@/lib/curriculo-schema";

const STORAGE_KEY = "talentflow_curriculos";

const errorClass = "mt-1 text-sm text-red-600";

export default function CadastrarCurriculo() {
  const router = useRouter();
  const [foto, setFoto] = useState("");

  // Configuração do React Hook Form e Yup.
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CurriculoFormData>({
    resolver: yupResolver(curriculoSchema),
    mode: "onChange",

    defaultValues: {
      nome: "",
      cargo: "",
      email: "",
      cpf: "",
      telefone: "",
      dataNascimento: "",
      resumo: "",
      experiencias: [],
      formacoes: [],
    },
  });

  // Array dinâmico de experiências profissionais.
  const {
    fields: experiencias,
    append: adicionarExperiencia,
    remove: removerExperiencia,
  } = useFieldArray({
    control,
    name: "experiencias",
  });

  // Array dinâmico de formações acadêmicas.
  const {
    fields: formacoes,
    append: adicionarFormacao,
    remove: removerFormacao,
  } = useFieldArray({
    control,
    name: "formacoes",
  });

  // Upload fictício de imagem.
  function selecionarFoto(event: ChangeEvent<HTMLInputElement>) {
    const arquivo = event.target.files?.[0];

    if (!arquivo) return;

    if (!arquivo.type.startsWith("image/")) {
      toast.error("Selecione um arquivo de imagem válido.");
      event.target.value = "";
      return;
    }

    if (arquivo.size > 2 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 2 MB.");
      event.target.value = "";
      return;
    }

    setFoto(arquivo.name);

    toast.success("Imagem selecionada!", {
      description: "Upload fictício realizado com sucesso.",
    });
  }

  // Persistência no localStorage.
  async function salvarCurriculo(dados: CurriculoFormData) {
    try {
      const novoCurriculo: Curriculo = {
        id: crypto.randomUUID(),
        nome: dados.nome.trim(),
        cargo: dados.cargo.trim(),
        email: dados.email.trim(),
        cpf: dados.cpf,
        telefone: dados.telefone,
        dataNascimento: dados.dataNascimento,
        resumo: dados.resumo.trim(),
        experiencias: dados.experiencias,
        formacoes: dados.formacoes,
        imagem: foto || undefined,
      };

      const salvos = localStorage.getItem(STORAGE_KEY);

      const lista: Curriculo[] =
        salvos === null
          ? curriculosMock
          : JSON.parse(salvos);

      if (!Array.isArray(lista)) {
        throw new Error("Os dados armazenados são inválidos.");
      }

      // Impede CPF duplicado.
      const cpfDuplicado = lista.some(
        (item) => item.cpf === novoCurriculo.cpf
      );

      if (cpfDuplicado) {
        toast.error("CPF já cadastrado!", {
          description: "Já existe um currículo com esse CPF.",
        });
        return;
      }

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...lista, novoCurriculo])
      );

      toast.success("Currículo cadastrado com sucesso!");

      await Swal.fire({
        title: "Cadastro realizado!",
        text: "O currículo foi salvo com sucesso no TalentFlow.",
        icon: "success",
        confirmButtonText: "Ver currículos",
        confirmButtonColor: "#2563eb",
      });

      router.push("/curriculos/visualizar");
    } catch (error) {
      console.error(error);

      toast.error("Erro ao salvar currículo.", {
        description:
          error instanceof Error
            ? error.message
            : "Tente novamente.",
      });
    }
  }

  // Feedback das validações.
  function formularioInvalido() {
    const mensagem =
      errors.nome?.message ||
      errors.cargo?.message ||
      errors.email?.message ||
      errors.cpf?.message ||
      errors.telefone?.message ||
      errors.dataNascimento?.message ||
      errors.resumo?.message ||
      errors.experiencias?.[0]?.empresa?.message ||
      errors.experiencias?.[0]?.cargo?.message ||
      errors.experiencias?.[0]?.inicio?.message ||
      errors.experiencias?.[0]?.descricao?.message ||
      errors.formacoes?.[0]?.instituicao?.message ||
      errors.formacoes?.[0]?.curso?.message ||
      errors.formacoes?.[0]?.inicio?.message ||
      "Verifique os campos destacados.";

    toast.error("Formulário inválido!", {
      description: mensagem,
    });
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">

      {/* Navegação */}
      <button
        type="button"
        onClick={() => router.push("/curriculos/visualizar")}
        className="mb-7 flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft size={18} />
        Voltar aos currículos
      </button>

      {/* Título */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Cadastrar novo currículo
        </h1>

        <p className="mt-2 text-slate-600">
          Preencha as informações do profissional para cadastrá-lo
          no TalentFlow.
        </p>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit(
          salvarCurriculo,
          formularioInvalido
        )}
        className="space-y-6"
      >

        {/* DADOS PESSOAIS */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserRound className="text-blue-600" />
              Dados pessoais
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-5 md:grid-cols-2">

            {/* Nome */}
            <div>
              <Label htmlFor="nome">Nome completo *</Label>

              <Input
                id="nome"
                placeholder="Ex.: Ana Oliveira"
                aria-invalid={!!errors.nome}
                {...register("nome")}
              />

              {errors.nome && (
                <p className={errorClass}>
                  {errors.nome.message}
                </p>
              )}
            </div>

            {/* Cargo */}
            <div>
              <Label htmlFor="cargo">Cargo pretendido *</Label>

              <Input
                id="cargo"
                placeholder="Ex.: Analista de Sistemas"
                aria-invalid={!!errors.cargo}
                {...register("cargo")}
              />

              {errors.cargo && (
                <p className={errorClass}>
                  {errors.cargo.message}
                </p>
              )}
            </div>

            {/* E-mail */}
            <div>
              <Label htmlFor="email">E-mail *</Label>

              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                aria-invalid={!!errors.email}
                {...register("email")}
              />

              {errors.email && (
                <p className={errorClass}>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* CPF */}
            <div>
              <Label htmlFor="cpf">CPF *</Label>

              <Controller
                name="cpf"
                control={control}
                render={({ field }) => (
                  <MaskedInput
                    id="cpf"
                    mask="999.999.999-99"
                    placeholder="000.000.000-00"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    aria-invalid={!!errors.cpf}
                    className="h-11"
                  />
                )}
              />

              {errors.cpf && (
                <p className={errorClass}>
                  {errors.cpf.message}
                </p>
              )}
            </div>

            {/* Telefone */}
            <div>
              <Label htmlFor="telefone">Telefone *</Label>

              <Controller
                name="telefone"
                control={control}
                render={({ field }) => (
                  <MaskedInput
                    id="telefone"
                    mask="(99) 99999-9999"
                    placeholder="(47) 99999-9999"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    aria-invalid={!!errors.telefone}
                    className="h-11"
                  />
                )}
              />

              {errors.telefone && (
                <p className={errorClass}>
                  {errors.telefone.message}
                </p>
              )}
            </div>

            {/* Data de nascimento */}
            <div>
              <Label htmlFor="dataNascimento">
                Data de nascimento *
              </Label>

              <Controller
                name="dataNascimento"
                control={control}
                render={({ field }) => (
                  <MaskedInput
                    id="dataNascimento"
                    mask="99/99/9999"
                    placeholder="DD/MM/AAAA"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    aria-invalid={!!errors.dataNascimento}
                    className="h-11"
                  />
                )}
              />

              {errors.dataNascimento && (
                <p className={errorClass}>
                  {errors.dataNascimento.message}
                </p>
              )}
            </div>

            {/* Resumo */}
            <div className="md:col-span-2">
              <Label htmlFor="resumo">
                Resumo profissional *
              </Label>

              <Textarea
                id="resumo"
                rows={5}
                placeholder="Descreva suas experiências e habilidades..."
                aria-invalid={!!errors.resumo}
                {...register("resumo")}
              />

              {errors.resumo && (
                <p className={errorClass}>
                  {errors.resumo.message}
                </p>
              )}
            </div>

            {/* Foto */}
            <div className="md:col-span-2">
              <Label htmlFor="foto">
                Foto do profissional (upload fake)
              </Label>

              <div className="mt-2 flex items-center gap-3 rounded-lg border border-dashed border-slate-300 p-4">
                <Upload
                  size={24}
                  className="shrink-0 text-blue-600"
                />

                <Input
                  id="foto"
                  type="file"
                  accept="image/*"
                  onChange={selecionarFoto}
                />
              </div>

              {foto && (
                <p className="mt-2 text-sm text-green-700">
                  Arquivo selecionado: {foto}
                </p>
              )}
            </div>

          </CardContent>
        </Card>

        {/* EXPERIÊNCIAS PROFISSIONAIS */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">

              <CardTitle className="flex items-center gap-2">
                <BriefcaseBusiness className="text-blue-600" />
                Experiências profissionais
              </CardTitle>

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  adicionarExperiencia({
                    empresa: "",
                    cargo: "",
                    inicio: "",
                    fim: "",
                    descricao: "",
                  })
                }
              >
                <Plus size={17} />
                Adicionar experiência
              </Button>

            </div>
          </CardHeader>

          <CardContent className="space-y-5">

            {experiencias.length === 0 && (
              <p className="text-sm text-slate-500">
                Nenhuma experiência adicionada.
                Você pode adicionar quantas precisar.
              </p>
            )}

            {experiencias.map((experiencia, index) => (
              <div
                key={experiencia.id}
                className="space-y-4 rounded-xl border border-slate-200 p-5"
              >

                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">
                    Experiência {index + 1}
                  </h3>

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      removerExperiencia(index)
                    }
                  >
                    <Trash2 size={16} />
                    Remover
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">

                  <div>
                    <Label>Empresa *</Label>

                    <Input
                      {...register(
                        `experiencias.${index}.empresa`
                      )}
                    />

                    {errors.experiencias?.[index]?.empresa && (
                      <p className={errorClass}>
                        {errors.experiencias[index]?.empresa?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Cargo *</Label>

                    <Input
                      {...register(
                        `experiencias.${index}.cargo`
                      )}
                    />

                    {errors.experiencias?.[index]?.cargo && (
                      <p className={errorClass}>
                        {errors.experiencias[index]?.cargo?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Data de início *</Label>

                    <Input
                      type="month"
                      {...register(
                        `experiencias.${index}.inicio`
                      )}
                    />

                    {errors.experiencias?.[index]?.inicio && (
                      <p className={errorClass}>
                        {errors.experiencias[index]?.inicio?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Data de término</Label>

                    <Input
                      type="month"
                      {...register(
                        `experiencias.${index}.fim`
                      )}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label>
                      Descrição das atividades *
                    </Label>

                    <Textarea
                      rows={3}
                      placeholder="Descreva suas principais atividades..."
                      {...register(
                        `experiencias.${index}.descricao`
                      )}
                    />

                    {errors.experiencias?.[index]?.descricao && (
                      <p className={errorClass}>
                        {errors.experiencias[index]?.descricao?.message}
                      </p>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* FORMAÇÃO ACADÊMICA */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">

              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="text-blue-600" />
                Formação acadêmica
              </CardTitle>

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  adicionarFormacao({
                    instituicao: "",
                    curso: "",
                    inicio: "",
                    fim: "",
                  })
                }
              >
                <Plus size={17} />
                Adicionar formação
              </Button>

            </div>
          </CardHeader>

          <CardContent className="space-y-5">

            {formacoes.length === 0 && (
              <p className="text-sm text-slate-500">
                Nenhuma formação acadêmica adicionada.
              </p>
            )}

            {formacoes.map((formacao, index) => (
              <div
                key={formacao.id}
                className="space-y-4 rounded-xl border border-slate-200 p-5"
              >

                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">
                    Formação {index + 1}
                  </h3>

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      removerFormacao(index)
                    }
                  >
                    <Trash2 size={16} />
                    Remover
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">

                  <div>
                    <Label>Instituição *</Label>

                    <Input
                      placeholder="Ex.: Universidade"
                      {...register(
                        `formacoes.${index}.instituicao`
                      )}
                    />

                    {errors.formacoes?.[index]?.instituicao && (
                      <p className={errorClass}>
                        {errors.formacoes[index]?.instituicao?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Curso *</Label>

                    <Input
                      placeholder="Ex.: Análise e Desenvolvimento de Sistemas"
                      {...register(
                        `formacoes.${index}.curso`
                      )}
                    />

                    {errors.formacoes?.[index]?.curso && (
                      <p className={errorClass}>
                        {errors.formacoes[index]?.curso?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Data de início *</Label>

                    <Input
                      type="month"
                      {...register(
                        `formacoes.${index}.inicio`
                      )}
                    />

                    {errors.formacoes?.[index]?.inicio && (
                      <p className={errorClass}>
                        {errors.formacoes[index]?.inicio?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Data de conclusão</Label>

                    <Input
                      type="month"
                      {...register(
                        `formacoes.${index}.fim`
                      )}
                    />
                  </div>

                </div>
              </div>
            ))}

          </CardContent>
        </Card>

        {/* BOTÕES */}
        <div className="flex flex-wrap justify-end gap-3">

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              router.push("/curriculos/visualizar")
            }
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save size={18} />

            {isSubmitting
              ? "Salvando..."
              : "Salvar currículo"}
          </Button>

        </div>

      </form>
    </section>
  );
}
