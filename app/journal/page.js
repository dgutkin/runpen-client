'use client'

import {useState} from 'react';

import Calendar from '../components/calendar.js';

export default function Journal() {

    const [view, setView] = useState('list');

    function switchView() {
        setView(view == 'list' ? 'calendar' : 'list');
    }

    return (

        <div className="container mx-8 max-w-4xl mt-8 flex">

        <div className="w-1/3 pr-8">
          <h2 className="text-2xl font-semibold mb-4">Journal</h2>
    
          <div className="mb-2">
            <label htmlFor="label1" className="block text-gray-600 font-semibold mb-1">Goal:</label>
            <span id="label1" className="text-gray-800">Run a marathon in sub 4 hours.</span>
          </div>
    
          <div className="mb-2">
            <label htmlFor="label2" className="block text-gray-600 font-semibold mb-1">Start:</label>
            <span id="label2" className="text-gray-800">More details here</span>
          </div>
    
        </div>
    
        <div className="w-2/3">
            <h2 className="text-2xl font-semibold mb-4">Articles</h2>
            <button className="bg-pink-500 text-white px-4 py-2 mr-2 rounded-md hover:bg-green-600" onClick={switchView}>{view} View</button>
            <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-green-600">New Article</button>
            <br/>
            {
            (view == 'list') ? 
            <ul>
                <li><a href="/article" className="text-blue-500 hover:underline">Article 1</a></li>
                <li><a href="/article" className="text-blue-500 hover:underline">Article 2</a></li>
            </ul>
            
            :
                <Calendar/>
            }
          
        </div>
    
      </div>

    );

}