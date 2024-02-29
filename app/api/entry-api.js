
const serverUrl = process.env.SERVER_URL || "http://127.0.0.1:8080";

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
    
    const entry = await fetch(url, options)
      .then((response) => {
          return response.json();
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
          console.log(error);
      });

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

    const entries = await fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
      });

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

    const response = await fetch(url, options)
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        console.log(error);
      });

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

    const response = await fetch(url, options)
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        console.log(error);
      });

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

    const response = await fetch(url, options)
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        console.log(error);
      });

    return response;

}

export { 
    getEntryFromDB, 
    getEntriesFromDB, 
    addEntryToDB, 
    deleteEntryFromDB,
    updateEntryToDB
};
