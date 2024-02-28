'use client'

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '../../context/auth-provider';
import Calendar from '../../components/calendar.js';
import EntryForm from './EntryForm';
import DeleteConfirm from '../../components/DeleteConfirm';
import EntryCard from './EntryCard';
import JournalForm from './JournalForm';

export default function Journal() {

  const [journalName, setJournalName] = useState("");  
  const [entries, setEntries] = useState([]);  
  const [calendarView, setCalendarView] = useState(false);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showJournalDeleteConfirm, setShowJournalDeleteConfirm] = useState(false);
  const [entryInFocus, setEntryInFocus] = useState("");
  const [showJournalForm, setShowJournalForm] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const journalId = pathname.split("/")[2];
  const { currentUser } = useAuth();
  const baseUrl = process.env.SERVER_URL || "http://127.0.0.1:8080";

  useEffect(() => {

    if (currentUser) {
      getJournalName();
      getEntryList();
    }

  }, [])

  async function getJournalName() {
    
    const token = await currentUser.getIdToken();

    const options = {
      method: "GET",
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      }
    }

    const url = baseUrl + "/get-journal" + `?journalId=${journalId}`;
    
    await fetch(url, options)
      .then((response) => {
          return response.json();
      })
      .then((result) => {
        setJournalName(result.journalName);
      })
      .catch((error) => {
          console.log(error);
      });

  }

  async function getEntryList() {

    const token = await currentUser.getIdToken();
    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
    const url = baseUrl + "/get-entries" + `?journalId=${journalId}`;

    await fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setEntries(result);
      })
      .catch((error) => {
        console.log(error);
      });

  }

  async function addEntryToDB(data) {

    const token = await currentUser.getIdToken();
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }
    const url = baseUrl + "/add-entry";

    await fetch(url, options)
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        console.log(error);
      });

  }

  async function deleteEntryFromDB(entryId) {

    const token = await currentUser.getIdToken();
    const options = {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
    const url = baseUrl + "/delete-entry" + `?entryId=${entryId}`;

    await fetch(url, options)
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        console.log(error);
      });

  }

  async function deleteJournalFromDB(journalId) {

    const token = await currentUser.getIdToken();
    const options = {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
    const journalUrl = baseUrl + "/delete-journal" + `?journalId=${journalId}`;
    await fetch(journalUrl, options)
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        console.log(error);
      });

  }

  function switchView() {
      setCalendarView(!calendarView);
  }

  function addEntry(formData) {

    setShowAddEntry(false);
    addEntryToDB(formData);
    getEntryList();

  }

  function editEntry(entryId) {
    router.push(`/entry/${entryId}`);
  }

  function deleteEntry() {
    if (entryInFocus) {
      setShowDeleteConfirm(false);
      deleteEntryFromDB(entryInFocus);
      getEntryList();
    }
  }

  function deleteJournal() {
    setShowJournalDeleteConfirm(false);
    deleteJournalFromDB(journalId);
    router.push(`/user/${currentUser.uid}`);
  }

  if (!currentUser) {

    return (
      <p className="py-4 px-36">Access denied.</p>
    );

  } else {

    return (

        <div className="flex flex-col px-36">

          <div className="flex flex-row justify-between my-10 mx-2 px-4">
            <h2 className="text-2xl font-semibold">{journalName}</h2>
            <button 
              className="bg-white text-gray-500 rounded-md hover:scale-125 mx-4"
              onClick={() => setShowJournalForm(true)}
            >
              <FontAwesomeIcon icon={faGear} size="2xl"/>
            </button>
          </div>
    
          <div className="my-2 px-8">
            <div className="flex flex-row justify-between">
              <h2 className="text-2xl font-semibold mb-4 mr-6 text-gray-600">Entries</h2>

              <div>
                <button 
                  className="bg-dark-green text-white px-4 py-2 mr-2 rounded-md hover:bg-yinmn-blue" 
                  onClick={switchView}
                >
                  {calendarView? "List" : "Calendar"} View
                </button>
                <button 
                  className="bg-dark-green text-white px-4 py-2 rounded-md hover:bg-yinmn-blue"
                  onClick={() => setShowAddEntry(true)}
                >
                  New Entry
                </button>
              </div>

            </div>
              
              <br/>
              {
              (!calendarView) ? 
              <div className="flex flex-col mt-16 w-full">
                  {
                    entries.map((item) => {
                      return (
                        <EntryCard 
                          key={item.entryId} 
                          data={item} 
                          editEntry={editEntry} 
                          setEntryInFocus={setEntryInFocus} 
                          setShowDeleteConfirm={setShowDeleteConfirm}
                        />
                      );
                    })
                  }
              </div>
              
              :
                  <Calendar/>
              }
            
          </div>
          
          {showAddEntry &&
            <EntryForm addEntry={addEntry} setShowAddEntry={setShowAddEntry} journalId={journalId} />
          }

          {showDeleteConfirm &&
            <DeleteConfirm deleteAction={deleteEntry} setShowDeleteConfirm={setShowDeleteConfirm}/>
          }

          {showJournalDeleteConfirm &&
            <DeleteConfirm deleteAction={deleteJournal} setShowDeleteConfirm={setShowJournalDeleteConfirm}/>
          }

          {showJournalForm &&
            <JournalForm journalName={journalName} setShowJournalForm={setShowJournalForm} setShowJournalDeleteConfirm={setShowJournalDeleteConfirm}/>
          }
      </div>

    );
  
  }

}
