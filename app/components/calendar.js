
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Calendar({ entries, setShowAddEntry }) {

    const todayMonth = new Date().getMonth() + 1;
    const todayYear = new Date().getFullYear();

    const daysByMonth = {
        1: {days: 31, name: "January"},
        2: {days: 28, name: "February"},
        3: {days: 31, name: "March"},
        4: {days: 30, name: "April"},
        5: {days: 31, name: "May"},
        6: {days: 30, name: "June"},
        7: {days: 31, name: "July"},
        8: {days: 31, name: "August"},
        9: {days: 30, name: "September"},
        10: {days: 31, name: "October"},
        11: {days: 30, name: "November"},
        12: {days: 31, name: "December"},
        22: {days: 29, name: "February"}
    };

    const daysInWeek = [
        "M", "T", "W", "Th", "F", "S", "Su"
    ];

    const [month, setMonth] = useState(todayMonth);
    const [year, setYear] = useState(todayYear);
    const [days, setDays] = useState([]);
    const [entriesInMonth, setEntriesInMonth] = useState();

    const firstCardOfMonth = useRef();

    useEffect(() => {
        setDays(calcDays(month));
    }, []);

    useEffect(() => {
        setFirstCardOfMonthOffset();
    }, [days])

    useEffect(() => {
        setDays(calcDays(month));
    }, [month]);

    function setFirstCardOfMonthOffset() {
        if (firstCardOfMonth.current) {
            let firstDayOfMonth = new Date(year, month-1).getDay();
            firstCardOfMonth.current.style.gridColumnStart = firstDayOfMonth;
        }
    }

    function calcDays(month) {
        return Array.from(
            { length: daysByMonth[month].days }, (_, index) => index + 1
        );
    }

    function incrementMonth() {
        if (month == 12) {
            setYear(year + 1);
            setMonth((month + 1) % 12);
        } else {
            setMonth(month + 1);
        }
    }

    function decrementMonth() {
        if (month == 1) {
            setYear(year - 1);
            setMonth(month + 11);
        } else {
            setMonth(month - 1)
        }
    }

    return (

        <div className="my-4">
            <div className="flex flex-row justify-between">
                <h2 className="text-xl text-gray-700 font-semibold mb-4">{daysByMonth[month].name} {year}</h2>
                <div>
                    <button 
                        className="mx-1 bg-dark-green text-white p-1 rounded-md hover:scale-125" 
                        onClick={decrementMonth}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} size="lg"/>    
                    </button>
                    <button 
                        className="mx-1 bg-dark-green text-white p-1 rounded-md hover:scale-125" 
                        onClick={incrementMonth}
                    >
                        <FontAwesomeIcon icon={faArrowRight} size="lg"/>    
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {daysInWeek.map((day) => {
                    return <p key={day} className="text-center mt-4 mb-2">{day}</p>
                })}
                {days.map((day) => {
                    if (day == 1) {
                        return (
                            <div key={day} className={"border border-gray-200 rounded-md"} ref={firstCardOfMonth}>
                                <button
                                    className="w-full h-full p-4"
                                    onClick={() => setShowAddEntry(true)}
                                >
                                    <p className="text-sm text-start font-semibold mb-8">{`${day}`}</p>
                                </button>
                            </div>  
                        );
                    } else {
                        return (
                            <div key={day} className="border border-gray-200 rounded-md">
                                <button
                                    className="w-full h-full p-4"
                                    onClick={() => setShowAddEntry(true)}
                                >
                                    <p className="text-sm text-start font-semibold mb-8">{`${day}`}</p>
                                </button>
                            </div>
                        );
                    }
                })}
            </div>
        </div>

    );

}
