"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { useAuth } from "@/lib/auth-context";
import { api, API_URL, ApiError, type Listing } from "@/lib/api";

const STATUS_LABEL: Record<Listing["status"], string> = {
  ACTIVE: "Ativo",
  PAUSED: "Pausado",
  IN_NEGOTIATION: "Em negociação",
  TRADED: "Trocado",
  EXPIRED: "Expirado",
  REMOVED: "Removido",
};

export default function MeusAnunciosPage() {
  const router = useRouter();
  const { session } = useAuth();
  const [listings, setListings] = useState<Listing[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session === null) router.push("/entrar");
  }, [session, router]);

  useEffect(() => {
    if (!session) return;
    api
      .getMyListings(session.token)
      .then(setListings)
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : "Não foi possível carregar seus anúncios."),
      );
  }, [session]);

  if (!session) return null;

  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Meus anúncios</h1>
          <Link
            href="/anuncios/novo"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Criar anúncio
          </Link>
        </div>

        {error && <p className="mt-6 text-sm text-red-600 dark:text-red-400">{error}</p>}

        {listings === null && !error && (
          <p className="mt-6 text-sm text-muted">Carregando…</p>
        )}

        {listings?.length === 0 && (
          <p className="mt-6 text-sm text-muted">
            Você ainda não publicou nenhum anúncio.
          </p>
        )}

        <div className="mt-8 flex flex-col gap-4">
          {listings?.map((listing) => (
            <div
              key={listing.id}
              className="flex gap-4 rounded-lg border border-border bg-surface p-4"
            >
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-background">
                {listing.images[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`${API_URL}${listing.images[0].url}`}
                    alt={listing.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-muted">
                    Sem foto
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-medium">{listing.title}</h2>
                  <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 text-xs text-muted">
                    {STATUS_LABEL[listing.status]}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{listing.description}</p>
                <p className="mt-1 text-xs text-muted">
                  {listing.category.name} · {listing.images.length} foto
                  {listing.images.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
