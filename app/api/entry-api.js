
import { fetchWithJSONResponse, fetchWithTextResponse, serverUrl } from './api-util';

async function getEntryFromDB(currentUser, entryId) {
    
    const token = await currentUser.getIdToken();

    const options = {
      method: "GET",
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/get-entry" + `?entryId=${entryId}`;
    
    const entry = await fetchWithJSONResponse(url, options)

    return entry;

}

async function getEntriesFromDB(currentUser, journalId) {

    const token = await currentUser.getIdToken();

    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/get-entries" + `?journalId=${journalId}`;

    const entries = await fetchWithJSONResponse(url, options)

    return entries;

}

async function addEntryToDB(currentUser, entry) {

    const token = await currentUser.getIdToken();

    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(entry)
    }

    const url = serverUrl + "/add-entry";

    const response = await fetchWithTextResponse(url, options)

    return response;

}

async function deleteEntryFromDB(currentUser, entryId) {

    const token = await currentUser.getIdToken();

    const options = {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/delete-entry" + `?entryId=${entryId}`;

    const response = await fetchWithTextResponse(url, options)

    return response;

}

async function updateEntryToDB(currentUser, newEntry) {

    const token = await currentUser.getIdToken();

    const options = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(newEntry)
    }

    const url = serverUrl + "/update-entry";

    const response = await fetchWithTextResponse(url, options)

    return response;

}

export { 
    getEntryFromDB, 
    getEntriesFromDB, 
    addEntryToDB, 
    deleteEntryFromDB,
    updateEntryToDB
};
