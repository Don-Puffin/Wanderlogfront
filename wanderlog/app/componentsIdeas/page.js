
"use client"
// pages/index.js
import React from 'react';
import { useState } from 'react'; 
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  XIcon,
  WhatsappIcon,
} from "react-share";

const page = () => {
  let content;

  // USER PROFILE URL 
  const [currentUser, setCurrentUser] = useState ("mapTester")
  const [userLink, setUserLink] = useState(`https://wanderlogfront.vercel.app/${currentUser}`);



  const [starsNum, setStarsNum] = useState(1)
  
 


  
  const [showStars, setShowStars] = useState(1)
  
  const handleButtonClick = () => {
    setStarsNum(starsNum + 1);
    setShowStars(starsNum)
}

  // Determine which div to show based on the value of num
  if (showStars === 1) {
    content = <div className="flex text-yellow-500"><FaStar /><CiStar /><CiStar /><CiStar /><CiStar /></div>;
  } else if (showStars === 2) {
    content = <div className="flex text-yellow-500"><FaStar /><FaStar /><CiStar /><CiStar /><CiStar /></div>;
  } else if (showStars === 3) {
    content = <div className="flex text-yellow-500"><FaStar /><FaStar /><FaStar /><CiStar /><CiStar /></div>;
  } 
  else if (showStars === 4) {
    content = <div className="flex text-yellow-500"><FaStar /><FaStar /><FaStar /><FaStar /><CiStar /></div>;
  }else if (showStars => 5) {
    content = <div className="flex text-yellow-500"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>;
  }else {
    content = <div>No Rating Given</div>;
  }

  return (
    <div>

      {/* -----------------------------STARS ------------- */}
      <button onClick={handleButtonClick}>click</button>
      {content}
      
      {/* ---------------SEARCH BAR------------------ */}
      <div className='mt-20 max-w-md mx-auto'>
            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <input
                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                    type="text"
                    id="search"
                    placeholder="Search For A User"
                />
            </div>
        </div>

      {/* --------------SHARE LINKS --------------- */}

      <h1 className="mt-20 text-sm">Your user link is {userLink}</h1>
      <EmailShareButton className="m-1" url={userLink}>
        <EmailIcon size={18} round={true}/>
      </EmailShareButton>
      <FacebookShareButton className="m-1" url={userLink}>
      <FacebookIcon size={18} round={true} />
      </FacebookShareButton>
      <TwitterShareButton className="m-1" url={userLink}>
      <XIcon size={18} round={true}/>  
      </TwitterShareButton>
      <WhatsappShareButton className="m-1" url={userLink}>
      <WhatsappIcon size={18} round={true}/>  
      </WhatsappShareButton>
      



    </div>
  );
};

export default page;
