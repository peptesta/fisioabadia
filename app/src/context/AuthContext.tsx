import  { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';
import type { ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';

interface AuthContextType {
    session: Session | null;
    signUpNewUser: (email: string, password: string, options?: { data?: object }) => Promise<{ success: boolean; error?: any; data?: any }>;
    signOutUser: () => Promise<void>;
    signInUser: (email: string, password: string) => Promise<{ success: boolean; error?: any; data?: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Session | null >(null)

    const signUpNewUser = async (email: string, password: string, options?: { data?: object }) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: options?.data || {}
            }
        })
        if (error) {
            console.error('Errore durante la registrazione:', error.message);
            return { success: false, error };
        }
        return { success: true, data };
    }

    const signInUser = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) {
            console.error('Errore durante il login:', error.message);
            return { success: false, error };
        }
        console.log('Dati di login:', data);
        return { success: true, data };
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    const signOutUser = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Errore durante il logout:', error.message);
        } else {
            setSession(null);
        }
    }

    return (
        <AuthContext.Provider value={{ session, signUpNewUser, signOutUser, signInUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}