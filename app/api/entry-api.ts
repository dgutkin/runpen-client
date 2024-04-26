
import { User } from 'firebase/auth';

import type { entry } from '@/app/types/common-types';
import { fetchWithJSONResponse, fetchWithTextResponse, serverUrl } from './api-util';

const getEntryFromDB = async (currentUser: User | null, entryId: string): Promise<entry> => {
    
    const token = await currentUser?.getIdToken();

    const options = {
      method: "GET",
      mode: "cors" as RequestMode,
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/get-entry" + `?entryId=${entryId}`;
    
    const entry = await fetchWithJSONResponse(url, options);

    return entry;

}

const getEntriesFromDB = async (currentUser: User, journalId: string): Promise<Array<entry>> => {

    const token = await currentUser.getIdToken();

    const options = {
      method: "GET",
      mode: "cors" as RequestMode,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/get-entries" + `?journalId=${journalId}`;

    const entries = await fetchWithJSONResponse(url, options);

    if (entries) {
      entries.sort(
        (a: entry,b: entry) => {
          const bDate = new Date(b.entryDate);
          const aDate = new Date(a.entryDate);
          return bDate.getTime() - aDate.getTime();
        }
      );
    }
    
    return entries;

}

const addEntryToDB = async (currentUser: User, entry: entry): Promise<string> => {

    const token = await currentUser.getIdToken();

    const options = {
      method: "POST",
      mode: "cors" as RequestMode,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(entry)
    }

    const url = serverUrl + "/add-entry";

    const response = await fetchWithTextResponse(url, options);

    return response;

}

const deleteEntryFromDB = async (currentUser: User, entryId: string): Promise<string> => {

    const token = await currentUser.getIdToken();

    const options = {
      method: "DELETE",
      mode: "cors" as RequestMode,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/delete-entry" + `?entryId=${entryId}`;

    const response = await fetchWithTextResponse(url, options);

    return response;

}

const updateEntryToDB = async (currentUser: User, newEntry: entry): Promise<string> => {

    const token = await currentUser.getIdToken();

    const options = {
      method: "PUT",
      mode: "cors" as RequestMode,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(newEntry)
    }

    const url = serverUrl + "/update-entry";

    const response = await fetchWithTextResponse(url, options);

    return response;

}

export { 
    getEntryFromDB, 
    getEntriesFromDB, 
    addEntryToDB, 
    deleteEntryFromDB,
    updateEntryToDB
};
