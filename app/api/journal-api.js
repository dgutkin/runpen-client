
import { v4 as uuidv4 } from 'uuid';

const serverUrl = process.env.SERVER_URL || "http://127.0.0.1:8080";

async function getJournalFromDB(currentUser, journalId) {
    
    const token = await currentUser.getIdToken();

    const options = {
      method: "GET",
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/get-journal" + `?journalId=${journalId}`;
    
    const journal = await fetch(url, options)
      .then((response) => {
          return response.json();
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
          console.log(error);
      });

      return journal;

}

async function getJournalsFromDB(currentUser) {

    const token = await currentUser.getIdToken();

    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/get-journals" + `?uid=${currentUser.uid}`;

    const journals = await fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
      });

    return journals;

}

async function addJournalToDB(currentUser, journalName) {

    const token = await currentUser.getIdToken();

    const data = {
      journalName: journalName,
      createdDate: new Date().toLocaleDateString('en-us', {year: "numeric", month: "short", day: "numeric"}),
      journalId: "J-" + uuidv4(),
      uid: currentUser.uid
    }

    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }

    const url = serverUrl + "/add-journal";

    const response = await fetch(url, options)
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        console.log(error);
      });

    return response;

}

async function deleteJournalFromDB(currentUser, journalId) {

    const token = await currentUser.getIdToken();

    const options = {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/delete-journal" + `?journalId=${journalId}`;

    const response = await fetch(url, options)
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        console.log(error);
      });

    return response;

}

async function updateJournalToDB(currentUser, journalName, oldJournal) {

    const token = await currentUser.getIdToken();

    const data = {...oldJournal, journalName: journalName};

    const options = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }

    const url = serverUrl + "/update-journal";

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
    getJournalFromDB, 
    getJournalsFromDB, 
    addJournalToDB, 
    deleteJournalFromDB,
    updateJournalToDB
};
