'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseApp }  from '../firebase/firebase';

export default function Nav() {

  const [signedIn, setSignIn] = useState(false);
  const router = useRouter();
  const auth = getAuth(firebaseApp);
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setSignIn(true);
    }
  });

  function handleLogout() {
    signOut(auth).then(() => {
      setSignIn(false);
      router.push("/");
    }).catch((error) => {
      // logout error
    });
  }

  return (
      <nav className="bg-dark-green p-4">
          <div className="flex flex-row justify-between mx-4">
            <div className="text-lg text-white font-bold">
              <Link href="/">rP</Link>
            </div>
            {
              signedIn && (
                  <div>
                      <button className="bg-white text-md text-black p-1 rounded-md" onClick={handleLogout}>Logout</button>
                  </div>
              )
            }
          </div>
      </nav>
  );

}