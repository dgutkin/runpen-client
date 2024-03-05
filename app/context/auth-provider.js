'use client'

import { useState, useEffect, createContext, useContext } from 'react';

import { auth } from '@/app/firebase/firebase-config';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const value = {
        currentUser
    };

    useEffect(() => {
        const done = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return done;
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
