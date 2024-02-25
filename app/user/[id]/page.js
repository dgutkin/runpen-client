'use client'

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

import { useAuth } from '../../context/auth-provider';

export function Journal({data, deleteJournal}) {

  return (

    <div className="w-[30%] p-4 mx-1 my-2 rounded-xl border shadow-md flex flex-col">
      <h3 className="text-md">{data.journalName}</h3>
      <p className="text-sm my-2">Created: {data.createdDate}</p>
      <div className="flex flex-row">
      <Link 
        className="w-1/3 p-2 mx-1 text-md text-center text-white bg-dark-green rounded-xl" 
        href={`/journal/${data.journalId}`}
      >Write</Link>
      <button 
        className="w-1/3 p-2 mx-1 text-md text-center text-white bg-dark-green rounded-xl" 
        onClick={() => deleteJournal(data.journalId)}
      >Delete</button>
      </div>
    </div>

  );

}

function AddJournalForm({addJournal, setShowAddJournal}) {

  const [journalName, setJournalName] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white overflow-y-auto w-[50%] h-[40%] shadow-2xl border border-gray rounded-md p-4 m-10 z-10">
        <form>
          <div className="mb-4 mt-6">
            <label htmlFor="name" className="block text-gray-600 text-sm font-semibold mb-2">Name</label>
            <input type="text" id="name" name="name" placeholder="Journal name" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" onChange={(e) => setJournalName(e.target.value)}/>
          </div>

          <button className="bg-dark-green text-white px-4 py-2 mt-6 mx-1 rounded-md hover:bg-yinmn-blue" onClick={() => addJournal(journalName)}>
            Create Journal
          </button>
          <button className="bg-dark-green text-white px-4 py-2 mt-6 mx-1 rounded-md hover:bg-yinmn-blue" onClick={() => setShowAddJournal(false)}>
            Cancel
          </button>
        </form>
      </div>
      
    </div>
  );

}

export default function User() {
  
  const [userName, setUserName] = useState("");
  const [journals, setJournals] = useState([]);
  const [showAddJournal, setShowAddJournal] = useState(false);

  const { currentUser } = useAuth();
  const baseUrl = process.env.SERVER_URL || "http://127.0.0.1:8080";

  useEffect(() => {

    if (currentUser) {
      getUserName();
      getJournalList();
    }

  }, [])

  async function getUserName() {
    
    const token = await currentUser.getIdToken();
    const options = {
      method: "GET",
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      }
    }
    const url = baseUrl + "/user-name" + `?uid=${currentUser.uid}`;
    
    await fetch(url, options)
      .then((response) => {
          return response.text();
      })
      .then((result) => {
        setUserName(result);
      })
      .catch((error) => {
          // error fetching
          console.log(error);
      });

  }

  async function addJournaltoDB(journalName) {

    const token = await currentUser.getIdToken();
    const data = {
      journalName: journalName,
      createdDate: new Date().toLocaleDateString('en-us', {year: "numeric", month: "short", day: "numeric"}),
      journalId: uuidv4(),
      uid: currentUser.uid
    }
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }
    const url = baseUrl + "/add-journal";

    await fetch(url, options)
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        // add journal error
      });

  }

  async function getJournalList() {

    const token = await currentUser.getIdToken();
    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
    const url = baseUrl + "/get-journals" + `?uid=${currentUser.uid}`;

    await fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setJournals(result);
      })
      .catch((error) => {
        // no journals
      });

  }

  async function deleteJournalfromDB(journalId) {

    const token = await currentUser.getIdToken();
    const options = {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
    const url = baseUrl + "/delete-journal" + `?journalId=${journalId}`;

    await fetch(url, options)
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        // error deleting journal
      });

  }

  function addJournal(journalName) {

    setShowAddJournal(false);
    addJournaltoDB(journalName);
    getJournalList();

  }

  function deleteJournal(journalId) {

    deleteJournalfromDB(journalId);
    getJournalList();

  }
  
  if (!currentUser) {

    return (
      <p className="m-4">Access denied.</p>
    );

  } else {

    return (
      <div>
          <div className="container mx-8 mt-8 flex flex-col">

          <div className="mb-8 px-8">
            <h2 className="text-2xl font-semibold mb-4">Welcome {userName}!</h2>
          </div>
      
          <div className="my-2 px-8">
            <div className="flex flex-row">
              <h2 className="text-2xl font-semibold mb-4 mr-6">Journals</h2>
            </div>
            
            <div className="mt-16 flex flex-row flex-wrap justify-start">
            {
              journals.map((item) => {
                return <Journal key={item.journalId} data={item} deleteJournal={deleteJournal}/>;
              })
            }
            </div>
            
            <button 
              className="bg-dark-green text-white text-md w-[15%] px-2 py-1 rounded-md ml-4 mt-16 hover:bg-yinmn-blue" 
              onClick={() => setShowAddJournal(true)}
            >
              Add Journal
            </button>
          </div>
          
          </div>
          {showAddJournal && 
            <AddJournalForm addJournal={addJournal} setShowAddJournal={setShowAddJournal}/>
          }
      </div>
    );

  }

}
