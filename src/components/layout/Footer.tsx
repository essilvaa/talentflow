
import Link from "next/link";
import { BriefcaseBusiness, Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center md:flex-row md:text-left">
        <div className="flex items-center gap-2 text-slate-600">
          <BriefcaseBusiness size={18} className="text-blue-600" />
          <span className="text-sm">
            © 2026 TalentFlow. Projeto acadêmico.
          </span>
        </div>

        <Link
          href="https://github.com/essilvaa/talentflow"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-blue-600"
        >
          <Code2 size={18} />
          GitHub do projeto
        </Link>
      </div>
    </footer>
  );
}
