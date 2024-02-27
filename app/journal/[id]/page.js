'use client'

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { usePathname, useRouter } from 'next/navigation';

import { useAuth } from '../../context/auth-provider';
import Calendar from '../../components/calendar.js';

function AddEntryForm({addEntry, setShowAddEntry, journalId}) {

  const [entryDate, setEntryDate] = useState("");
  const [emotion, setEmotion] = useState("");
  const [effort, setEffort] = useState(3);
  const [errorMessage, setErrorMessage] = useState("");

  function submitEntry() {
    
    setErrorMessage("");

    if (entryDate === "" || Date.parse(entryDate) > new Date()) {
      setErrorMessage("Entry date is invalid.");
      return;
    } else if (emotion === "") {
      setErrorMessage("Form isn't complete.");
      return;
    }

    const data = {
      entryDate: entryDate,
      emotion: emotion,
      effort: effort,
      entryId: uuidv4(),
      journalId: journalId
    }
    addEntry(data);

  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white overflow-y-auto w-[45%] h-[55%] shadow-2xl border border-gray rounded-md p-4 m-10 z-10">
        <form className="flex flex-col">
          <h2 className="text-xl font-semibold">New Entry</h2>
          <div className="my-6 mx-6">
            <label 
              htmlFor="date" 
              className="text-md mb-2 mr-14"
            >
              What's the date for the entry?
            </label>
            <input 
              type="date" 
              id="date" 
              name="date" 
              className="w-[40%] bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onInput={(e) => setEntryDate(e.target.value)}
            />
          </div>

          <div className="my-6 mx-6">
            <label className="text-md mr-16">How did the day go overall?</label>
            <button 
              className="text-black bg-gray-200 focus:bg-dark-green focus:text-white mx-1 p-2 rounded-md" 
              type="button"
              onClick={() => setEmotion("Great")}
            >
              Great
            </button>
            <button 
              className="text-black bg-gray-200 focus:bg-dark-green focus:text-white mx-1 p-2 rounded-md" 
              type="button" 
              onClick={() => setEmotion("So-so")}
            >
              So-so
            </button>
            <button 
              className="text-black bg-gray-200 focus:bg-dark-green focus:text-white mx-1 p-2 rounded-md" 
              type="button" 
              onClick={() => setEmotion("Not so good")}
            >
              Not so good
            </button>
          </div>

          <div className="my-6 mx-6 flex items-center">
            <label htmlFor="effort" className="mr-10">How much effort did you put in?</label>
            <input 
              type="range" 
              id="effort" 
              name="rating" 
              min="1" 
              max="5" 
              step="1" 
              className="slider appearance-none bg-gray-200 h-1 w-32 rounded-lg" 
              onInput={(e) => setEffort(e.target.value)}
            />
            <output htmlFor="effort" className="ml-2 text-gray-700">{effort}</output>
          </div>

          <div className="flex flex-row my-6 mx-6">
          <button 
            className="bg-dark-green text-white w-[25%] px-4 py-2 mt-6 mx-2 rounded-md hover:bg-yinmn-blue" 
            type="button"
            onClick={submitEntry}
          >
            Create Entry
          </button>
          <button 
            className="bg-dark-green text-white w-[25%] px-4 py-2 mt-6 mx-2 rounded-md hover:bg-yinmn-blue" 
            type="button"
            onClick={() => setShowAddEntry(false)}
          >
            Cancel
          </button>
          </div>
          <p className="my-2 mx-6 text-sm text-red-600">{errorMessage}</p>
        </form>
      </div>
      
    </div>
  );

}

export default function Journal() {

  const [journalName, setJournalName] = useState("");  
  const [entries, setEntries] = useState([]);  
  const [calendarView, setCalendarView] = useState(false);
  const [showAddEntry, setShowAddEntry] = useState(false);

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
          // error fetching
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
        console.log(result);
        setEntries(result);
      })
      .catch((error) => {
        // no entries
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
        // add entry error
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
        // error deleting journal
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

  function deleteEntry(entryId) {

    deleteEntryFromDB(entryId);
    getEntryList();

  }

  if (!currentUser) {

    return (
      <p className="m-4">Access denied.</p>
    );

  } else {

    return (

        <div className="flex flex-col">

          <div className="flex flex-row justify-between my-8 mx-2 px-4">
            <h2 className="text-2xl font-semibold mb-4">{journalName}</h2>
            <button className="bg-gray-600 text-white rounded-md p-2" onClick={() => router.push(`/user/${currentUser.uid}`)}>Back to Home</button>
          </div>
    
          <div className="my-2 px-8">
            <div className="flex flex-row justify-between">
              <h2 className="text-2xl font-semibold mb-4 mr-6">Entries</h2>
              <div>
                <button 
                  className="bg-dark-green text-white px-4 py-2 mr-2 rounded-md hover:bg-green-600" 
                  onClick={switchView}
                >
                  {calendarView? "List" : "Calendar"} View
                </button>
                <button 
                  className="bg-dark-green text-white px-4 py-2 rounded-md hover:bg-green-600"
                  onClick={() => setShowAddEntry(true)}
                >
                  New Entry
                </button>
              </div>
            </div>
              
              <br/>
              {
              (!calendarView) ? 
              <div className="mt-16 flex flex-col">
                <ul className="divide-y divide-gray-200 w-full">
                  {
                    entries.map((item) => {
                      return (
                        <li key={item.entryId} className="bg-gray-100 rounded-md my-1 relative group flex flex-row">
                          <button 
                            className="w-full p-4 transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-100" 
                            onClick={() => editEntry(item.entryId)}
                          >
                            <div className="text-md text-black text-start">
                              {new Date(item.entryDate).toLocaleDateString('en-us', {month:'short', day:'numeric', year:'numeric'})}
                            </div>
                          </button>
                          <button 
                            className="bg-dark-green rounded-md text-white px-2 z-10 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100" 
                            onClick={() => deleteEntry(item.entryId)}
                          >
                            Delete
                          </button>
                        </li>
                      );
                    })
                  }
                </ul>
              </div>
              
              :
                  <Calendar/>
              }
            
          </div>
          
          {
            showAddEntry &&
            <AddEntryForm addEntry={addEntry} setShowAddEntry={setShowAddEntry} journalId={journalId} />
          }

      </div>

    );
  
  }

}