"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { useAuth } from "@/lib/auth-context";
import { api, ApiError } from "@/lib/api";

export default function VerificarPage() {
  const router = useRouter();
  const { session } = useAuth();
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  useEffect(() => {
    if (session === null) router.push("/entrar");
  }, [session, router]);

  useEffect(() => {
    if (emailVerified && phoneVerified) router.push("/perfil");
  }, [emailVerified, phoneVerified, router]);

  if (!session) return null;

  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto w-full max-w-md flex-1 px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight">Confirme sua conta</h1>
        <p className="mt-2 text-sm text-muted">
          Enviamos um código de 6 dígitos para seu e-mail e telefone. Digite os
          dois abaixo para liberar sua conta.
        </p>

        <div className="mt-8 flex flex-col gap-6">
          <VerifyCard
            title="E-mail"
            token={session.token}
            channel="EMAIL"
            verified={emailVerified}
            onVerified={() => setEmailVerified(true)}
          />
          <VerifyCard
            title="Telefone"
            token={session.token}
            channel="PHONE"
            verified={phoneVerified}
            onVerified={() => setPhoneVerified(true)}
          />
        </div>
      </main>
    </div>
  );
}

function VerifyCard({
  title,
  token,
  channel,
  verified,
  onVerified,
}: {
  title: string;
  token: string;
  channel: "EMAIL" | "PHONE";
  verified: boolean;
  onVerified: () => void;
}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleVerify() {
    setError(null);
    setLoading(true);
    try {
      const result = await api.verifyCode(token, { channel, code });
      if ((channel === "EMAIL" && result.emailVerified) || (channel === "PHONE" && result.phoneVerified)) {
        onVerified();
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError(null);
    setInfo(null);
    try {
      await api.resendCode(token, channel);
      setInfo("Novo código enviado.");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro inesperado.");
    }
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-medium">{title}</h2>
        {verified && (
          <span className="text-xs font-medium text-accent">Verificado</span>
        )}
      </div>

      {!verified && (
        <div className="mt-3 flex flex-col gap-3">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            placeholder="000000"
            className="input font-mono tracking-widest"
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleVerify}
              disabled={loading || code.length !== 6}
              className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Confirmando…" : "Confirmar"}
            </button>
            <button
              type="button"
              onClick={handleResend}
              className="text-sm text-accent hover:underline"
            >
              Reenviar código
            </button>
          </div>
          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          {info && <p className="text-sm text-muted">{info}</p>}
        </div>
      )}
    </div>
  );
}
