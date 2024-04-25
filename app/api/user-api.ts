
import { User } from 'firebase/auth';

import { userData } from '@/app/types/common-types';
import { fetchWithTextResponse, serverUrl } from './api-util';

const getUserNameFromDB = async (currentUser: User): Promise<string> => {

  const token = await currentUser.getIdToken();

  const options = {
    method: "GET",
    mode: "cors" as RequestMode,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
  }

  const url = serverUrl + "/get-user-name" + `?uid=${currentUser.uid}`;
  
  const userName = await fetchWithTextResponse(url, options);
  
  return userName;

}

const addUserToDB = async (user: User, data: userData): Promise<string> => {

  const token = await user.getIdToken();
  
  const options = {
      method: "POST",
      mode: "cors" as RequestMode,
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

const getBgImageFromDB = async (currentUser: User): Promise<string> => {

  const token = await currentUser.getIdToken();

  const options = {
    method: "GET",
    mode: "cors" as RequestMode,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
  }

  const url = serverUrl + "/get-background-image" + `?uid=${currentUser.uid}`;

  const bgImage = await fetchWithTextResponse(url, options);

  return bgImage;

}

const updateBgImageToDB = async (
  currentUser: User, imageUrl: string
): Promise<string> => {

  const token = await currentUser.getIdToken();

  const userData = {
    uid: currentUser.uid,
    bgImage: imageUrl
  };

  const options = {
    method: "PUT",
    mode: "cors" as RequestMode,
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
