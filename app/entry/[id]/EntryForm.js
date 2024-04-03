'use client'

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from '@fortawesome/free-solid-svg-icons';

function EntryForm({ entryIn, updateEntry, setShowEntryForm, setShowEntryDeleteConfirm }) {

    const [entryLabel, setEntryLabel] = useState("");
    const [entryEffort, setEntryEffort] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const hardEffort = useRef();
    const goodEffort = useRef();
    const lightEffort = useRef();

    useEffect(() => {

        setEntryLabel(entryIn.entryLabel);
        setEntryEffort(entryIn.entryEffort);

        setEffortButtonStyle(entryIn.entryEffort);

    }, []);

    function effortSelect(effort) {
        
        const DEFAULT_BG = "#eeeeee";
        const DEFAULT_TEXT = "#000000"
        // reset all button styles to default
        hardEffort.current.style.background=DEFAULT_BG;
        hardEffort.current.style.color=DEFAULT_TEXT;
        goodEffort.current.style.background=DEFAULT_BG;
        goodEffort.current.style.color=DEFAULT_TEXT;
        lightEffort.current.style.background=DEFAULT_BG;
        lightEffort.current.style.color=DEFAULT_TEXT;
        
        setEffortButtonStyle(effort);
        setEntryEffort(effort);

    }

    function setEffortButtonStyle(effort) {

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

    function callUpdateEntry() {

        setErrorMessage("");

        if (entryLabel.length > 50) {
            setErrorMessage("Label exceeds character limit.");
            return;
        } else if (entryEffort == "" || entryLabel == "") {
            setErrorMessage("Form incomplete.");
            return;
        }

        const newEntry = {
            entryDate: entryIn.entryDate,
            entryLabel: entryLabel,
            entryEffort: entryEffort,
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
                    
                    <div className="flex flex-row justify-between my-2">
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
                        <label htmlFor="label" className="text-md py-2">Label</label>
                        <div className="flex flex-col">
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
                    

                    <div className="my-6 flex flex-row gap-6">
                        <label className="text-md py-2">Intensity</label>
                        <div className="flex flex-row gap-1">
                        <button 
                            className="text-black bg-gray-200 p-2 rounded-md" 
                            type="button"
                            ref={hardEffort}
                            onClick={() => effortSelect("Hard")}
                        >
                            Hard
                        </button>
                        <button 
                            className="text-black bg-gray-200 p-2 rounded-md" 
                            type="button" 
                            ref={goodEffort}
                            onClick={() => effortSelect("Good")}
                        >
                            Good
                        </button>
                        <button 
                            className="text-black bg-gray-200 p-2 rounded-md" 
                            type="button"
                            ref={lightEffort}
                            onClick={() => effortSelect("Light")}
                        >
                            Light
                        </button>
                        </div>
                    </div>

                    <div className="flex flex-row justify-between mx-2 mt-4">
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
