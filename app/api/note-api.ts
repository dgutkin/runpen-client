
import { User } from 'firebase/auth';

import type { note } from '@/app/types/common-types';
import { fetchWithJSONResponse, fetchWithTextResponse, serverUrl } from './api-util';

const getNotesFromDB = async (currentUser: User, entryId: string): Promise<Array<note>> => {

    const token = await currentUser.getIdToken();

    const options = {
      method: "GET",
      mode: "cors" as RequestMode,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/get-notes" + `?entryId=${entryId}`;

    const notes = await fetchWithJSONResponse(url, options);

    return notes;

}

const addNoteToDB = async (currentUser: User, note: note): Promise<string> => {

    const token = await currentUser.getIdToken();

    const options = {
      method: "POST",
      mode: "cors" as RequestMode,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(note)
    }

    const url = serverUrl + "/add-note";

    const response = await fetchWithTextResponse(url, options);

    return response;

}

const deleteNoteFromDB = async (currentUser: User, noteId: string): Promise<string> => {

    const token = await currentUser.getIdToken();

    const options = {
      method: "DELETE",
      mode: "cors" as RequestMode,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/delete-note" + `?noteId=${noteId}`;

    const response = await fetchWithTextResponse(url, options);

    return response;

}

const updateNoteToDB = async (currentUser: User, note: note): Promise<string> => {

    const token = await currentUser.getIdToken();

    const options = {
      method: "PUT",
      mode: "cors" as RequestMode,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(note)
    }

    const url = serverUrl + "/update-note";

    const response = await fetchWithTextResponse(url, options);

    return response;

}

export { 
    getNotesFromDB, 
    addNoteToDB, 
    deleteNoteFromDB,
    updateNoteToDB
};
