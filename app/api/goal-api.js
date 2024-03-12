
import { fetchWithJSONResponse, fetchWithTextResponse, serverUrl } from './api-util';

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

    const goals = await fetchWithJSONResponse(url, options)

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

  const response = await fetchWithTextResponse(url, options)

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

  const response = await fetchWithTextResponse(url, options)

  return response;

}

async function updateGoalToDB(currentUser, newGoal) {

  const token = await currentUser.getIdToken();

  const options = {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(newGoal)
  }

  const url = serverUrl + "/update-goal";

  const response = await fetchWithTextResponse(url, options)

  return response;

}


export { 
  getGoalsFromDB,
  addGoalToDB,
  deleteGoalFromDB,
  updateGoalToDB
};
