
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
      <div className="mb-6 rounded-2xl bg-blue-100 p-4 text-blue-600">
        <BriefcaseBusiness size={36} />
      </div>

      <span className="mb-4 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
        Plataforma de Gestão de Currículos
      </span>

      <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
        Organize talentos com o{" "}
        <span className="text-blue-600">TalentFlow</span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
        Cadastre profissionais, organize experiências e consulte
        currículos em uma plataforma simples e moderna.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button
          nativeButton={false}
          render={<Link href="/curriculos/visualizar" />}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700"
        >
          Ver currículos
          <ArrowRight className="ml-2" />
        </Button>

        <Button
          nativeButton={false}
          render={<Link href="/curriculos/cadastrar" />}
          variant="outline"
          size="lg"
        >
          Cadastrar currículo
        </Button>
      </div>
    </section>
  );
}
