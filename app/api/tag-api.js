
import { fetchWithJSONResponse, fetchWithTextResponse, serverUrl } from './api-util';

async function getTagsFromDB(currentUser, entryId) {

    const token = await currentUser.getIdToken();

    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/get-tags" + `?entryId=${entryId}`;

    const tags = await fetchWithJSONResponse(url, options);

    return tags;

}

async function addTagToDB(currentUser, tag) {

    const token = await currentUser.getIdToken();

    const options = {
      method: "POST",
      mode: "cors",
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

async function deleteTagFromDB(currentUser, tagId) {

    const token = await currentUser.getIdToken();

    const options = {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/delete-tag" + `?tagId=${tagId}`;

    const response = await fetchWithTextResponse(url, options);

    return response;

}

async function updateTagToDB(currentUser, tag) {

    const token = await currentUser.getIdToken();

    const options = {
      method: "PUT",
      mode: "cors",
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
