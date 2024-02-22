'use client'

import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from '@/app/firebase/firebase';

export default function User() {
  
  const [signedIn, setSignIn] = useState(false);
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [journals, setJournals] = useState([]);

  const auth = getAuth(firebaseApp);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setSignIn(true);
      setUid(user.uid);
    } else {
      setSignIn(false);
    }
  });

  useEffect(() => {
    // fetch the name
    // fetch the list of journal names
  }, [uid]);


  return (

    <div>

      {signedIn ?

        <div className="container mx-8 max-w-4xl mt-8 flex flex-col">
        <div className="mb-8 pr-8">
          <h2 className="text-2xl font-semibold mb-4">Welcome User!</h2>
        </div>
    
        <div className="my-2 px-8">
          <h2 className="text-2xl font-semibold mb-4">Journals</h2>
    
          <ul>
            <li><a href="/journal" className="text-blue-500 hover:underline">Journal 1</a></li>
            <li><a href="/journal" className="text-blue-500 hover:underline">Journal 2</a></li>
          </ul>
        </div>
        </div>

        : 

        <p className="m-4">Access denied.</p>

      }

    </div>

  );

}
