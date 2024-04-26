'use client'

import { useState, useEffect, createContext, useContext } from 'react';

import { User } from 'firebase/auth';
import { auth } from '@/app/firebase/firebase-config';

const AuthContext = createContext<User | null>(null);

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const done = auth.onAuthStateChanged((user: User | null) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return done;
    }, []);

    return (
        <AuthContext.Provider value={currentUser}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
