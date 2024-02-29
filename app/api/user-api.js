import { v4 as uuidv4 } from 'uuid';

const serverUrl = process.env.SERVER_URL || "http://127.0.0.1:8080";

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
    
    const userName = await fetch(url, options)
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
          console.log(error);
      });

    return userName;

}

export { getUserNameFromDB };