"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { useAuth } from "@/lib/auth-context";
import { api, ApiError, type Category, type ListingCondition, type DeliveryMethod } from "@/lib/api";

const CONDITIONS: { value: ListingCondition; label: string }[] = [
  { value: "NEW", label: "Novo" },
  { value: "LIKE_NEW", label: "Seminovo" },
  { value: "USED_GOOD", label: "Usado - bom estado" },
  { value: "USED_FAIR", label: "Usado - estado regular" },
];

const DELIVERY_METHODS: { value: DeliveryMethod; label: string }[] = [
  { value: "PICKUP", label: "Retirada em mãos" },
  { value: "SHIPPING", label: "Envio" },
  { value: "BOTH", label: "Retirada ou envio" },
];

const MAX_PHOTOS = 8;

export default function NovoAnuncioPage() {
  const router = useRouter();
  const { session } = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [condition, setCondition] = useState<ListingCondition>("USED_GOOD");
  const [estimatedValue, setEstimatedValue] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("PICKUP");
  const [radiusMaxKm, setRadiusMaxKm] = useState("");
  const [acceptsOtherProposals, setAcceptsOtherProposals] = useState(true);
  const [desiredDescription, setDesiredDescription] = useState("");
  const [photos, setPhotos] = useState<{ file: File; url: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (session === null) router.push("/entrar");
  }, [session, router]);

  useEffect(() => {
    api
      .getCategories()
      .then((list) => {
        setCategories(list);
        if (list.length > 0) setCategoryId((current) => current || list[0].id);
      })
      .catch(() => setError("Não foi possível carregar as categorias. A API está no ar?"));
  }, []);

  // Revoke every remaining object URL when the form unmounts.
  useEffect(() => {
    return () => {
      for (const photo of photos) URL.revokeObjectURL(photo.url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePhotoChange(fileList: FileList | null) {
    if (!fileList) return;
    const added = Array.from(fileList)
      .slice(0, Math.max(0, MAX_PHOTOS - photos.length))
      .map((file) => ({ file, url: URL.createObjectURL(file) }));
    setPhotos((current) => [...current, ...added]);
  }

  function removePhoto(index: number) {
    setPhotos((current) => {
      URL.revokeObjectURL(current[index].url);
      return current.filter((_, i) => i !== index);
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!session) return;
    setError(null);
    setSaving(true);
    try {
      const listing = await api.createListing(session.token, {
        title,
        description,
        categoryId,
        condition,
        estimatedValue: Number(estimatedValue),
        deliveryMethod,
        acceptsOtherProposals,
        radiusMaxKm: radiusMaxKm ? Number(radiusMaxKm) : undefined,
        desiredDescription: desiredDescription || undefined,
      });

      if (photos.length > 0) {
        await api.uploadListingImages(
          session.token,
          listing.id,
          photos.map((photo) => photo.file),
        );
      }

      router.push("/anuncios");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro inesperado. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  if (!session) return null;

  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight">Criar anúncio</h1>
        <p className="mt-2 text-sm text-muted">
          Descreva o que você quer trocar e adicione fotos. O valor estimado
          serve só para calcular compatibilidade — a plataforma não vende nem
          cobra nada.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Título</span>
            <input
              required
              minLength={3}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder="Ex.: Notebook Dell i5 8GB"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Descrição</span>
            <textarea
              required
              minLength={10}
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input resize-y"
              placeholder="Conte o estado do item, tempo de uso, o que está incluso..."
            />
          </label>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Fotos</span>
            <div className="flex flex-wrap gap-3">
              {photos.map((photo, index) => (
                <div key={photo.url} className="group relative h-24 w-24">
                  {/* Blob preview URLs aren't compatible with next/image. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt={`Foto ${index + 1}`}
                    className="h-24 w-24 rounded-lg border border-border object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs text-background"
                    aria-label="Remover foto"
                  >
                    ×
                  </button>
                </div>
              ))}
              {photos.length < MAX_PHOTOS && (
                <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border text-xs text-muted hover:border-accent hover:text-accent">
                  + Adicionar
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    multiple
                    className="hidden"
                    onChange={(e) => handlePhotoChange(e.target.files)}
                  />
                </label>
              )}
            </div>
            <span className="text-xs text-muted">Até {MAX_PHOTOS} fotos.</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Categoria</span>
              <select
                required
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="input"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Condição</span>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ListingCondition)}
                className="input"
              >
                {CONDITIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Valor estimado (R$)</span>
              <input
                required
                type="number"
                min={0}
                step="0.01"
                value={estimatedValue}
                onChange={(e) => setEstimatedValue(e.target.value)}
                className="input"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Entrega</span>
              <select
                value={deliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value as DeliveryMethod)}
                className="input"
              >
                {DELIVERY_METHODS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Raio máximo para essa troca (km)</span>
            <input
              type="number"
              min={1}
              max={500}
              value={radiusMaxKm}
              onChange={(e) => setRadiusMaxKm(e.target.value)}
              className="input"
              placeholder="Usa o raio do seu perfil se deixar em branco"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">O que você gostaria de receber em troca</span>
            <input
              value={desiredDescription}
              onChange={(e) => setDesiredDescription(e.target.value)}
              className="input"
              placeholder="Ex.: celular em bom estado, ou serviços de design"
            />
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={acceptsOtherProposals}
              onChange={(e) => setAcceptsOtherProposals(e.target.checked)}
            />
            Aceito outras propostas além do que descrevi acima
          </label>

          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="mt-2 self-start rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "Publicando…" : "Publicar anúncio"}
          </button>
        </form>
      </main>
    </div>
  );
}
