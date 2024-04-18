
import { fetchWithTextResponse, serverUrl } from './api-util';

async function getUserNameFromDB(currentUser) {

  const token = await currentUser.getIdToken();

  const options = {
    method: "GET",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
  }

  const url = serverUrl + "/get-user-name" + `?uid=${currentUser.uid}`;
  
  const userName = await fetchWithTextResponse(url, options);
  
  return userName;

}

async function addUserToDB(user, data) {

  const token = await user.getIdToken();
  
  const options = {
      method: "POST",
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
  }

  const url = serverUrl + "/add-user";

  const response = await fetchWithTextResponse(url, options);

  return response;

}

async function getBgImageFromDB(currentUser) {

  const token = await currentUser.getIdToken();

  const options = {
    method: "GET",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
  }

  const url = serverUrl + "/get-background-image" + `?uid=${currentUser.uid}`;

  const bgImage = await fetchWithTextResponse(url, options);

  return bgImage;

}

async function updateBgImageToDB(currentUser, imageUrl) {

  const token = await currentUser.getIdToken();

  const userData = {
    uid: currentUser.uid,
    bgImage: imageUrl
  };

  const options = {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(userData)
  }

  const url = serverUrl + "/update-background-image";

  const response = await fetchWithTextResponse(url, options);

  return response;

}

export { 
  getUserNameFromDB,
  addUserToDB,
  getBgImageFromDB,
  updateBgImageToDB
};
