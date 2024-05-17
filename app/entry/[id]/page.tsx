'use client'

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '@/app/context/auth-provider';

import Loader from '@/app/components/Loading';
import DeleteConfirm from '@/app/components/DeleteConfirm';
import ErrorPage from '@/app/components/ErrorPage';

import { getJournalFromDB } from '@/app/api/journal-api';
import { deleteEntryFromDB, getEntryFromDB, updateEntryToDB } from '@/app/api/entry-api';
import { addTagToDB, updateTagToDB, deleteTagFromDB, getTagsFromDB } from '@/app/api/tag-api';
import { addNoteToDB, deleteNoteFromDB, getNotesFromDB, updateNoteToDB } from '@/app/api/note-api';

import type { entry, tag, note } from '@/app/types/common-types';

import EntryForm from './EntryForm';
import TagCard from './TagCard';
import NoteForm from './NoteForm';
import NoteCard from './NoteCard';

const Entry = () => {

    const currentUser = useAuth();

    const pathname = usePathname();
    const entryId = pathname.split("/")[2];
    const router = useRouter();

    const [entryDateFormatted, setEntryDateFormatted] = useState("");
    const [entry, setEntry] = useState<entry | null>();
    const [showEntryForm, setShowEntryForm] = useState(false);
    const [showEntryDeleteConfirm, setShowEntryDeleteConfirm] = useState(false);

    const [journalId, setJournalId] = useState("");
    const [journalName, setJournalName] = useState("");

    const [tags, setTags] = useState([]);
    const [tagLimit, setTagLimit] = useState(false);

    const [notes, setNotes] = useState<Array<note>>([]);
    const [showNoteForm, setShowNoteForm] = useState(false);
    const [noteData, setNoteData] = useState<note>();
    const [noNotes, setNoNotes] = useState(false);
    const [noteUpdate, setNoteUpdate] = useState(false);

    const [loading, setLoading] = useState(false);
    const [errorPage, setErrorPage] = useState(false);

    const MAX_TAGS = 10;

    useEffect(() => {
        if (currentUser) {
            getEntryData();
            getNoteList();
            getTagList();
        }
    }, []);

    useEffect(() => {
        if (currentUser && journalId) getJournalName();
    }, [journalId]);

    useEffect(() => {
        checkNoNotes();
    }, [notes])

    useEffect(() => {
        tags.length >= MAX_TAGS ? setTagLimit(true) : setTagLimit(false);
    }, [tags])

    function checkNoNotes() {
        if (!notes.length) {
            setNoNotes(true);
        } else {
            setNoNotes(false);
        }
    }

    function getJournalName() {
        getJournalFromDB(currentUser, journalId)
            .then((result) => {
                setJournalName(result.journalName);
            })
            .catch((error) => {
                setErrorPage(true);
            });
    }

    function getEntryData() {
        getEntryFromDB(currentUser, entryId)
            .then((result) => {
                const entryDateAsDate = new Date(result.entryDate);
                const formattedDate = (entryDateAsDate).toLocaleString('en-us', {month: 'short', day: 'numeric', year: 'numeric'});
                setEntryDateFormatted(formattedDate);
                setEntry(result);
                setJournalId(result.journalId);
            })
            .catch((error) => {
                setErrorPage(true);
            });
    }

    function updateEntry(formData: entry) {
        setShowEntryForm(false);
        updateEntryToDB(currentUser, formData)
            .then(() => {
                getEntryData();
            })
            .catch((error) => {
                setErrorPage(true);
            })
    }

    function deleteEntry() {
        deleteEntryFromDB(currentUser, entryId)
            .then(() => {
                closeEntry();
            })
            .catch((error) => {
                setErrorPage(true);
            })
    }

    function getNoteList() {
        getNotesFromDB(currentUser, entryId)
            .then((result) => {
                setNotes(result);
            })
            .catch((error) => {
                setErrorPage(true);
            });
    }
    

    function addNote(formData: note) {
        setShowNoteForm(false);
        addNoteToDB(currentUser, formData)
            .then(() => {
                getNoteList();
            })
            .catch((error) => {
                setErrorPage(true);
            });
    }

    function updateNote(formData: note) {
        setShowNoteForm(false);
        updateNoteToDB(currentUser, formData)
            .then(() => {
                getNoteList();
            })
            .catch((error) => {
                setErrorPage(true);
            })
    }

    function deleteNote(noteId: string) {
        setShowNoteForm(false);
        deleteNoteFromDB(currentUser, noteId)
            .then(() => {
                getNoteList();
            })
            .catch((error) => {
                setErrorPage(true);
            });
    }

    function closeEntry() {
        setLoading(true);
        router.push(`/journal/${journalId}`);
    }

    function getTagList() {
        getTagsFromDB(currentUser, entryId, false)
            .then((result) => {
                setTags(result);
            })
            .catch((error) => {
                setErrorPage(true);
            });
    }

    function addTag() {
        const newTag = {
            tagText: "New Tag",
            tagTextIV: "",
            tagId: "T-" + uuidv4(),
            entryId: entryId
        };
        addTagToDB(currentUser, newTag)
            .then(() => {
                getTagList();
            })
            .catch((error) => {
                setErrorPage(true);
            });
    }

    function updateTag(updatedTag: tag) {
        
        updateTagToDB(currentUser, updatedTag)
            .then(() => {
                getTagList();
            })
            .catch((error) => {
                setErrorPage(true);
            })
    }

    function deleteTag(tagId: string) {
        deleteTagFromDB(currentUser, tagId)
            .then(() => {
                getTagList();
            })
            .catch((error) => {
                setErrorPage(true);
            });
    }

    function handleNewNote() {
        setNoteData({
            noteTitle: "",
            noteTitleIV: "",
            noteText: "",
            noteTextIV: "",
            noteId: "",
            entryId: ""
        });
        setNoteUpdate(false);
        setShowNoteForm(true);
    }

    if (!currentUser) {

        router.push('/login');

    } else if (errorPage) {
        
        return <ErrorPage/>;

    } else {

        return (
            <>
                <div className="border shadow-md rounded-md my-6 bg-[#fdfdfd]">
                <div className="flex flex-row justify-between">
                    <div className="w-1/2">
                        <h3 className="text-xl text-gray-900 font-bold ml-8 mt-6">{entryDateFormatted}</h3>
                        <h3 className="text-lg text-wrap break-words text-gray-700 font-semibold ml-8 mt-2">{journalName}</h3>
                    </div>
                    {journalId &&
                    <div className="flex flex-row mt-2">
                        <button 
                            className="text-gray-500 rounded-md mr-6 hover:scale-125"
                            onClick={() => setShowEntryForm(true)}
                        >
                            <FontAwesomeIcon icon={faPencil} size="xl"/>
                        </button>
                        <button 
                            className="text-gray-500 rounded-md mr-8 hover:scale-125"
                            onClick={closeEntry}
                        >
                            <FontAwesomeIcon icon={faX} size="xl"/>
                        </button> 
                    </div>
                    }
                </div>
                <div className="flex flex-col p-8">
                    <h2 className="text-2xl text-gray-900 font-bold mb-8">
                        {entry?.entryLabel}
                    </h2>
                    
                    <ul className="flex flex-row flex-wrap py-2 gap-4 mx-2">
                        {tags.map((item) => {
                            return (
                                <TagCard
                                    key={item.tagId}
                                    data={item}
                                    updateTag={updateTag}
                                    deleteTag={deleteTag}
                                />
                            );
                        })}
                        {!tagLimit &&
                        <button 
                            className="p-2 border-2 rounded-md border-dashed" 
                            onClick={addTag}
                        >
                            + Tag
                        </button>
                        }
                    </ul>

                    <div className="flex flex-row justify-between mt-8">
                        <h3 className="text-xl text-gray-500 py-2 font-bold">Notes</h3>
                        <button 
                            className="bg-dark-green text-white text-2xl px-4 py-2 rounded-md h-1/2 hover:bg-yinmn-blue"
                            onClick={handleNewNote}
                        >
                            +
                        </button>
                    </div>
                    {noNotes?
                    <p className="text-sm py-24 italic my-2">How did today go? Add a note and write about it!</p>
                    :
                    <ul className="flex flex-row flex-wrap py-4 my-2">
                        {
                            notes.map((item) => {
                                return (
                                    <NoteCard 
                                        key={item.noteId} 
                                        data={item} 
                                        setShowNoteForm={setShowNoteForm} 
                                        setNoteData={setNoteData}
                                        setNoteUpdate={setNoteUpdate}
                                    />
                                );
                            })
                        }
                    </ul>
                    }
                    </div>
                </div>

                {showNoteForm && 
                    <NoteForm 
                        addNote={addNote} 
                        updateNote={updateNote}
                        deleteNote={deleteNote} 
                        setShowNoteForm={setShowNoteForm} 
                        entryId={entryId} 
                        noteData={noteData}
                        update={noteUpdate}
                        noteCount={notes.length}
                    />
                }

                {showEntryForm &&
                    <EntryForm
                        entryIn={entry}
                        updateEntry={updateEntry}
                        setShowEntryForm={setShowEntryForm}
                        setShowEntryDeleteConfirm={setShowEntryDeleteConfirm}
                    />

                }

                {showEntryDeleteConfirm &&
                    <DeleteConfirm
                        deleteAction={deleteEntry}
                        setShowDeleteConfirm={setShowEntryDeleteConfirm}
                    />

                }

                {loading &&
                    <Loader/>
                }
            </>
        );

    }

}

export default Entry;
