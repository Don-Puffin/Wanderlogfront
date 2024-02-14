"use client"

//Landing page

//If already logged in, route to feed
"use client"
import React from 'react'

import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';


const page = () => {
  return (
<body className ="bg-black h-screen">
<div >





<div className="ml-14 flex md:flex-cols-2 p-2">
        
        

        {/* Spinning Globe */}
        <div className="w-1/2 flex mx-auto ml-20 mt-2  h-auto" id="earth"></div>
     
     
        {/* Text */}
        <div className="w-1/2 pt-44 pl-44 pr-42 mt-28 ">
        {/* <img className="h-auto w-auto" src= "/landingfront.png" alt="image description"/> */}
        

        <img className="h-auto w-1/2" src= "/wanderlog logo3.png" alt="wanderlog logo"/>
        <div className="ml-3">
  <span style={{ fontSize: '1.2em', color: 'white' }}>S</span>
  <span>
    <TypeAnimation
      sequence={[
        "hare your journey anytime, anywhere. ",
        1000,
      ]}
      speed={10}
      repeat={Infinity}
      style={{ fontSize: '1.2em', color: 'white', position: 'relative' }}
    />
  </span>
        </div>
        <div className="ml-4 mt-6 text-white w-80 lg:text-lg md:text-md  ">Immerse yourself in a vibrant community where you can like, share, and comment on others' posts while exploring their profiles, maps, reviews. Explore our site, see the places you really want to visit and share your experiences to inspire others. </div>
        {/* Buttons */}
        <div className="ml-5 flex mt-2 gap-4">
        <Link href="/login" className="border-2 border-white hover:bg-white text-white hover:text-black font-semibold  mt-8 py-2 px-6 rounded">
            Login
        </Link>
        <Link href="/register" className="border-2 border-white hover:bg-white text-white hover:text-black font-semibold  mt-8 py-2 px-4 rounded">
          Register
        </Link>
        </div>
        </div>
        

        </div>
      </div>
        </body>    
  )
 

}

export default page