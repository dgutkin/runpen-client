import dotenv from 'dotenv';

dotenv.config();

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://127.0.0.1:8080";

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

  await fetch(url, options)
    .then((response) => {
      return response.text();
    })
    .catch((error) => {
      console.log(error);
    })

}

export { getUserNameFromDB, addUserToDB };
