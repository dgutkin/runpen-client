'use client'

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function AddEntryForm({ newEntryDate, addEntry, setShowAddEntry, journalId }) {

    // const [entryDate, setEntryDate] = useState("");
    const [entryLabel, setEntryLabel] = useState("");
    const [entryEffort, setEntryEffort] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
    function submitEntry() {
      
      setErrorMessage("");
  
      // if (entryDate === "" || Date.parse(entryDate) > new Date()) {
      //   setErrorMessage("Entry date is invalid.");
      //   return;
      if (entryLabel.length > 50) {
        setErrorMessage("Label exceeds character limit.");
        return;
      } else if (entryEffort == "" || entryLabel == "") {
        setErrorMessage("Form isn't complete.");
        return;
      }
  
      const data = {
        entryDate: newEntryDate,
        entryLabel: entryLabel,
        entryEffort: entryEffort,
        entryId: "E-" + uuidv4(),
        journalId: journalId
      }
      
      addEntry(data);
  
    }
  
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white overflow-y-auto w-[50%] min-w-fit h-[50%] min-h-fit shadow-2xl border border-gray rounded-md p-4 m-10 z-10">
          <form className="flex flex-col">
            <div className="flex flex-row justify-between">
              <h2 className="text-xl font-semibold px-2 mb-4">Add Entry</h2>
              <button 
                className="text-gray-500 px-2" 
                type="button"
                onClick={() => setShowAddEntry(false)}
              >
                  <FontAwesomeIcon icon={faX} size="lg"/>
              </button>
            </div>
            <div className="my-4 mx-6 flex flex-row">
              <label 
                htmlFor="date" 
                className="text-md mb-2 mr-14"
              >
                Date
              </label>
              <p className="font-semibold">{newEntryDate.toLocaleString('en-us', {month: 'short', day: 'numeric', year: 'numeric'})}</p>
              {/* <input 
                type="date" 
                id="date" 
                name="date" 
                className="w-[60%] bg-gray-100 border border-gray-200 text-gray-700 p-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onInput={(e) => setEntryDate(e.target.value)}
              /> */}
            </div>

            <div className="my-4 mx-6">
              <label htmlFor="label" className="text-md mb-2 mr-12">Label</label>
              <input
                type="text"
                id="label"
                name="label"
                className="p-2 border rounded-md w-[80%]"
                onInput={(e) => setEntryLabel(e.target.value)}
              />
              <p className="text-sm text-gray-200 ml-24">Character limit of 50.</p>
            </div>
  
            <div className="my-4 mx-6">
              <label className="text-md mr-10">Intensity</label>
              <button 
                className="text-black bg-gray-200 focus:bg-dark-green focus:text-white mx-1 p-2 rounded-md" 
                type="button"
                onClick={() => setEntryEffort("Hard")}
              >
                Hard
              </button>
              <button 
                className="text-black bg-gray-200 focus:bg-dark-green focus:text-white mx-1 p-2 rounded-md" 
                type="button" 
                onClick={() => setEntryEffort("Good")}
              >
                Good
              </button>
              <button 
                className="text-black bg-gray-200 focus:bg-dark-green focus:text-white mx-1 p-2 rounded-md" 
                type="button" 
                onClick={() => setEntryEffort("Light")}
              >
                Light
              </button>
            </div>
  
            <div className="flex flex-row my-6 mx-8 justify-end">
              <button 
                className="bg-dark-green text-white w-[30%] px-4 py-2 mt-6 mx-2 rounded-md hover:bg-yinmn-blue" 
                type="button"
                onClick={submitEntry}
              >
                Create Entry
              </button>
            </div>
            <p className="my-2 mx-6 text-sm text-red-600">{errorMessage}</p>
          </form>
        </div>
        
      </div>
    );
  }

  export default AddEntryForm;
  