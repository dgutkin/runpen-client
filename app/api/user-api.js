
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

  const url = serverUrl + "/user-name" + `?uid=${currentUser.uid}`;
  
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

export { getUserNameFromDB, addUserToDB };
