'use client';

import { useState, useEffect } from 'react';

import { useAuth } from '@/app/context/auth-provider';
import { useBgImage } from '@/app/context/bg-image-provider';

export default function BackgroundLayout({ children }: { children: React.ReactNode }) {

    const [bgImage, setBgImage] = useState("");

    const currentUser = useAuth();
    const { bgImageUrl } = useBgImage();

    useEffect(() => {
        if (currentUser) {
          setBgImage(bgImageUrl);
        }
      }, [bgImageUrl]);

      return (
        <div 
          className="flex flex-col px-6 lg:px-36 py-16 overflow-y-auto h-full" 
          style={{
            "backgroundImage": `url(${bgImage})`,
            "backgroundRepeat": "no-repeat",
            "backgroundOrigin": "border-box",
            "backgroundPosition": "center",
            "backgroundSize": "cover"
          }}>
            {children}
        </div>
      );

}
