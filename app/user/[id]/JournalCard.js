'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons';

export function JournalCard({ data, openJournal }) {

  return (

    <div className="w-64 h-64 mx-6 my-6 rounded-lg border shadow-xl hover:animate-wiggle">
      
      <button 
        className="w-full h-full p-4 flex flex-col" 
        onClick={() => openJournal(data.journalId)}
      >
        <div className="border w-full rounded-md p-2">
          <h3 className="text-md font-semibold text-start">{data.journalName}</h3> 
        </div>
        <div className="py-16 w-full justify-center scale-150">
          <FontAwesomeIcon icon={faPersonRunning} size="2xl" style={{color: '#999999'}}/>
        </div>
      </button>
      
    </div>
  );
  
}

export default JournalCard;
