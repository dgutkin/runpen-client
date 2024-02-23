'use client'

import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from '@/app/firebase/firebase';

export default function User() {
  
  const [signedIn, setSignIn] = useState(false);
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [journals, setJournals] = useState([]);
  const [showAddJournal, setShowAddJournal] = useState(false);

  const auth = getAuth(firebaseApp);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setSignIn(true);
      setUid(user.uid);
      fetchUserName(user.uid);
      // fetch list of journals
    } else {
      setSignIn(false);
    }
  });

  async function fetchUserName(uid) {
    console.log(uid);
    // fetch the name
    const options = {
      method: "GET",
      mode: "cors",
      headers: {
          "Content-Type": "application/json"
      }
    }
    const url = (process.env.SERVER_URL || "http://127.0.0.1:8080/user-name") + `?uid=${uid}`;
    
    await fetch(url, options)
      .then((response) => {
          return response.text();
      })
      .then((result) => {
        console.log(result);
        
          setName(result);
        
      })
      .catch((error) => {
          // error fetching
          console.log(error);
      });

  }

  function addJournal() {

    setShowAddJournal(false);
    // fetch POST to add journal to the DB
    // fetch GET journal list
    // update the journals state to re-render

  }

  return (

    <div>

      {signedIn ?

        <div className="container mx-8 max-w-4xl mt-8 flex flex-col">
        <div className="mb-8 px-8">
          <h2 className="text-2xl font-semibold mb-4">Welcome {name}!</h2>
        </div>
    
        <div className="my-2 px-8">
          <div className="flex flex-row">
            <h2 className="text-2xl font-semibold mb-4 mr-6">Journals</h2>
            <button className="bg-dark-green text-white text-sm px-2 py-1 rounded-md mr-4 hover:bg-yinmn-blue" onClick={() => setShowAddJournal(true)}>Add Journal</button>
          </div>
          <ul>
            <li><a href="/journal" className="text-blue-500 hover:underline">Journal 1</a></li>
            <li><a href="/journal" className="text-blue-500 hover:underline">Journal 2</a></li>
          </ul>
        </div>
        {showAddJournal && 
          <section>
            <div className="fixed inset-0 bg-white overflow-y-auto w-[50%] h-[40%] shadow-2xl border border-gray rounded-md p-4 m-10">
              <form>
                <div className="mb-4 mt-6">
                  <label htmlFor="name" className="block text-gray-600 text-sm font-semibold mb-2">Name</label>
                  <input type="text" id="name" name="name" placeholder="Journal name" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" onChange={(e) => setName(e.target.value)}/>
                </div>

                <button className="bg-dark-green text-white px-4 py-2 mt-6 rounded-md hover:bg-yinmn-blue" onClick={addJournal}>
                  Create Journal
                </button>
              </form>
            </div>
          </section>
        }
        </div>
        

        : 

        <p className="m-4">Access denied.</p>

      }

    </div>

  );

}
