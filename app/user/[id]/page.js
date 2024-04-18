'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/app/context/auth-provider';
import Loader from '@/app/components/Loading';
import AccessDenied from '@/app/components/AccessDenied';
import ErrorPage from '@/app/components/ErrorPage';

import { getUserNameFromDB, getBgImageFromDB } from '@/app/api/user-api';
import { getJournalsFromDB, addJournalToDB } from '@/app/api/journal-api';

import JournalCard from './JournalCard';
import CreateJournalForm from './CreateJournalForm';

export default function User() {
  
  const [userName, setUserName] = useState("");
  const [journals, setJournals] = useState([]);
  const [bgImage, setBgImage] = useState("");
  const [showAddJournal, setShowAddJournal] = useState(false);
  const [noJournals, setNoJournals] = useState(false);

  const [loading, setLoading] = useState("");
  const [errorPage, setErrorPage] = useState(false);

  const { currentUser } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (currentUser) {
      getUserName();
      getJournalList();
      getBgImage();
    }
  }, []);

  useEffect(() => {
    checkNoJournals();
  }, [journals]);

  function checkNoJournals() {
    if (!journals?.length) {
      setNoJournals(true);
    } else {
      setNoJournals(false);
    }
  }

  function getUserName() {
    getUserNameFromDB(currentUser)
      .then((result) => {
        setUserName(result);
      })
      .catch((error) => {
        setErrorPage(true);
      });
  }

  function getJournalList() {
    getJournalsFromDB(currentUser)
      .then((result) => {
        setJournals(result);
      })
      .catch((error) => {
        setErrorPage(true);
      });
  }

  function getBgImage() {
    getBgImageFromDB(currentUser)
      .then((result) => {
        setBgImage(result);
      })
      .catch((error) => {
        setErrorPage(true);
      })
  }

  function addJournal(journalName) {
    setShowAddJournal(false);
    addJournalToDB(currentUser, journalName)
      .then(() => {
        getJournalList();
      })
      .catch((error) => {
        setErrorPage(true);
      });
  }

  function openJournal(journalId) {
    setLoading(true);
    router.push(`/journal/${journalId}`);
  }
  
  if (!currentUser) {

    return <AccessDenied/>;

  } else if (errorPage) {
    
    return <ErrorPage/>;

  } else {

    return (
      <div 
        className="flex flex-col px-6 lg:px-36 py-16 overflow-y-auto h-full" 
        style={{
              "backgroundImage": `url(${bgImage})`,
              "backgroundRepeat": "no-repeat",
              "backgroundOrigin": "border-box",
              "backgroundPosition": "center",
              "backgroundSize": "cover"
            }}>
          <div>

            <div className="my-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Welcome {userName}!</h2>
            </div>
      
            <div>
              <div className="flex flex-row justify-between">
                <h2 className="text-2xl font-semibold mr-6 py-2 text-gray-700">Journals</h2>
                <button 
                  className="bg-dark-green text-white text-2xl rounded-md px-4 py-2 ml-6 hover:bg-yinmn-blue" 
                  onClick={() => setShowAddJournal(true)}
                >
                  +
                </button>
              </div>
              
              <div className="my-4 flex flex-row flex-wrap justify-start">
              {noJournals ? 
              <p className="text-sm text-gray-900 mt-24 italic">Your journals appear here. Create a new journal to start logging entries!</p>
              :
              journals?.map((item) => {
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

          {loading &&
            <Loader/>
          }

      </div>
    );

  }
}
