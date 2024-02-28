import { v4 as uuidv4 } from 'uuid';

const serverUrl = process.env.SERVER_URL || "http://127.0.0.1:8080";

async function getGoalsFromDB(currentUser, journalId) {

    const token = await currentUser.getIdToken();

    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/get-goals" + `?journalId=${journalId}`;

    const goals = await fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
      });

    return goals;

}

async function addGoalToDB(currentUser, goal) {

  const token = await currentUser.getIdToken();

  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(goal)
  }

  const url = serverUrl + "/add-goal";

  const response = await fetch(url, options)
    .then((response) => {
      return response.text();
    })
    .catch((error) => {
      console.log(error);
    });

  return response;

}

async function deleteGoalFromDB(currentUser, goalId) {

  const token = await currentUser.getIdToken();

  const options = {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }

  const url = serverUrl + "/delete-goal" + `?goalId=${goalId}`;

  const response = await fetch(url, options)
    .then((response) => {
      return response.text();
    })
    .catch((error) => {
      console.log(error);
    });

  return response;

}

async function updateGoalToDB(currentUser, goalText, oldGoal) {

  const token = await currentUser.getIdToken();

  const data = {...oldGoal, goalText: goalText};

  const options = {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }

  const url = serverUrl + "/update-goal";

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
  getGoalsFromDB,
  addGoalToDB,
  deleteGoalFromDB,
  updateGoalToDB
};
