'use client'

export default function User() {

    return (

        <div className="container mx-8 max-w-4xl mt-8 flex">

        <div className="w-1/3 pr-8">
          <h2 className="text-2xl font-semibold mb-4">User</h2>
    
          <div className="mb-2">
            <label htmlFor="label1" className="block text-gray-600 font-semibold mb-1">Age Bracket:</label>
            <span id="label1" className="text-gray-800">30-39</span>
          </div>
    
          <div className="mb-2">
            <label htmlFor="label2" className="block text-gray-600 font-semibold mb-1">Years Journalling:</label>
            <span id="label2" className="text-gray-800">Less than 1</span>
          </div>
    
        </div>
    
        <div className="w-2/3">
          <h2 className="text-2xl font-semibold mb-4">Journals</h2>
    
          <ul>
            <li><a href="/journal" className="text-blue-500 hover:underline">Journal 1</a></li>
            <li><a href="/journal" className="text-blue-500 hover:underline">Journal 2</a></li>
          </ul>
        </div>
    
      </div>


    );

}