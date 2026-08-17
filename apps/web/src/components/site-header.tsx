"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export function SiteHeader() {
  const { session, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Escambo
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted">
          <Link href="/#como-funciona" className="hidden hover:text-foreground sm:inline">
            Como funciona
          </Link>
          <Link href="/#diferenciais" className="hidden hover:text-foreground sm:inline">
            Diferenciais
          </Link>
          {session === undefined ? null : session ? (
            <>
              <Link href="/perfil" className="hover:text-foreground">
                {session.name.split(" ")[0]}
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="hover:text-foreground"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link href="/entrar" className="hover:text-foreground">
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="rounded-full bg-accent px-4 py-2 font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                Cadastrar
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
