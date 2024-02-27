


export function JournalCard({data, editJournal, deleteJournal}) {

    return (
  
      <div className="w-[30%] mx-1 my-2 rounded-xl border shadow-md flex flex-row hover:animate-wiggle">
        <button className="w-full p-4" onClick={() => editJournal(data.journalId)}>
          <h3 className="text-md font-bold text-start">{data.journalName}</h3>
          <p className="text-sm text-start my-2">Created: {data.createdDate}</p>
        </button>
        <button 
          className="w-1/3 p-2 mx-1 text-md text-center text-white bg-dark-green rounded-xl" 
          onClick={() => deleteJournal(data.journalId)}
        >Delete</button>
      </div>
  
    );
  
}

export default JournalCard;
