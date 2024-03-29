'use client'

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function GoalForm({ addGoal, updateGoal, setShowGoalForm, journalId, goalInFocus, goalCount }) {

    const [goalText, setGoalText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const MAX_GOAL_COUNT = 5;

    useEffect(() => {
      if (goalInFocus) {
        setGoalText(goalInFocus.goalText);
      }
    }, []);
  
    function submitGoal({update}) {
      
      setErrorMessage("");
  
      if (!goalText || goalText == "") {
        setErrorMessage("Please provide a goal.");
        return;
      } else if (goalText.length > 50) {
        setErrorMessage("Your goal exceeds the character limit.");
        return;
      } else if (goalCount >= MAX_GOAL_COUNT) {
        setErrorMessage("Maximum number of goals allowed reached.");
        return;
      }
  
      const data = {
        goalText: goalText,
        goalId: update? goalInFocus.goalId : "G-" + uuidv4(),
        journalId: journalId
      }

      if (update) {
        updateGoal(data);
      } else {
        addGoal(data);
      }
  
    }
  
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white overflow-y-auto w-[48rem] h-64 shadow-2xl border border-gray rounded-md p-6 m-10 z-10">
          <form className="flex flex-col">
            <div className="flex flex-row justify-between">
              <h2 className="text-xl font-semibold">Goal</h2>
              <button 
                className="text-gray-500"
                type="button"
                onClick={() => setShowGoalForm(false)}
              >
                <FontAwesomeIcon icon={faX} size="lg"/>
              </button>
            </div>
            <div className="my-6 mx-2">
              <input 
                type="text" 
                id="goal" 
                name="goal" 
                className="w-full border border-gray-200 text-gray-900 py-3 px-4 pr-8 rounded-md focus:outline-none focus:bg-white focus:border-gray-500"
                onInput={(e) => setGoalText(e.target.value)}
                value={goalText || ""}
              />
              <p className="text-sm text-gray-200">50 character limit.</p>
            </div>
  
            <div className="flex flex-row my-2 mx-2 justify-between">
              <p className="my-2 px-1 text-sm text-red-600">{errorMessage}</p>
              <button 
                className="bg-dark-green text-white px-4 py-2 rounded-md hover:bg-yinmn-blue" 
                type="button"
                onClick={() => {Object.keys(goalInFocus).length ? submitGoal({update: true}) : submitGoal({update: false})}}
              >
                {Object.keys(goalInFocus).length ? "Update" : "Add Goal"}
              </button>
            </div>
          </form>
        </div>
        
      </div>
    );
  }

  export default GoalForm;
  