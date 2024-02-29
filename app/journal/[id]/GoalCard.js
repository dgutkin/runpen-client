'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function GoalCard({ data, setShowGoalForm, setGoalInFocus, deleteGoal }) {

    return (
        <div className="mb-4 mx-1 p-4 rounded-md shadow border w-[24%] h-24 flex flex-row">
            <button 
                className="h-full w-full" 
                onClick={() => {setShowGoalForm(true); setGoalInFocus(data)}}
            >
                <p className="text-start text-wrap">
                    {data.goalText}
                </p>
            </button>
            <button 
                className="text-gray-500"
                onClick={() => deleteGoal(data.goalId)}
            >
                <FontAwesomeIcon icon={faTrash}/>
            </button>
        </div>
    );

}

export default GoalCard;
