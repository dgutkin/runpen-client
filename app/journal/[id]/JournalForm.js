'use client'

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function JournalForm({journalName, setShowJournalForm, setShowJournalDeleteConfirm, updateJournalName}) {

    const [journalTitle, setJournalTitle] = useState("");

    useEffect(() => {
        setJournalTitle(journalName);
    }, []);

    function openDeleteConfirm() {
        setShowJournalForm(false);
        setShowJournalDeleteConfirm(true);
    }

    function updateJournalTitle() {
        setShowJournalForm(false);
        updateJournalName(journalTitle);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white w-[45%] h-[40%] shadow-2xl border border-gray rounded-md p-6 z-10 flex flex-col">
                <div className="flex flex-row justify-between mb-4">
                    <h3 className="text-xl font-semibold">Journal Settings</h3>
                    <button 
                        className="rounded-md text-gray-300"
                        onClick={() => setShowJournalForm(false)}
                    >
                        <FontAwesomeIcon icon={faX} size="lg"/>
                    </button>
                </div>
                <label className="text-md text-gray-600 my-2" htmlFor="title">Journal Title</label>
                <input 
                    type="text" 
                    id="title" 
                    name="title"
                    className="border border-gray-200 rounded-md p-2"
                    onInput={(e) => setJournalTitle(e.target.value)}
                    value={journalTitle || ""}
                />
                <button 
                    className="bg-dark-green text-white my-4 rounded-md w-1/4 p-2"
                    onClick={updateJournalTitle}
                >
                    Update
                </button>
                <button 
                    className="bg-red-600 text-white rounded-md p-2 mt-8 w-1/3" 
                    onClick={openDeleteConfirm}
                >
                    Delete Journal
                </button>
            </div>
        </div>
    );

}

export default JournalForm;
