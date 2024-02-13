"use client"

//Landing page

//If already logged in, route to feed
"use client"
import React from 'react'

import { TypeAnimation } from 'react-type-animation';



const page = () => {
  return (
<body className ="bg-black h-screen">
<div >





<div className="flex md:flex-cols-2 p-2">
        
        

        {/* Spinning Globe */}
        <div className="w-1/2 flex mx-auto ml-20 mt-2 w-auto h-auto" id="earth"></div>
     
     
        {/* Text */}
        <div className="w-1/2 pt-44 pl-44 pr-42 mt-28 ">
        {/* <img className="h-auto w-auto" src= "/landingfront.png" alt="image description"/> */}
        

        <img className=" h-auto w-1/2" src= "/wanderlog logo3.png" alt="wanderlog logo"/>
        <div>
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
        <div className=" mt-6 text-white w-80 lg:text-md md:text-sm  ">Immerse yourself in a vibrant community where you can like, share, and comment on others' posts while exploring their profiles, maps, reviews. Explore our site, see the places you really want to visit and share your experiences to inspire others. </div>
        {/* Buttons */}
        <div className=" flex mt-2 gap-4">
        <button href="/login" className="border-2 border-white hover:bg-white text-white hover:text-black font-semibold  mt-8 py-2 px-6 rounded">
            Login
        </button>
        <button href="/register" className="border-2 border-white hover:bg-white text-white hover:text-black font-semibold  mt-8 py-2 px-4 rounded">
          Register
        </button>
        </div>
        </div>
        

        </div>
      </div>
        </body>    
  )
}

export default page