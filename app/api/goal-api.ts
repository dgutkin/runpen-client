
import { User } from 'firebase/auth';

import type { goal } from '@/app/types/common-types';
import { fetchWithJSONResponse, fetchWithTextResponse, serverUrl } from './api-util';

const getGoalsFromDB = async (currentUser: User, journalId: string): Promise<Array<goal>> => {

    const token = await currentUser.getIdToken();

    const options = {
      method: "GET",
      mode: "cors" as RequestMode,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/get-goals" + `?journalId=${journalId}`;

    const goals = await fetchWithJSONResponse(url, options);

    return goals;

}

const addGoalToDB = async (currentUser: User, goal: goal): Promise<string> => {

  const token = await currentUser.getIdToken();

  const options = {
    method: "POST",
    mode: "cors" as RequestMode,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(goal)
  }

  const url = serverUrl + "/add-goal";

  const response = await fetchWithTextResponse(url, options);

  return response;

}

const deleteGoalFromDB = async (currentUser: User, goalId: string): Promise<string> => {

  const token = await currentUser.getIdToken();

  const options = {
    method: "DELETE",
    mode: "cors" as RequestMode,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }

  const url = serverUrl + "/delete-goal" + `?goalId=${goalId}`;

  const response = await fetchWithTextResponse(url, options);

  return response;

}

const updateGoalToDB = async (currentUser: User, newGoal: goal): Promise<string> => {

  const token = await currentUser.getIdToken();

  const options = {
    method: "PUT",
    mode: "cors" as RequestMode,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(newGoal)
  }

  const url = serverUrl + "/update-goal";

  const response = await fetchWithTextResponse(url, options);

  return response;

}


export { 
  getGoalsFromDB,
  addGoalToDB,
  deleteGoalFromDB,
  updateGoalToDB
};
