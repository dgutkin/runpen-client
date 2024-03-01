'use client'

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function AddEntryForm({ newEntryDate, addEntry, setShowAddEntry, journalId }) {

    const [entryLabel, setEntryLabel] = useState("");
    const [entryEffort, setEntryEffort] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
    function submitEntry() {
      
      setErrorMessage("");
  
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
        <div className="bg-white overflow-y-auto w-[40%] min-w-fit h-[50%] min-h-fit shadow-2xl border border-gray rounded-md p-4 m-10 z-10">
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
            <div className="my-4 mx-6 flex flex-row gap-4">
              <label 
                htmlFor="date" 
                className="text-md mb-2 w-1/4"
              >
                Date
              </label>
              <p className="font-semibold px-1">{newEntryDate.toLocaleString('en-us', {month: 'short', day: 'numeric', year: 'numeric'})}</p>
            </div>

            <div className="my-4 mx-6 flex flex-row gap-4">
              <label 
                htmlFor="label" 
                className="text-md mb-2 w-1/4 py-2"
              >
                Label
              </label>
              <div className="flex flex-col px-8 w-full">
                <input
                  type="text"
                  id="label"
                  name="label"
                  className="p-2 border rounded-md"
                  onInput={(e) => setEntryLabel(e.target.value)}
                />
                <p className="text-sm text-gray-200 mx-1">Character limit of 50.</p>
              </div>
            </div>
  
            <div className="my-4 mx-6 flex flex-row gap-4">
              <label className="text-md w-1/4 py-2">Intensity</label>
              <div className="flex flex-row gap-1">
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
  