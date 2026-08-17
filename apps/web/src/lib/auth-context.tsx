"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Session = {
  token: string;
  id: string;
  name: string;
  email: string;
};

/**
 * `undefined` means "not hydrated from localStorage yet" (only possible on
 * the very first client render); `null` means "confirmed logged out".
 */
type SessionState = Session | null | undefined;

const STORAGE_KEY = "escambo.session";

let listeners: Array<() => void> = [];
let cachedRaw: string | null = null;
let cachedSession: Session | null = null;

function parse(raw: string | null): Session | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

function getSnapshot(): SessionState {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedSession = parse(raw);
  }
  return cachedSession;
}

function getServerSnapshot(): SessionState {
  return undefined;
}

function subscribe(callback: () => void) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((listener) => listener !== callback);
  };
}

function writeSession(session: Session | null) {
  if (session) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } else {
    window.localStorage.removeItem(STORAGE_KEY);
  }
  for (const listener of listeners) listener();
}

type AuthContextValue = {
  /** undefined = still hydrating, null = logged out, Session = logged in */
  session: SessionState;
  login: (session: Session) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const session = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const login = useCallback((next: Session) => writeSession(next), []);
  const logout = useCallback(() => writeSession(null), []);

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  return ctx;
}
