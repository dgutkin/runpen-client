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
  
      <div className="flex flex-col px-6 py-16 xl:px-36">

        <div className="bg-white p-6 pl-12 mt-12">
          <div className="container">
            <h2 className="text-2xl font-semibold mb-4">runPen</h2>
            <p>Your private digital running journal.</p>
          </div>
        </div>
  
        <div className="bg-white p-6 pl-12 mt-4 flex justify-left">
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
              Create Account
            </Link>
        </div>
        
      </div>
    
  );

  }

}
