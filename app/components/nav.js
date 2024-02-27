'use client'

import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

import { auth }  from '../firebase/firebase-config';
import { useAuth } from '../context/auth-provider';

export default function Nav() {

  const { currentUser } = useAuth();
  const router = useRouter();

  function handleLogout() {
    signOut(auth).then(() => {
      router.push("/");
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
      <nav className="bg-dark-green py-4 px-36">
          <div className="flex flex-row justify-between mx-4">
            <div className="text-lg text-white font-bold">
              {/* <p>rP</p> */}
              <button onClick={() => router.push("/")}>rP</button>
            </div>

            {currentUser && (
                <div>
                  <button 
                    className="bg-white text-md text-black py-1 px-3 mx-2 rounded-md hover:bg-gray-200" 
                    onClick={() => router.push(`/user/${currentUser.uid}`)}
                  >
                    Home
                  </button>
                  <button 
                    className="bg-white text-md text-black py-1 px-3 mx-2 rounded-md hover:bg-gray-200" 
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                 </div>
              )
            }
          </div>
      </nav>
  );

}
