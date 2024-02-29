'use client'

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '@/app/context/auth-provider';
import AccessDenied from '@/app/components/AccessDenied';
import Loader from '@/app/components/Loader';
import DeleteConfirm from '@/app/components/DeleteConfirm';
import Calendar from '@/app/components/Calendar';
import { getJournalFromDB, deleteJournalFromDB, updateJournalToDB } from '@/app/api/journal-api';
import { getGoalsFromDB, addGoalToDB, deleteGoalFromDB, updateGoalToDB } from '@/app/api/goal-api';
import { addEntryToDB, getEntriesFromDB, deleteEntryFromDB } from '@/app/api/entry-api';

import JournalForm from './JournalForm';
import AddEntryForm from './AddEntryForm';
import EntryCard from './EntryCard';
import GoalForm from './GoalForm';
import GoalCard from './GoalCard';

export default function Journal() {

  const [journal, setJournal] = useState({}); 
  const [showJournalDeleteConfirm, setShowJournalDeleteConfirm] = useState(false);
  const [showJournalForm, setShowJournalForm] = useState(false);

  const [entries, setEntries] = useState([]);  
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [entryInFocus, setEntryInFocus] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [calendarView, setCalendarView] = useState(false);

  const [showGoalForm, setShowGoalForm] = useState(false);
  const [goals, setGoals] = useState([]);
  const [goalInFocus, setGoalInFocus] = useState({});

  const pathname = usePathname();
  const router = useRouter();

  const journalId = pathname.split("/")[2];
  const { currentUser } = useAuth();

  useEffect(() => {

    if (currentUser) {
      getJournal();
      getGoalList();
      getEntryList();
    }

  }, [])

  function getJournal() {
    getJournalFromDB(currentUser, journalId).then((result) => {
      setJournal(result);
    });
  }

  async function getEntryList() {
    getEntriesFromDB(currentUser, journalId).then((result) => {
      setEntries(result);
    });
  }

  function updateJournalName(journalName) {
    updateJournalToDB(currentUser, journalName, journal).then(() => {
      getJournal();
    });
  }

  function deleteJournal() {
    setShowJournalDeleteConfirm(false);
    deleteJournalFromDB(currentUser, journalId).then(() => {
      setLoading(true);
      router.push(`/user/${currentUser.uid}`);
    });
  }

  function getGoalList() {
    getGoalsFromDB(currentUser, journalId).then((result) => {
      setGoals(result);
    });
  }

  function addGoal(goalData) {
    setShowGoalForm(false);
    addGoalToDB(currentUser, goalData).then(() => {
      getGoalList();
    });
  }

  function updateGoal(goalData) {
    setShowGoalForm(false);
    updateGoalToDB(currentUser, goalData).then(() => {
      getGoalList();
    });
  }

  function deleteGoal(goalId) {
    deleteGoalFromDB(currentUser, goalId).then(() => {
      getGoalList();
    });
  }

  function addEntry(formData) {
    setShowAddEntry(false);
    addEntryToDB(currentUser, formData).then(() => {
      getEntryList();
    });
  }

  function openEntry(entryId) {
    setLoading(true);
    router.push(`/entry/${entryId}`);
  }

  function deleteEntry() {
    if (entryInFocus) {
      setShowDeleteConfirm(false);
      deleteEntryFromDB(currentUser, entryInFocus).then(() => {
        getEntryList();
      });
    }
  }

  function switchView() {
    setCalendarView(!calendarView);
  }

  if (!currentUser) {

    return <AccessDenied/>;

  } else if (loading) {

    return <Loader/>;
  
  } else {

    return (

        <div className="flex flex-col px-36">

          <div className="flex flex-row justify-between my-10 px-4">
            <h2 className="text-2xl font-semibold">{journal.journalName}</h2>
            <button 
              className="bg-white text-gray-500 rounded-md hover:scale-125 mx-4"
              onClick={() => setShowJournalForm(true)}
            >
              <FontAwesomeIcon icon={faGear} size="2xl"/>
            </button>
          </div>
    
          <div className="my-2 px-8">
            <div className="flex flex-row justify-between">
              <h2 className="text-2xl font-semibold text-gray-600">Goals</h2>
              <button 
                  className="bg-dark-green text-white px-4 py-2 rounded-md hover:bg-yinmn-blue"
                  onClick={() => {setShowGoalForm(true); setGoalInFocus({})}}
                >
                  Add Goal
                </button>
            </div>
            <div className="flex flex-row mt-8">
              {goals.map((item) => {
                return <GoalCard key={item.goalId} data={item} setShowGoalForm={setShowGoalForm} setGoalInFocus={setGoalInFocus} deleteGoal={deleteGoal}/>
              })
              }
            </div>
        </div>
          
        <div className="my-8 px-8">
          <div className="flex flex-row justify-between">
              <h2 className="text-2xl font-semibold mb-4 text-gray-600">Entries</h2>

              <div>
                <button 
                  className="bg-dark-green text-white px-4 py-2 mr-2 rounded-md hover:bg-yinmn-blue" 
                  onClick={switchView}
                >
                  {calendarView? "List" : "Calendar"} View
                </button>
                <button 
                  className="bg-dark-green text-white px-4 py-2 rounded-md hover:bg-yinmn-blue"
                  onClick={() => setShowAddEntry(true)}
                >
                  New Entry
                </button>
              </div>

            </div>
            <div className="py-16">
              {!calendarView ? 
                <div className="flex flex-col w-full">
                    {
                      entries.map((item) => {
                        return (
                          <EntryCard 
                            key={item.entryId} 
                            data={item} 
                            editEntry={openEntry} 
                            setEntryInFocus={setEntryInFocus} 
                            setShowDeleteConfirm={setShowDeleteConfirm}
                          />
                        );
                      })
                    }
                </div>
                :
                <Calendar entries={entries}/>
              }
            </div>
          </div>
          
          {showJournalForm &&
            <JournalForm 
              journalName={journal.journalName} 
              setShowJournalForm={setShowJournalForm} 
              setShowJournalDeleteConfirm={setShowJournalDeleteConfirm} 
              updateJournalName={updateJournalName}
            />
          }

          {showJournalDeleteConfirm &&
            <DeleteConfirm 
              deleteAction={deleteJournal} 
              setShowDeleteConfirm={setShowJournalDeleteConfirm}
            />
          }

          {showGoalForm &&
            <GoalForm 
              addGoal={addGoal} 
              updateGoal={updateGoal} 
              setShowGoalForm={setShowGoalForm} 
              journalId={journalId} 
              goalInFocus={goalInFocus}
            />
          }

          {showAddEntry &&
            <AddEntryForm 
              addEntry={addEntry} 
              setShowAddEntry={setShowAddEntry} 
              journalId={journalId} 
            />
          }

          {showDeleteConfirm &&
            <DeleteConfirm 
              deleteAction={deleteEntry} 
              setShowDeleteConfirm={setShowDeleteConfirm}
            />
          }
          
      </div>

    );
  
  }

}
