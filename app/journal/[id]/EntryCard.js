'use client'

function EntryCard({ data, editEntry }) {

    return (

        <div className="bg-green-100 h-24 my-3 rounded-md my-1 relative group flex flex-row hover:bg-green-200">
            <button 
                className="w-full p-4 transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-100" 
                onClick={() => editEntry(data.entryId)}
            >
                <div className="flex flex-row justify-between">
                    <p className="text-md font-semibold w-36 text-start text-wrap break-words">
                        {data.entryLabel.slice(0,25)}{data.entryLabel.slice(25)? "..." : ""}
                    </p>
                    <p className="text-md">
                        {new Date(data.entryDate).toLocaleDateString(
                            'en-us', 
                            {month:'short', day:'numeric', year:'numeric'}
                        )}
                    </p>
                </div>
            </button>
        </div>
    );
}

export default EntryCard;
