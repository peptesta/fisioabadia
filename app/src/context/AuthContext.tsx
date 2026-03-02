import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../supabaseClient";
import type { ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";

interface AuthContextType {
  session: Session | null;
  isAdmin: boolean;
  authReady: boolean;
  signUpNewUser: (
    email: string,
    password: string,
    options?: { data?: object }
  ) => Promise<{ success: boolean; error?: any; data?: any }>;
  signOutUser: () => Promise<void>;
  signInUser: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: any; data?: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  // 🔐 Controllo admin via RPC
  const checkAdminStatus = async (): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc("is_admin");
      if (error) throw error;
      return !!data;
    } catch (err) {
      console.error("Errore verifica admin:", err);
      return false;
    }
  };

  // 🚀 Inizializzazione completa auth
  const initializeAuth = async () => {
    setAuthReady(false);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      setSession(session);
      const admin = await checkAdminStatus();
      setIsAdmin(admin);
    } else {
      setSession(null);
      setIsAdmin(false);
    }

    setAuthReady(true);
  };

  useEffect(() => {
    initializeAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setAuthReady(false);

        if (session) {
          setSession(session);
          const admin = await checkAdminStatus();
          setIsAdmin(admin);
        } else {
          setSession(null);
          setIsAdmin(false);
        }

        setAuthReady(true);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // 🔑 AUTH FUNCTIONS

  const signUpNewUser = async (
    email: string,
    password: string,
    options?: { data?: object }
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: options?.data || {} },
    });

    if (error) return { success: false, error };
    return { success: true, data };
  };

  const signInUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { success: false, error };
    return { success: true, data };
  };

  const signOutUser = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isAdmin,
        authReady,
        signUpNewUser,
        signOutUser,
        signInUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UserAuth must be used inside AuthContextProvider");
  }
  return context;
};