'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/app/context/auth-provider';
import Loader from '@/app/components/Loading';
import AccessDenied from '@/app/components/AccessDenied';
import { getUserNameFromDB } from '@/app/api/user-api';
import { getJournalsFromDB, addJournalToDB } from '@/app/api/journal-api';

import JournalCard from './JournalCard';
import CreateJournalForm from './CreateJournalForm';

export default function User() {
  
  const [userName, setUserName] = useState("");
  const [journals, setJournals] = useState([]);
  const [showAddJournal, setShowAddJournal] = useState(false);
  const [loading, setLoading] = useState("");

  const { currentUser } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (currentUser) {
      getUserName();
      getJournalList();
    }
  }, []);

  function getUserName() {
    getUserNameFromDB(currentUser).then((result) => {
      setUserName(result);
    });
  }

  function getJournalList() {
    getJournalsFromDB(currentUser).then((result) => {
      setJournals(result);
    });
  }

  function addJournal(journalName) {
    setShowAddJournal(false);
    addJournalToDB(currentUser, journalName).then(() => {
      getJournalList();
    });
  }

  function openJournal(journalId) {
    setLoading(true);
    router.push(`/journal/${journalId}`);
  }
  
  if (!currentUser) {

    return <AccessDenied/>

  } else if (loading) { 

    return <Loader/>

  } else {

    return (
      <div>
          <div className="flex flex-col px-36">

            <div className="my-8 mx-8">
              <h2 className="text-2xl font-semibold mb-4">Welcome {userName}!</h2>
            </div>
      
            <div className="mx-8">
              <div className="flex flex-row justify-between">
                <h2 className="text-2xl font-semibold mr-6 py-2 text-gray-600">Journals</h2>
                <button 
                  className="bg-dark-green text-white text-md rounded-md px-4 py-2 ml-6 hover:bg-yinmn-blue" 
                  onClick={() => setShowAddJournal(true)}
                >
                  Add Journal
                </button>
              </div>
              
              <div className="my-16 flex flex-row flex-wrap justify-start">
              {
                journals.map((item) => {
                  return <JournalCard 
                    key={item.journalId}
                    data={item}
                    openJournal={openJournal}
                    />;
                })
              }
              </div>
            </div>
          </div>

          {showAddJournal && 
            <CreateJournalForm 
              addJournal={addJournal} 
              setShowAddJournal={setShowAddJournal}
            />
          }

      </div>
    );

  }
}
