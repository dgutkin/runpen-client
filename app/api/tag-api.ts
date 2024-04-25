
import { User } from 'firebase/auth';

import type { tag } from '@/app/types/common-types';
import { fetchWithJSONResponse, fetchWithTextResponse, serverUrl } from './api-util';

const getTagsFromDB = async (
  currentUser: User, id: string, allJournal: boolean
): Promise<Array<tag>> => {

    const token = await currentUser.getIdToken();

    const options = {
      method: "GET",
      mode: "cors" as RequestMode,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/get-tags" + `?id=${id}&allJournal=${allJournal}`;

    const tags = await fetchWithJSONResponse(url, options);

    return tags;

}

const addTagToDB = async (currentUser: User, tag: tag): Promise<string> => {

    const token = await currentUser.getIdToken();

    const options = {
      method: "POST",
      mode: "cors" as RequestMode,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(tag)
    }

    const url = serverUrl + "/add-tag";

    const response = await fetchWithTextResponse(url, options);

    return response;

}

const deleteTagFromDB = async (currentUser: User, tagId: string): Promise<string> => {

    const token = await currentUser.getIdToken();

    const options = {
      method: "DELETE",
      mode: "cors" as RequestMode,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/delete-tag" + `?tagId=${tagId}`;

    const response = await fetchWithTextResponse(url, options);

    return response;

}

const updateTagToDB = async (currentUser: User, tag: tag): Promise<string> => {

    const token = await currentUser.getIdToken();

    const options = {
      method: "PUT",
      mode: "cors" as RequestMode,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(tag)
    }

    const url = serverUrl + "/update-tag";

    const response = await fetchWithTextResponse(url, options);

    return response;

}

export { 
    getTagsFromDB, 
    addTagToDB, 
    deleteTagFromDB,
    updateTagToDB
};
