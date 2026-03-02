import  { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';
import type { ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';

interface AuthContextType {
    session: Session | null;
    loading: boolean;
    isAdmin: boolean;
    signUpNewUser: (email: string, password: string, options?: { data?: object }) => Promise<{ success: boolean; error?: any; data?: any }>;
    signOutUser: () => Promise<void>;
    signInUser: (email: string, password: string) => Promise<{ success: boolean; error?: any; data?: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [session, setSession] = useState<Session | null >(null)
    const [loading, setLoading] = useState<boolean>(true)

    const checkAdminStatus = async () => {
        const { data, error } = await supabase.rpc('is_admin');
        if (!error) setIsAdmin(data);
    };

    const signUpNewUser = async (email: string, password: string, options?: { data?: object }) => {
        try {
            setLoading(true);

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: options?.data || {}
                }
            });

            if (error) {
                console.error('Errore durante la registrazione:', error.message);
                return { success: false, error };
            }

            return { success: true, data };
        } finally {
            setLoading(false);
        }
    };

    const signInUser = async (email: string, password: string) => {
        try {
            setLoading(true);

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.error('Errore durante il login:', error.message);
                return { success: false, error };
            }

            return { success: true, data };
        } finally {
            setLoading(false); // 👈 sempre eseguito
        }
    };

    useEffect(() => {
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setLoading(false); 
        };

        getInitialSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        // Quando la sessione cambia, controlla se è admin
        if (session) {
            checkAdminStatus();
        } else {
            setIsAdmin(false);
        }
    }, [session]);

    const signOutUser = async () => {
        try {
            setLoading(true);

            const { error } = await supabase.auth.signOut();

            if (error) {
                console.error('Errore durante il logout:', error.message);
            } else {
                setSession(null);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ session, loading, signUpNewUser, signOutUser, signInUser, isAdmin }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}