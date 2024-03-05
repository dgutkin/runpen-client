
import { useState } from 'react';

function Toggle({ calendarView, setCalendarView }) {

    const handleChange = () => {
    setCalendarView(!calendarView);
    };

    return (
        <div className="flex items-center">
            <p className="mr-3 text-gray-700 font-medium">Calendar</p>
            <input
            id="toggle"
            type="checkbox"
            checked={calendarView}
            onChange={handleChange}
            className="hidden"
            />
            <label htmlFor="toggle" className="flex items-center cursor-pointer">

                <div className="relative">
                
                <div className="w-10 h-6 bg-gray-200 rounded-full shadow-inner"></div>
                
                <div
                className={`toggle-dot absolute w-6 h-6 bg-dark-green rounded-full shadow inset-y-0 ${
                    calendarView ? 'left-0' : 'translate-x-full'
                }`}
                >
                </div>
                </div>
            
            </label>
            <p className="ml-3 text-gray-700 font-medium">List</p>
        </div>
    );

};

export default Toggle;
