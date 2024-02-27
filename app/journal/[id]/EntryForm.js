'use client'

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function EntryForm({addEntry, setShowAddEntry, journalId}) {

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

  export default EntryForm;
  