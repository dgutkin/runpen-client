'use client'

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function CreateJournalForm({ addJournal, setShowAddJournal }) {

    const [journalName, setJournalName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const MAX_JOURNAL_NAME_LENGTH = 30;

    function createJournal() {

      setErrorMessage("");

      if (!journalName || journalName == ""){
        setErrorMessage("Journal name cannot be blank.");
        return;
      } else if (journalName.length > MAX_JOURNAL_NAME_LENGTH) {
        setErrorMessage("Journal name exceeds character limit.");
        return;
      }

      addJournal(journalName);

    }
  
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="bg-[#fdfdfd] overflow-y-auto w-80 sm:w-96 shadow-2xl border border-gray rounded-md p-4 m-10 z-10">
          <form>
            <div className="flex flex-row justify-between">
              <h3 className="text-xl font-semibold">Journal</h3>
              <button 
                className="text-gray-600 hover:scale-125"
                type="button"
                onClick={() => setShowAddJournal(false)}
              >
                <FontAwesomeIcon icon={faX}/>
              </button>
            </div>
            <div className="mb-4 mt-12">
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Journal name (max 30 characters)" 
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" 
                  onChange={(e) => setJournalName(e.target.value)}
                />
            </div>

            <div className="flex flex-row justify-between">
              <p className="text-red-600 text-sm px-2 py-2 mt-8">{errorMessage}</p>
              <button 
                  className="bg-dark-green text-white px-4 py-2 mt-8 mx-1 rounded-md hover:bg-yinmn-blue" 
                  type="button"
                  onClick={createJournal}
              >
                Create Journal
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  
  }

  export default CreateJournalForm;
