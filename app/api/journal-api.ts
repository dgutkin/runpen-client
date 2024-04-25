
import { User } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';

import type { journal } from '@/app/types/common-types';
import { fetchWithJSONResponse, fetchWithTextResponse, serverUrl } from './api-util';

const getJournalFromDB = async (currentUser: User, journalId: string): Promise<journal> => {
    
    const token = await currentUser.getIdToken();

    const options = {
      method: "GET",
      mode: "cors" as RequestMode,
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/get-journal" + `?journalId=${journalId}`;
    
    const journal = await fetchWithJSONResponse(url, options);

    return journal;

}

const getJournalsFromDB = async (currentUser: User): Promise<Array<journal>> => {

    const token = await currentUser.getIdToken();

    const options = {
      method: "GET",
      mode: "cors" as RequestMode,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/get-journals" + `?uid=${currentUser.uid}`;

    const journals = await fetchWithJSONResponse(url, options);

    return journals;

}

const addJournalToDB = async (currentUser: User, journalName: string): Promise<string> => {

    const token = await currentUser.getIdToken();

    const data = {
      journalName: journalName,
      createdDate: new Date().toLocaleDateString('en-us', {year: "numeric", month: "short", day: "numeric"}),
      journalId: "J-" + uuidv4(),
      uid: currentUser.uid
    }

    const options = {
      method: "POST",
      mode: "cors" as RequestMode,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }

    const url = serverUrl + "/add-journal";

    const response = await fetchWithTextResponse(url, options);

    return response;

}

const deleteJournalFromDB = async (currentUser: User, journalId: string): Promise<string> => {

    const token = await currentUser.getIdToken();

    const options = {
      method: "DELETE",
      mode: "cors" as RequestMode,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/delete-journal" + `?journalId=${journalId}`;

    const response = await fetchWithTextResponse(url, options);

    return response;

}

const updateJournalToDB = async (currentUser: User, journalName: string, oldJournal: journal): Promise<string> => {

    const token = await currentUser.getIdToken();

    const data = {...oldJournal, journalName: journalName};

    const options = {
      method: "PUT",
      mode: "cors" as RequestMode,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }

    const url = serverUrl + "/update-journal";

    const response = await fetchWithTextResponse(url, options);

    return response;

}

export { 
    getJournalFromDB, 
    getJournalsFromDB, 
    addJournalToDB, 
    deleteJournalFromDB,
    updateJournalToDB
};
