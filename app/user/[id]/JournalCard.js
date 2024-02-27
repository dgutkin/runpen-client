'use client'

export function JournalCard({data, editJournal, setJournalInFocus, setShowDeleteConfirm}) {

  function openDeleteConfirm() {
    setJournalInFocus(data.journalId);
    setShowDeleteConfirm(true);
  }

  return (

    <div className="w-[30%] mx-1 my-2 rounded-xl border shadow-md flex flex-row hover:animate-wiggle">
      <button 
        className="w-full p-4" 
        onClick={() => editJournal(data.journalId)}
      >
        <h3 className="text-md font-bold text-start">{data.journalName}</h3>
        <p className="text-sm text-start my-2">Created: {data.createdDate}</p>
      </button>
    </div>
  );
  
}

export default JournalCard;
