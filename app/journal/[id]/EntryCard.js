'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function EntryCard({data, editEntry, setEntryInFocus, setShowDeleteConfirm}) {

    function openDeleteConfirm() {
        setEntryInFocus(data.entryId);
        setShowDeleteConfirm(true);
    }

    return (

        <div className="bg-gray-100 rounded-md my-1 relative group flex flex-row hover:bg-gray-200">
            <button 
                className="w-full p-4 transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-100" 
                onClick={() => editEntry(data.entryId)}
            >
                <div className="flex flex-row gap-4">
                    <p className="text-md font-semibold w-36 text-start">{data.entryLabel}</p>
                    {new Date(data.entryDate).toLocaleDateString('en-us', {month:'short', day:'numeric', year:'numeric'})}
                </div>
            </button>
            <button 
                className="rounded-md text-gray-500 mx-4 z-10 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100" 
                onClick={openDeleteConfirm}
            >
                <FontAwesomeIcon icon={faTrash}/>
            </button>
        </div>
    );
}

export default EntryCard;
