'use client'

import { useRouter } from 'next/navigation';
// import { useState } from 'react';
import { signOut } from 'firebase/auth';

import { auth }  from '../firebase/firebase-config';
import { useAuth } from '../context/auth-provider';

export default function Nav() {

  // const [signedIn, setSignIn] = useState(false);
  const { currentUser } = useAuth();
  const router = useRouter();
  // const auth = getAuth(firebaseApp);
  
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const uid = user.uid;
  //     setSignIn(true);
  //   }
  // });

  function handleLogout() {

    signOut(auth).then(() => {
      // setSignIn(false);
      router.push("/");
    }).catch((error) => {
      // logout error
    });
    
  }

  return (
      <nav className="bg-dark-green p-4">
          <div className="flex flex-row justify-between mx-4">
            <div className="text-lg text-white font-bold">
              <p>rP</p>
            </div>
            {
              currentUser && (
                  <div>
                      <button className="bg-white text-md text-black p-1 rounded-md" onClick={handleLogout}>Logout</button>
                  </div>
              )
            }
          </div>
      </nav>
  );

}