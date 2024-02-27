'use client'

import { useState } from 'react';

function JournalForm({addJournal, setShowAddJournal}) {

    const [journalName, setJournalName] = useState("");
  
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="bg-white overflow-y-auto w-[50%] h-[40%] shadow-2xl border border-gray rounded-md p-4 m-10 z-10">
          <form>
            <div className="mb-4 mt-6">
                <label 
                    htmlFor="name" 
                    className="block text-gray-600 text-sm font-semibold mb-2"
                >
                    Name
                </label>
                <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Journal name" 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" 
                onChange={(e) => setJournalName(e.target.value)}
                />
            </div>
  
            <button 
                className="bg-dark-green text-white px-4 py-2 mt-6 mx-1 rounded-md hover:bg-yinmn-blue" 
                onClick={() => addJournal(journalName)}
            >
              Create Journal
            </button>

            <button 
                className="bg-dark-green text-white px-4 py-2 mt-6 mx-1 rounded-md hover:bg-yinmn-blue" 
                onClick={() => setShowAddJournal(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  
  }

  export default JournalForm;
