const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333";

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
};
