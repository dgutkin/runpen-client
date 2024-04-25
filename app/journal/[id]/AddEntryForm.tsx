'use client'

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

import type { entry } from '@/app/types/common-types';

interface AddEntryFormProps {
  newEntryDate: string;
  addEntry: (formData: entry) => void;
  setShowAddEntry: (_: boolean) => void;
  journalId: string;
}

const AddEntryForm = (
  { newEntryDate, addEntry, setShowAddEntry, journalId }: AddEntryFormProps
) => {

    const [entryLabel, setEntryLabel] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const MAX_LABEL_CHAR_COUNT = 30;

    function submitEntry() {
      
      setErrorMessage("");
  
      if (entryLabel.length > MAX_LABEL_CHAR_COUNT) {
        setErrorMessage("Label exceeds character limit.");
        return;
      } else if (entryLabel == "") {
        setErrorMessage("Form is incomplete.");
        return;
      }
  
      const data = {
        entryDate: newEntryDate,
        entryLabel: entryLabel,
        entryLabelIV: "",
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
            <div className="flex flex-row justify-between mb-4">
              <h2 className="text-xl font-semibold">Add Entry</h2>
              <button 
                className="text-gray-500" 
                type="button"
                onClick={() => setShowAddEntry(false)}
              >
                  <FontAwesomeIcon icon={faX} size="lg"/>
              </button>
            </div>
            <div className="my-2 flex flex-row gap-7">
              <label 
                htmlFor="date" 
                className="text-md mb-2 text-gray-600"
              >
                Date
              </label>
              <p className="font-semibold px-1">
                {newEntryDate.toLocaleString('en-us', {month: 'short', day: 'numeric', year: 'numeric'})}
              </p>
            </div>

            <div className="my-2 flex flex-row gap-6">
              <label 
                htmlFor="label" 
                className="text-md mb-2 py-2 text-gray-600"
              >
                Label
              </label>
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  id="label"
                  name="label"
                  className="p-2 border rounded-md"
                  onInput={(e) => setEntryLabel((e.target as HTMLInputElement).value)}
                />
                <p className="text-sm text-gray-200 mx-1">Character limit of 30.</p>
              </div>
            </div>
  
            <div className="flex flex-row my-2 justify-between">
              <p className="my-4 py-2 text-sm text-red-600">{errorMessage}</p>
              <button 
                className="bg-dark-green text-white px-4 py-2 my-4 rounded-md hover:bg-yinmn-blue" 
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
  