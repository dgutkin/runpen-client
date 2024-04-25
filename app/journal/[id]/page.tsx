'use client'

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '@/app/context/auth-provider';
import Loader from '@/app/components/Loading';
import DeleteConfirm from '@/app/components/DeleteConfirm';
import Toggle from '@/app/components/Toggle';
import ErrorPage from '@/app/components/ErrorPage';

import { getBgImageFromDB } from '@/app/api/user-api';
import { getJournalFromDB, deleteJournalFromDB, updateJournalToDB } from '@/app/api/journal-api';
import { getGoalsFromDB, addGoalToDB, deleteGoalFromDB, updateGoalToDB } from '@/app/api/goal-api';
import { addEntryToDB, getEntriesFromDB } from '@/app/api/entry-api';
import { getTagsFromDB } from '@/app/api/tag-api';

import type { goal, entry } from '@/app/types/common-types';

import JournalForm from './JournalForm';
import AddEntryForm from './AddEntryForm';
import EntryCard from './EntryCard';
import GoalForm from './GoalForm';
import GoalCard from './GoalCard';
import Calendar from './Calendar';

const Journal: React.FC = () => {

  const [journal, setJournal] = useState({}); 
  const [showJournalDeleteConfirm, setShowJournalDeleteConfirm] = useState(false);
  const [showJournalForm, setShowJournalForm] = useState(false);

  const [entries, setEntries] = useState([]);  
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [newEntryDate, setNewEntryDate] = useState();
  
  const [loading, setLoading] = useState(false);
  const [calendarView, setCalendarView] = useState(true);
  const [errorPage, setErrorPage] = useState(false);

  const [showGoalForm, setShowGoalForm] = useState(false);
  const [goals, setGoals] = useState([]);
  const [goalInFocus, setGoalInFocus] = useState({});

  const [tags, setTags] = useState([]);

  const [bgImage, setBgImage] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const journalId = pathname.split("/")[2];
  const currentUser = useAuth();

  useEffect(() => {

    if (currentUser) {
      getJournal();
      getGoalList();
      getEntryList();
      getTagList();
      getBgImage();
    }

  }, [])

  function getJournal() {
    getJournalFromDB(currentUser, journalId)
      .then((result) => {
        setJournal(result);
      })
      .catch((error) => {
        setErrorPage(true);
      });
  }

  async function getEntryList() {
    getEntriesFromDB(currentUser, journalId)
      .then((result) => {
        setEntries(result);
      })
      .catch((error) => {
        setErrorPage(true);
      });
  }

  function updateJournalName(journalName: string) {
    updateJournalToDB(currentUser, journalName, journal)
      .then(() => {
        getJournal();
      })
      .catch((error) => {
        setErrorPage(true);
      });
  }

  function deleteJournal() {
    setShowJournalDeleteConfirm(false);
    deleteJournalFromDB(currentUser, journalId)
      .then(() => {
        setLoading(true);
        router.push(`/user/${currentUser.uid}`);
      })
      .catch((error) => {
        setErrorPage(true);
      });
  }

  function getGoalList() {
    getGoalsFromDB(currentUser, journalId)
      .then((result) => {
        setGoals(result);
      })
      .catch((error) => {
        setErrorPage(true);
      });
  }

  function addGoal(goalData: goal) {
    setShowGoalForm(false);
    addGoalToDB(currentUser, goalData)
      .then(() => {
        getGoalList();
      })
      .catch((error) => {
        setErrorPage(true);
      });
  }

  function updateGoal(goalData: goal) {
    setShowGoalForm(false);
    updateGoalToDB(currentUser, goalData)
      .then(() => {
        getGoalList();
      })
      .catch((error) => {
        setErrorPage(true);
      });
  }

  function deleteGoal(goalId: string) {
    deleteGoalFromDB(currentUser, goalId)
      .then(() => {
        getGoalList();
      })
      .catch((error) => {
        setErrorPage(true);
      })
  }

  function addEntry(formData: entry) {
    setShowAddEntry(false);
    addEntryToDB(currentUser, formData)
      .then(() => {
        getEntryList();
        setLoading(true);
        router.push(`/entry/${formData.entryId}`);
      })
      .catch((error) => {
        setErrorPage(true);
      });
  }

  function openEntry(entryId: string) {
    setLoading(true);
    router.push(`/entry/${entryId}`);
  }

  function getTagList() { 
    getTagsFromDB(currentUser, journalId, true)
      .then((result) => {
        setTags(result);
      })
      .catch((error) => {
        setErrorPage(true);
      });
  }

  function getBgImage() {
    getBgImageFromDB(currentUser)
      .then((result) => {
        setBgImage(result);
      })
      .catch((error) => {
        setErrorPage(true);
      })
  }

  if (!currentUser) {

    router.push('/login');
  
  } else if (errorPage) {
    
    return <ErrorPage/>;

  } else {

    return (

        <div 
          className="flex flex-col px-6 xl:px-36 py-16 h-full overflow-y-auto" 
          style={{backgroundImage: `url(${bgImage})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}
        >

          <div className="flex flex-row justify-between my-10">
            <h2 className="text-2xl text-gray-900 font-semibold w-[80%] text-wrap break-words">{journal.journalName}</h2>
            <button 
              className="text-dark-green rounded-md hover:scale-125 px-2"
              onClick={() => setShowJournalForm(true)}
            >
              <FontAwesomeIcon icon={faGear} size="2xl"/>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 mb-8">

            <div className="mb-8 flex flex-col lg:w-1/3">
              <div className="flex flex-row justify-between gap-6">
                <h2 className="text-2xl py-1 font-semibold text-gray-700">Goals</h2>
                <button 
                  className="bg-dark-green text-white text-2xl mx-1 px-4 py-1 rounded-md hover:bg-yinmn-blue"
                  onClick={() => {setShowGoalForm(true); setGoalInFocus({})}}
                >
                  +
                </button>
              </div>

              <div className="flex flex-col mt-6">
                {goals.map((item: goal) => {
                  return (
                    <GoalCard 
                      key={item.goalId} 
                      data={item} 
                      setShowGoalForm={setShowGoalForm} 
                      setGoalInFocus={setGoalInFocus} 
                      deleteGoal={deleteGoal}
                    />
                  );
                })
                }
              </div>
            </div>

            <div className="px-4 flex flex-col lg:w-[66%]">

              <div className="flex flex-row justify-between gap-6">
                  <h2 className="text-2xl font-semibold text-gray-700">Entries</h2>
                  <div className="py-1">
                    <Toggle calendarView={calendarView} setCalendarView={setCalendarView}/>
                  </div>
              </div>

              <div className="my-6 border shadow-md rounded-md py-2 px-3 bg-[#fdfdfd]">
                {!calendarView ? 
                  <div className="w-full">
                      {entries.map((item) => {
                          return (
                            <EntryCard 
                              key={item.entryId} 
                              data={item} 
                              editEntry={openEntry}
                              tagList={tags.filter((tag) => tag.entryId == item.entryId).slice(0,3)}
                            />
                          );
                        })
                      }
                  </div>
                  :
                  <Calendar 
                    entries={entries}
                    setShowAddEntry={setShowAddEntry}
                    setNewEntryDate={setNewEntryDate}
                    openEntry={openEntry}
                  />
                }
              </div>

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
              goalCount={goals.length}
            />
          }

          {showAddEntry &&
            <AddEntryForm 
              newEntryDate={newEntryDate}
              addEntry={addEntry}
              setShowAddEntry={setShowAddEntry} 
              journalId={journalId} 
            />
          }

          {loading &&
            <Loader/>
          }
          
      </div>

    );
  
  }

}

export default Journal;
