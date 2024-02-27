'use client'

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
                <div className="text-md text-black text-start">
                    {new Date(data.entryDate).toLocaleDateString('en-us', {month:'short', day:'numeric', year:'numeric'})}
                </div>
            </button>
            <button 
                className="bg-dark-green rounded-md text-white px-2 z-10 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100" 
                onClick={openDeleteConfirm}
            >
            Delete
            </button>
        </div>
    );
}

export default EntryCard;
