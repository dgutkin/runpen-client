'use client'

import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';

import { auth }  from '@/app/firebase/firebase-config';
import { useAuth } from '@/app/context/auth-provider';

const NavBar = () => {

  const currentUser = useAuth();
  const router = useRouter();

  function handleLogout() {
    signOut(auth).then(() => {
      router.push("/");
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
      <nav className="bg-dark-green py-4 px-6 xl:px-36 w-full fixed top-0 z-10">
          <div className="flex flex-row justify-between ml-2">
            <div className="text-white font-bold">
              <button className="py-1 scale-150" onClick={() => router.push("/")}>runPen</button>
            </div>

            {currentUser && (
                <div className="flex flex-row gap-8">
                  <button 
                    className="text-md py-1 rounded-md hover:scale-125"
                    onClick={() => router.push(`/user/${currentUser.uid}`)}
                  >
                    <FontAwesomeIcon icon={faBook} size="lg" style={{color: "#ffffff"}}/>
                  </button>
                  <button 
                    className="text-md py-1 rounded-md hover:scale-125"
                    onClick={() => router.push(`/user/${currentUser.uid}/profile`)}
                  >
                    <FontAwesomeIcon icon={faUser} size="lg" style={{color: "#ffffff"}}/>
                  </button>
                  <button 
                    className="text-md py-1 rounded-md scale-110 hover:scale-125" 
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} size="lg" style={{color:"#ffffff"}}/>
                  </button>
                 </div>
              )
            }
          </div>
      </nav>
  );

}

export default NavBar;
