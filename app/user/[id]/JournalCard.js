'use client'

export function JournalCard({ data, openJournal }) {

  return (

    <div className="w-64 h-64 mx-6 my-6 rounded-lg border shadow-xl bg-[#fdfdfd]">
      
      <button 
        className="w-full h-full p-4 flex flex-col" 
        onClick={() => openJournal(data.journalId)}
      >
          <h3 className="p-6 text-xl font-semibold text-start text-wrap break-words text-gray-900">{data.journalName}</h3>  
      </button>
      
    </div>
  );
  
}

export default JournalCard;
