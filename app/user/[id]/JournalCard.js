'use client'

export function JournalCard({ data, openJournal }) {

  return (

    <div className="w-[25%] h-64 mx-6 my-2 rounded-lg border shadow-xl hover:animate-wiggle">
      
      <button 
        className="w-full h-full p-4 flex flex-col" 
        onClick={() => openJournal(data.journalId)}
      >
        <h3 className="text-md font-bold text-start">{data.journalName}</h3>
        <p className="text-sm text-start my-2">Created: {data.createdDate}</p> 
      </button>
      
    </div>
  );
  
}

export default JournalCard;
