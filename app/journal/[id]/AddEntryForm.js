'use client'

import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function AddEntryForm({ newEntryDate, addEntry, setShowAddEntry, journalId }) {

    const [entryLabel, setEntryLabel] = useState("");
    const [entryEffort, setEntryEffort] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const MAX_LABEL_CHAR_COUNT = 30;

    const hardEffort = useRef();
    const goodEffort = useRef();
    const lightEffort = useRef();

    function selectEffort(effort) {

      setEffortButtonStyle(effort);
      setEntryEffort(effort);

    }

    function setEffortButtonStyle(effort) {

      const DEFAULT_BG = "#eeeeee";
      const DEFAULT_TEXT = "#000000"
      // reset all button styles to default
      hardEffort.current.style.background=DEFAULT_BG;
      hardEffort.current.style.color=DEFAULT_TEXT;
      goodEffort.current.style.background=DEFAULT_BG;
      goodEffort.current.style.color=DEFAULT_TEXT;
      lightEffort.current.style.background=DEFAULT_BG;
      lightEffort.current.style.color=DEFAULT_TEXT;

      const BACKGROUND = "#013220";
      const TEXT = "#ffffff"

      if (effort == "Hard") {
          hardEffort.current.style.background=BACKGROUND;
          hardEffort.current.style.color=TEXT;
      } else if (effort == "Good") {
          goodEffort.current.style.background=BACKGROUND;
          goodEffort.current.style.color=TEXT;
      } else {
          lightEffort.current.style.background=BACKGROUND;
          lightEffort.current.style.color=TEXT;
      }

  }

    function submitEntry() {
      
      setErrorMessage("");
  
      if (entryLabel.length > MAX_LABEL_CHAR_COUNT) {
        setErrorMessage("Label exceeds character limit.");
        return;
      } else if (entryEffort == "" || entryLabel == "") {
        setErrorMessage("Form is incomplete.");
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
        <div className="bg-white overflow-y-auto w-80 sm:w-96 shadow-2xl border border-gray rounded-md p-4 m-10 z-10">
          <form className="flex flex-col px-2">
            <div className="flex flex-row justify-between">
              <h2 className="text-xl font-semibold mb-4">Add Entry</h2>
              <button 
                className="text-gray-500 px-2" 
                type="button"
                onClick={() => setShowAddEntry(false)}
              >
                  <FontAwesomeIcon icon={faX} size="lg"/>
              </button>
            </div>
            <div className="my-2 flex flex-row gap-7">
              <label 
                htmlFor="date" 
                className="text-md mb-2"
              >
                Date
              </label>
              <p className="font-semibold px-1">{newEntryDate.toLocaleString('en-us', {month: 'short', day: 'numeric', year: 'numeric'})}</p>
            </div>

            <div className="my-2 flex flex-row gap-6">
              <label 
                htmlFor="label" 
                className="text-md mb-2 py-2"
              >
                Label
              </label>
              <div className="flex flex-col">
                <input
                  type="text"
                  id="label"
                  name="label"
                  className="p-2 border rounded-md"
                  onInput={(e) => setEntryLabel(e.target.value)}
                />
                <p className="text-sm text-gray-200 mx-1">Character limit of 30.</p>
              </div>
            </div>
  
            <div className="my-2 flex flex-row gap-2">
              <label className="text-md py-2">Intensity</label>
              <div className="flex flex-row gap-1">
              <button 
                className="text-black bg-gray-200 mx-1 p-2 rounded-md" 
                type="button"
                ref={hardEffort}
                onClick={() => selectEffort("Hard")}
              >
                Hard
              </button>
              <button 
                className="text-black bg-gray-200 mx-1 p-2 rounded-md" 
                type="button"
                ref={goodEffort}
                onClick={() => selectEffort("Good")}
              >
                Good
              </button>
              <button 
                className="text-black bg-gray-200 mx-1 p-2 rounded-md" 
                type="button"
                ref={lightEffort} 
                onClick={() => selectEffort("Light")}
              >
                Light
              </button>
              </div>
            </div>
  
            <div className="flex flex-row my-2 mx-2 justify-between">
              <p className="my-4 py-2 text-sm text-red-600">{errorMessage}</p>
              <button 
                className="bg-dark-green text-white px-4 py-2 my-4 mx-2 rounded-md hover:bg-yinmn-blue" 
                type="button"
                onClick={submitEntry}
              >
                Create Entry
              </button>
            </div>
            
          </form>
        </div>
        
      </div>
    );
  }

  export default AddEntryForm;
  