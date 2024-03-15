'use client'

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function JournalForm({journalName, setShowJournalForm, setShowJournalDeleteConfirm, updateJournalName}) {

    const [journalTitle, setJournalTitle] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const MAX_JOURNAL_NAME_LENGTH = 20;

    useEffect(() => {
        setJournalTitle(journalName);
    }, []);

    function openDeleteConfirm() {

        setShowJournalForm(false);
        setShowJournalDeleteConfirm(true);
        
    }

    function updateJournalTitle() {

        setErrorMessage("");

        if (!journalTitle || journalTitle.length == 0) {
            setErrorMessage("Journal name cannot be blank.");
            return;
        } else if (journalTitle.length > MAX_JOURNAL_NAME_LENGTH) {
            setErrorMessage("Journal name character limit exceeded.");
            return;
        }

        setShowJournalForm(false);
        updateJournalName(journalTitle);

    }

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white w-[80%] md:w-[32rem] h-96 shadow-2xl border border-gray rounded-md p-6 z-10 flex flex-col">
                <div className="flex flex-row justify-between mb-4">
                    <h3 className="text-xl font-semibold">Journal Settings</h3>
                    <button 
                        className="rounded-md text-gray-500"
                        onClick={() => setShowJournalForm(false)}
                    >
                        <FontAwesomeIcon icon={faX} size="lg"/>
                    </button>
                </div>
                <label 
                    className="text-md text-gray-600 my-4 px-2" 
                    htmlFor="title"
                    >
                    Journal Name
                </label>
                <input 
                    type="text" 
                    id="title" 
                    name="title"
                    className="border border-gray-200 rounded-md p-2 mx-2"
                    onInput={(e) => setJournalTitle(e.target.value)}
                    value={journalTitle || ""}
                />
                <div className="flex flex-row justify-between">
                    <p className="text-red-600 text-sm p-2 my-4 mx-2">{errorMessage}</p>
                    <button 
                        className="bg-dark-green text-white my-4 mx-2 rounded-md w-1/3 p-2 hover:bg-yinmn-blue"
                        onClick={updateJournalTitle}
                    >
                        Update
                    </button>
                </div>
                <div className="flex flex-row justify-between bg-red-100 mt-10 py-4 px-2 rounded-sm">
                <label 
                    className="text-md text-red-600 px-1 py-2" 
                    htmlFor="delete"
                >
                    Delete Journal
                </label>
                <button
                    name="delete"
                    className="bg-red-500 text-white rounded-md p-2 w-1/3 hover:bg-yinmn-blue" 
                    onClick={openDeleteConfirm}
                >
                    Delete
                </button>
                </div>
            </div>
        </div>
    );

}

export default JournalForm;
