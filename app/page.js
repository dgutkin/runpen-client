'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/app/context/auth-provider';

export default function Home() {

  const { currentUser } = useAuth();
  const router = useRouter();

  if (currentUser) {

    router.push(`/user/${currentUser.uid}`);

  } else {

    return (
  
      <div className="flex flex-col px-6 py-12 xl:px-36">
        
        <div className="flex flex-row mb-12 justify-between">

          <div className="bg-white mt-12">

            <div className="container mt-12">
              <h2 className="text-4xl font-semibold mb-4 text-dark-green">Your private digital training journal.</h2>
              <p className="mb-2 mx-1">Unlock your potential with self-reflection.</p>
              <p className="mx-1">Free to use.</p>
            </div>

            <div className="mt-12 mb-8">
              <Link 
                className="bg-dark-green text-white px-4 py-2 rounded-md mr-4 hover:bg-yinmn-blue" 
                href="/login"
              >
                Login
              </Link>
              <Link 
                className="bg-dark-green text-white px-4 py-2 rounded-md hover:bg-yinmn-blue" 
                href="/create-account"
              >
                Sign Up
              </Link>
            </div>
          </div>

          <img className="mt-16 w-[43%] hidden md:flex" src="/notebook.png"/>

        </div>

        <div className="flex flex-col gap-12 md:gap-36 md:flex-row py-8">
          <div className="flex-1">
            <h3 className="font-bold text-dark-green">Go digital</h3>
            <p className="text-sm text-pretty">Paper journals are a hassle. Write from anywhere and never lose your notes.</p>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-dark-green">Secure writing</h3>
            <p className="text-sm text-pretty">Your data is AES encrypted and not visible to anyone else.</p>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-dark-green">Smart and simple</h3>
            <p className="text-sm text-pretty">Stay organized with a minimalist user interface.</p>
          </div>
        </div>
        
      </div>
    
  );

  }

}
