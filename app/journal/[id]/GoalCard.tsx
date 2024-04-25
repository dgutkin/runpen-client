'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import type { goal } from '@/app/types/common-types';

interface GoalCardProps {
    data: goal;
    setShowGoalForm: (_: boolean) => void;
    setGoalInFocus: (_: goal) => void;
    deleteGoal: (goalId: string) => void;
}

const GoalCard = (
    { data, setShowGoalForm, setGoalInFocus, deleteGoal }: GoalCardProps
) => {

    return (
        <div className="mb-4 mx-2 bg-[#fdfdfd] rounded-md shadow border flex flex-row hover:bg-gray-200 relative group">
            <button 
                className="h-full w-full p-4 transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-100" 
                onClick={() => {setShowGoalForm(true); setGoalInFocus(data)}}
            >
                <p className="text-start text-wrap">
                    {data.goalText}
                </p>
            </button>
            <button 
                className="text-gray-500 p-4 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                onClick={() => deleteGoal(data.goalId)}
            >
                <FontAwesomeIcon icon={faTrash}/>
            </button>
        </div>
    );

}

export default GoalCard;
