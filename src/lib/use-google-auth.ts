"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type AuthUser = {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
};

const STORAGE_KEY = "parkrate-google-user";

type GoogleCredential = { credential?: string };

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: Record<string, unknown>) => void;
          prompt: () => void;
          revoke?: (email: string, callback: () => void) => void;
        };
      };
    };
  }
}

const decodeCredential = (credential: string): AuthUser | null => {
  try {
    const payload = JSON.parse(atob(credential.split(".")[1] ?? ""));
    return {
      id: payload.sub ?? `google-${Date.now()}`,
      name: payload.name ?? "Google User",
      email: payload.email,
      avatar: payload.picture,
    };
  } catch (error) {
    console.warn("Unable to decode Google credential", error);
    return null;
  }
};

export const useGoogleAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [googleReady, setGoogleReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const cached = window.localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        setUser(JSON.parse(cached) as AuthUser);
      } catch (error) {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!clientId || typeof window === "undefined") return;

    const existing = document.getElementById("google-identity");
    if (existing) return;

    const script = document.createElement("script");
    script.id = "google-identity";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      try {
        window.google?.accounts.id.initialize({
          client_id: clientId,
          callback: (response: GoogleCredential) => {
            if (response.credential) {
              const decoded = decodeCredential(response.credential);
              if (decoded) {
                setUser(decoded);
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify(decoded));
              }
            }
          },
          // Avoid FedCM prompt issues; fall back to the classic popup flow.
          use_fedcm_for_prompt: false,
        });
        setGoogleReady(true);
      } catch (error) {
        console.warn("Unable to initialize Google identity", error);
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [clientId]);

  const signOut = useCallback(() => {
    setUser(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
      window.google?.accounts.id.revoke?.(user?.email ?? "", () => {});
    }
  }, [user?.email]);

  const startGoogleSignIn = useCallback(() => {
    if (googleReady && clientId && typeof window !== "undefined") {
      window.google?.accounts.id.prompt();
    } else {
      // Demo fallback when no client id is provided
      const demoUser: AuthUser = {
        id: `demo-${Date.now()}`,
        name: "Google Demo User",
      };
      setUser(demoUser);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
    }
  }, [clientId, googleReady]);

  return useMemo(
    () => ({
      user,
      loading,
      googleReady,
      clientIdPresent: Boolean(clientId),
      signIn: startGoogleSignIn,
      signOut,
    }),
    [user, loading, googleReady, clientId, startGoogleSignIn, signOut]
  );
};
