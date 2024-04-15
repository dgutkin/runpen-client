'use client'

function EntryCard({ data, editEntry, tagList }) {

    return (
        <div className="bg-green-100 my-3 rounded-md relative group flex flex-row hover:bg-green-200">
            <button 
                className="w-full px-4 py-6 transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-100" 
                onClick={() => editEntry(data.entryId)}
            >
                <div className="flex flex-row justify-between">
                    <p className="text-md font-semibold text-start text-wrap break-words self-center">
                        {data.entryLabel.slice(0,25)}{data.entryLabel.slice(25)? "..." : ""}
                    </p>
                    <div className="flex flex-row gap-6">
                    {tagList.map((item) => {
                        return (
                            <p key={item.tagId} className="text-gray-500 hidden md:inline-flex">
                                {item.tagText}
                            </p>
                        );
                    })}
                    </div>
                    <p className="text-md self-center">
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
