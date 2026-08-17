export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

async function request<T>(
  path: string,
  options: { method?: string; body?: unknown; token?: string | null } = {},
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.message ?? "Não foi possível completar a requisição.";
    throw new ApiError(Array.isArray(message) ? message.join(" ") : message, res.status);
  }

  return data as T;
}

export type AuthResponse = {
  id: string;
  name: string;
  email: string;
  accessToken: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
};

export type Profile = {
  userId: string;
  photoUrl: string | null;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  radiusMaxKm: number;
  tradePreferences: string[];
};

export type Category = {
  id: string;
  name: string;
  type: "PRODUCT" | "SERVICE";
};

export type ListingCondition = "NEW" | "LIKE_NEW" | "USED_GOOD" | "USED_FAIR";
export type DeliveryMethod = "PICKUP" | "SHIPPING" | "BOTH";
export type ListingStatus =
  | "ACTIVE"
  | "PAUSED"
  | "IN_NEGOTIATION"
  | "TRADED"
  | "EXPIRED"
  | "REMOVED";

export type Listing = {
  id: string;
  title: string;
  description: string;
  condition: ListingCondition;
  estimatedValue: string;
  acceptsOtherProposals: boolean;
  availability: string | null;
  deliveryMethod: DeliveryMethod;
  radiusMaxKm: number | null;
  status: ListingStatus;
  createdAt: string;
  category: Category;
  images: { id: string; url: string; order: number }[];
  desiredItems: { id: string; freeDescription: string | null }[];
};

export type CreateListingInput = {
  title: string;
  description: string;
  categoryId: string;
  condition: ListingCondition;
  estimatedValue: number;
  acceptsOtherProposals?: boolean;
  availability?: string;
  deliveryMethod: DeliveryMethod;
  radiusMaxKm?: number;
  desiredDescription?: string;
};

async function uploadListingImages(token: string, listingId: string, files: File[]) {
  const form = new FormData();
  for (const file of files) form.append("files", file);

  const res = await fetch(`${API_URL}/listings/${listingId}/images`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = data?.message ?? "Não foi possível enviar as fotos.";
    throw new ApiError(Array.isArray(message) ? message.join(" ") : message, res.status);
  }
  return data as Listing;
}

export const api = {
  register: (body: { name: string; email: string; phone: string; password: string }) =>
    request<AuthResponse>("/auth/register", { method: "POST", body }),

  login: (body: { email: string; password: string }) =>
    request<AuthResponse>("/auth/login", { method: "POST", body }),

  verifyCode: (token: string, body: { channel: "EMAIL" | "PHONE"; code: string }) =>
    request<{ emailVerified: boolean; phoneVerified: boolean }>("/auth/verify", {
      method: "POST",
      token,
      body,
    }),

  resendCode: (token: string, channel: "EMAIL" | "PHONE") =>
    request<{ sent: boolean }>("/auth/resend-code", { method: "POST", token, body: { channel } }),

  getMyProfile: (token: string) => request<Profile>("/profiles/me", { token }),

  upsertMyProfile: (
    token: string,
    body: {
      country: string;
      state: string;
      city: string;
      postalCode: string;
      radiusMaxKm: number;
      tradePreferences?: string[];
    },
  ) => request<Profile>("/profiles/me", { method: "PUT", token, body }),

  getCategories: () => request<Category[]>("/categories"),

  createListing: (token: string, body: CreateListingInput) =>
    request<Listing>("/listings", { method: "POST", token, body }),

  getMyListings: (token: string) => request<Listing[]>("/listings/mine", { token }),

  getListing: (id: string) => request<Listing>(`/listings/${id}`),

  uploadListingImages: uploadListingImages,
};
