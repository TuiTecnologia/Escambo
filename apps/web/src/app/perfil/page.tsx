"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { useAuth } from "@/lib/auth-context";
import { api, ApiError } from "@/lib/api";

export default function PerfilPage() {
  const router = useRouter();
  const { session } = useAuth();
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [country, setCountry] = useState("Brasil");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [radiusMaxKm, setRadiusMaxKm] = useState(10);
  const [tradePreferences, setTradePreferences] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (session === null) router.push("/entrar");
  }, [session, router]);

  useEffect(() => {
    if (!session) return;
    api
      .getMyProfile(session.token)
      .then((profile) => {
        setCountry(profile.country);
        setState(profile.state);
        setCity(profile.city);
        setPostalCode(profile.postalCode);
        setRadiusMaxKm(profile.radiusMaxKm);
        setTradePreferences(profile.tradePreferences.join(", "));
      })
      .catch(() => {
        // Perfil ainda não existe — mantém os valores padrão do formulário.
      })
      .finally(() => setLoadingProfile(false));
  }, [session]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!session) return;
    setError(null);
    setSuccess(false);
    setSaving(true);
    try {
      await api.upsertMyProfile(session.token, {
        country,
        state,
        city,
        postalCode,
        radiusMaxKm: Number(radiusMaxKm),
        tradePreferences: tradePreferences
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro inesperado. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  if (!session || loadingProfile) return null;

  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto w-full max-w-lg flex-1 px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight">Seu perfil</h1>
        <p className="mt-2 text-sm text-muted">
          Sua localização exata nunca fica pública — só cidade, região e
          distância aproximada aparecem para outros usuários.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">País</span>
              <input
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="input"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Estado</span>
              <input
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="input"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Cidade</span>
              <input
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="input"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">CEP</span>
              <input
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="input"
                placeholder="00000-000"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">
              Raio máximo para troca: {radiusMaxKm} km
            </span>
            <input
              type="range"
              min={1}
              max={200}
              value={radiusMaxKm}
              onChange={(e) => setRadiusMaxKm(Number(e.target.value))}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Preferências de troca</span>
            <input
              value={tradePreferences}
              onChange={(e) => setTradePreferences(e.target.value)}
              className="input"
              placeholder="eletrônicos, serviços de design, móveis"
            />
            <span className="text-xs text-muted">Separe por vírgula.</span>
          </label>

          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          {success && <p className="text-sm text-accent">Perfil salvo.</p>}

          <button
            type="submit"
            disabled={saving}
            className="mt-2 self-start rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "Salvando…" : "Salvar perfil"}
          </button>
        </form>
      </main>
    </div>
  );
}
