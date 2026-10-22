
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, FileText, Home, UserPlus } from "lucide-react";

const links = [
  { label: "Início", href: "/", icon: Home },
  { label: "Currículos", href: "/curriculos/visualizar", icon: FileText },
  { label: "Cadastrar", href: "/curriculos/cadastrar", icon: UserPlus },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-2.5 text-white">
            <BriefcaseBusiness size={24} />
          </div>
          <div>
            <span className="block text-xl font-bold tracking-tight text-slate-900">
              Talent<span className="text-blue-600">Flow</span>
            </span>
            <span className="block text-xs text-slate-500">
              Gestão inteligente de currículos
            </span>
          </div>
        </Link>

        <nav aria-label="Navegação principal" className="flex flex-wrap gap-2">
          {links.map(({ label, href, icon: Icon }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname === href ||
                  pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <Icon size={17} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
