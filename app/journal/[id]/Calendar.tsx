
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import type { entry } from '@/app/types/common-types';

interface CalendarProps {
    entries: Array<entry>;
    setShowAddEntry: (_: boolean) => void;
    setNewEntryDate: (_: string) => void;
    openEntry: (entryId: string) => void;
}

const Calendar = (
    { entries, setShowAddEntry, setNewEntryDate, openEntry }: CalendarProps
) => {

    const todayMonth: number = new Date().getMonth() + 1;
    const todayYear: number = new Date().getFullYear();

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
        12: {days: 31, name: "December"}
    };

    const daysInWeek = [
        "M", "T", "W", "Th", "F", "S", "Su"
    ];
    const CALENDAR_ENTRY_CHAR_MAX = 20;

    const [month, setMonth] = useState<number>(todayMonth);
    const [year, setYear] = useState<number>(todayYear);
    const [days, setDays] = useState<Array<number>>([]);
    const [daysWithEntries, setDaysWithEntries] = useState({});

    const firstCardOfMonth = useRef<HTMLDivElement>();

    useEffect(() => {
        setDays(calcDays(month));
    }, []);

    useEffect(() => {
        setFirstCardOfMonthOffset();
        determineExistingEntries();
    }, [days, entries])
    
    useEffect(() => {
        setDays(calcDays(month));
    }, [month]);

    function setFirstCardOfMonthOffset() {
        if (firstCardOfMonth.current) {
            let firstDayOfMonth = new Date(year, month-1).getDay();
            firstCardOfMonth.current.style.gridColumnStart = firstDayOfMonth.toString();
        }
    }

    function determineExistingEntries() {
        const entriesInMonth = entries.filter((item) => {
            return (
                (new Date(item.entryDate).getMonth() == (month-1)) &&
                    (new Date(item.entryDate).getFullYear() == year)
            );
        });
        
        const entriesInMonthDays = entriesInMonth.reduce((a,v) => {
            const dayKey = new Date(v.entryDate).getDate();
            return (
                {...a, [dayKey]: v}
            );
        }, {});
        
        setDaysWithEntries(entriesInMonthDays);
        
    }

    function calcDays(month: number) {
        let days = daysByMonth[month].days;
        if (month == 2 && year % 4 == 0) days = 29;
        return Array.from(
            { length: days }, (_, index) => index + 1
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

    function selectEntry(day: number) {
        if (daysWithEntries[day]) {
            openEntry(daysWithEntries[day].entryId)
        } else {
            const newDate = new Date(year, month-1, day);
            setNewEntryDate(newDate.toString());
            setShowAddEntry(true);
        }
    }

    return (

        <div className="my-2">
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
                        className="mr-1 bg-dark-green text-white p-1 rounded-md hover:scale-125" 
                        onClick={incrementMonth}
                    >
                        <FontAwesomeIcon icon={faArrowRight} size="lg"/>    
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-1">
                {daysInWeek.map((day) => {
                    return <p key={day} className="text-center mt-4 mb-2">{day}</p>
                })}
                {days.map((day) => {
                    if (day == 1) {
                        return (
                            <div key={day} className={"border border-gray-200 rounded-md h-24 hover:animate-wiggle"} ref={firstCardOfMonth}>
                                {(day in daysWithEntries) ?
                                <button
                                    className="w-full h-full p-2 flex flex-col rounded-md bg-green-100"
                                    onClick={() => selectEntry(day)}
                                >
                                    <p className="text-sm text-start font-semibold mb-2">{day}</p>
                                    <p className="text-xs text-start text-wrap break-words hidden md:inline-flex">
                                        {(daysWithEntries[day] as entry).entryLabel.slice(0,CALENDAR_ENTRY_CHAR_MAX)}{(daysWithEntries[day] as entry).entryLabel.slice(CALENDAR_ENTRY_CHAR_MAX).length? "..." : ""}
                                    </p>
                                </button>
                                :
                                <button
                                    className="w-full h-full p-2 flex flex-col rounded-md"
                                    onClick={() => selectEntry(day)}
                                >
                                    <p className="text-sm text-start font-semibold mb-2">{day}</p>
                                </button>
                                }
                            </div>  
                        );
                    } else {
                        return (
                            <div key={day} className="border border-gray-200 rounded-md h-24 hover:animate-wiggle">
                                {(day in daysWithEntries) ?
                                <button
                                    className="w-full h-full p-2 flex flex-col rounded-md bg-green-100"
                                    onClick={() => selectEntry(day)}
                                >
                                    <p className="text-sm text-start font-semibold mb-2">{day}</p>
                                    <p className="text-xs text-start text-wrap break-words hidden md:inline-flex">
                                        {daysWithEntries[day].entryLabel.slice(0,CALENDAR_ENTRY_CHAR_MAX)}{daysWithEntries[day].entryLabel.slice(CALENDAR_ENTRY_CHAR_MAX).length? "..." : ""}</p>
                                </button>
                                :
                                <button
                                    className="w-full h-full p-2 flex flex-col rounded-md"
                                    onClick={() => selectEntry(day)}
                                >
                                    <p className="text-sm text-start font-semibold mb-2">{day}</p>
                                </button>
                                }
                            </div>
                        );
                    }
                })}
            </div>
        </div>

    );

}

export default Calendar;
