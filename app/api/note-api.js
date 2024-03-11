
import { serverUrl } from './api-util';

async function getNotesFromDB(currentUser, entryId) {

    const token = await currentUser.getIdToken();

    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/get-notes" + `?entryId=${entryId}`;

    const notes = await fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
      });

    return notes;

}

async function addNoteToDB(currentUser, note) {

    const token = await currentUser.getIdToken();

    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(note)
    }

    const url = serverUrl + "/add-note";

    const response = await fetch(url, options)
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        console.log(error);
      });

    return response;

}

async function deleteNoteFromDB(currentUser, noteId) {

    const token = await currentUser.getIdToken();

    const options = {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/delete-note" + `?noteId=${noteId}`;

    const response = await fetch(url, options)
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        console.log(error);
      });

    return response;

}

async function updateNoteToDB(currentUser, note) {

    const token = await currentUser.getIdToken();

    const options = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(note)
    }

    const url = serverUrl + "/update-note";

    const response = await fetch(url, options)
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        console.log(error);
      });

    return response;

}

export { 
    getNotesFromDB, 
    addNoteToDB, 
    deleteNoteFromDB,
    updateNoteToDB
};
