'use client'

import Link from 'next/link';

export default function Home() {

  return (
  
      <div className="flex flex-col">

        <div className="bg-white p-6 pl-12 mt-24">
          <div className="container">
            <h2 className="text-2xl font-semibold mb-4">runPen</h2>
            <p>Run. Write. Reach.</p>
          </div>
        </div>
  
        <div className="bg-white p-6 pl-12 mt-4 flex justify-left">
          <button className="bg-dark-green text-white px-4 py-2 rounded-md mr-4 hover:bg-yinmn-blue">
            <Link href="/login">Login</Link>
          </button>
          <button className="bg-dark-green text-white px-4 py-2 rounded-md hover:bg-yinmn-blue">
            <Link href="/create-account">Create Account</Link>
          </button>
        </div>
        
      </div>
    
  );

}
