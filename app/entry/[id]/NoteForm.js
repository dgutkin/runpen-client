
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function NoteForm({ addNote, updateNote, deleteNote, setShowNoteForm, entryId, noteData, noteCount }) {

    const [noteTitle, setNoteTitle] = useState("");
    const [noteText, setNoteText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const NOTE_TEXT_MAX_WORDS = 200;
    const NOTE_TITLE_MAX_CHARS = 30;
    const MAX_NOTE_COUNT = 20;

    useEffect(() => {
      
      if (noteData) {
        setNoteTitle(noteData.noteTitle);
        setNoteText(noteData.noteText);
      }
      
    }, [])
  
    function submitNote({update}) {
      
      setErrorMessage("");
  
      if (!noteTitle || !noteText) {
        setErrorMessage("Note incomplete.");
        return;
      } else if (noteTitle.length > NOTE_TITLE_MAX_CHARS) {
        setErrorMessage("Maximum character count exceeded.");
        return;
      } else if (noteText.trim().split(/\s+/).length > NOTE_TEXT_MAX_WORDS) {
        setErrorMessage("Maximum word count exceeded.");
        return;
      } else if (noteCount >= MAX_NOTE_COUNT) {
        setErrorMessage("Maximum note count reached.");
        return;
      }
  
      const data = {
        noteTitle,
        noteText,
        noteId: update? noteData.noteId : "N-" + uuidv4(),
        entryId: entryId
      }

      setNoteTitle("");
      setNoteText("");
      
      if (update) {
        updateNote(data);
      } else {
        addNote(data);
      }
  
    }

    function cancelNote() {

      setNoteTitle("");
      setNoteText("");
      setShowNoteForm(false);

    }

    function removeNote() {

      if (noteData.noteId) {
        deleteNote(noteData.noteId);
      }

    }
  
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white overflow-y-auto w-[56rem] h-[33rem] shadow-2xl border border-gray rounded-md p-4 m-10 z-10">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between px-1">
              <h2 className="text-xl font-semibold">Note</h2>
              <button 
                className="text-gray-600"
                type="button"
                onClick={cancelNote}
              >
                <FontAwesomeIcon icon={faX} size="lg"/>
              </button>
            </div>
            <div className="my-6 mx-6">
                <input 
                    type="text" 
                    id="note-title" 
                    name="note-title" 
                    className="w-[40%] bg-white border text-black py-3 px-3 rounded-md focus:border-gray-500"
                    placeholder="Note title"
                    onInput={(e) => setNoteTitle(e.target.value)}
                    value={noteTitle || ""}
                />
                <p className="text-xs text-gray-200 my-1 mx-1">Character count limit is 30.</p>
            </div>
            <div className="my-6 mx-6">
                <textarea 
                    id="note" 
                    name="note" 
                    rows="7" 
                    className="w-full px-2 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-gray-500" 
                    placeholder="Start writing..."
                    onInput={(e) => setNoteText(e.target.value)}
                    value={noteText || ""}
                >
                </textarea>
                <p className="text-xs text-gray-200 mx-1">Word count limit is 200.</p>
            </div>
  
            <div className="flex flex-row my-3 mx-6 justify-between">
                <button 
                  className="bg-red-500 text-white p-2 rounded-md w-36 hover:bg-yinmn-blue" 
                  onClick={removeNote}
                >
                  Delete Note
                </button>
                <button
                  className="bg-dark-green text-white w-36 px-4 py-2 mx-2 rounded-md hover:bg-yinmn-blue" 
                  type="button"
                  onClick={() => Object.keys(noteData).length ? submitNote({update: true}) : submitNote({update: false})}
                >
                {Object.keys(noteData).length ? "Update" : "Add Note"}
                </button>
            </div>
            <p className="mx-8 text-sm text-red-600 text-end">{errorMessage}</p>
          </div>
        </div>
        
      </div>
    );
  
  }

export default NoteForm;
