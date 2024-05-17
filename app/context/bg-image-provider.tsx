'use client'

import { useState, useEffect, createContext, useContext } from 'react';

import { useAuth } from '@/app/context/auth-provider';
import { getBgImageFromDB } from '@/app/api/user-api';

const BgImageContext = createContext({
    bgImageUrl: "",
    setBgImageUrl: (_: string) => {}
});

export function useBgImage() {
    return useContext(BgImageContext);
}

export default function BgImageProvider({ children }: { children: React.ReactNode }) {

    const [bgImageUrl, setBgImageUrl] = useState<string>("");

    const currentUser = useAuth();

    useEffect(() => {
        getBgImage();
    }, []);

    const getBgImage = async () => {
        const result = await getBgImageFromDB(currentUser);
        if (result) setBgImageUrl(result);
    }

    return (
        <BgImageContext.Provider value={ { bgImageUrl, setBgImageUrl } }>
            { children }
        </BgImageContext.Provider>
    )

}
