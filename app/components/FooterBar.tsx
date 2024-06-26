'use client'

import Link from 'next/link';

const FooterBar = () => {

    return(
      <div className="bg-dark-green py-4 px-6 xl:px-36 w-full fixed bottom-0 z-10">
        <div className="flex flex-row justify-between mx-2">
          <p className="text-white text-xs">&#169; runPen 2024. All rights reserved.</p>
          <Link className="text-white text-xs" href="/privacy">Privacy Policy</Link>
        </div>
      </div>
    );
    
}

export default FooterBar;
