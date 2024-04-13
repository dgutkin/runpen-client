'use client'

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from '@fortawesome/free-solid-svg-icons';

function EntryForm({ entryIn, updateEntry, setShowEntryForm, setShowEntryDeleteConfirm }) {

    const [entryLabel, setEntryLabel] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {

        setEntryLabel(entryIn.entryLabel);

    }, []);

    function callUpdateEntry() {

        setErrorMessage("");

        if (entryLabel.length > 50) {
            setErrorMessage("Label exceeds character limit.");
            return;
        } else if (entryLabel == "") {
            setErrorMessage("Form incomplete.");
            return;
        }

        const newEntry = {
            entryDate: entryIn.entryDate,
            entryLabel: entryLabel,
            entryId: entryIn.entryId,
            journalId: entryIn.journalId
        }

        updateEntry(newEntry);

    }

    function openEntryDeleteConfirm() {
        setShowEntryForm(false);
        setShowEntryDeleteConfirm(true);
    }

    return (

        <div className="fixed inset-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white overflow-y-auto w-80 sm:w-96 min-h-fit shadow-2xl border border-gray rounded-md p-4 m-10 z-10">
                <form className="flex flex-col mx-2">
                    
                    <div className="flex flex-row justify-between mb-4">
                        <h2 className="text-xl font-semibold">Entry</h2>
                        <button 
                            className="text-gray-500"
                            type="button"
                            onClick={() => setShowEntryForm(false)}
                        >
                            <FontAwesomeIcon icon={faX} size="lg"/>
                        </button>
                    </div>
                    
                    <div className="flex flex-row gap-6 my-2">
                        <label htmlFor="label" className="text-md py-2 mx-1 text-gray-600">Label</label>
                        <div className="flex flex-col w-full">
                            <input
                                type="text"
                                id="label"
                                name="label"
                                className="p-2 border rounded-md"
                                onInput={(e) => setEntryLabel(e.target.value)}
                                value={entryLabel}
                            />
                            <p className="text-sm text-gray-200">Character limit of 50.</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-row justify-between mt-4">
                        <button 
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-yinmn-blue" 
                            type="button"
                            onClick={openEntryDeleteConfirm}
                        >
                            Delete Entry
                        </button>
                        <button 
                            className="bg-dark-green text-white px-4 py-2 rounded-md hover:bg-yinmn-blue" 
                            type="button"
                            onClick={callUpdateEntry}
                        >
                            Update
                        </button>
                    </div>
                    <p className="my-2 mx-8 text-sm text-red-600 text-end">{errorMessage}</p>

                </form>
            </div>
        </div>

    );

}

export default EntryForm;
