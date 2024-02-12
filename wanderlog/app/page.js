//Landing page

//If already logged in, route to feed

import React from 'react'

import ReactTyped from "react-typed";



const page = () => {
  return (
<body className ="bg-black h-screen">
<div >





<div className="flex md:flex-cols-2 p-2">
        
        

        {/* Spinning Globe */}
        <div className="w-1/2 flex mx-auto ml-20 mt-10 w-auto h-auto" id="earth"></div>
     
     
        {/* Text */}
        <div className="w-1/2 pt-44 pl-44 pr-42 ">
        {/* <img className="h-auto w-auto" src= "/landingfront.png" alt="image description"/> */}
        <img className="h-auto w-1/2 mr-6" src= "/wanderlog logo.png" alt="image description"/>

        <div className="flex lg:text-7xl md:text-6xl sm:text-3xl text-white mx-auto text-center font-semibold pb-2 mt-8">WanderLog</div>
       
        <ReactTyped
          strings={["Share your journey anytime, anywhere."]}
          typeSpeed={100}
          loop
          backSpeed={20}
          cursorChar=">"
          showCursor={true}
        />
        
        <div className=" mt-2 text-white w-80 lg:text-md md:text-sm  ">Immerse yourself in a vibrant community where you can like, share, and comment on others' posts while exploring their profiles, maps, reviews. Explore our site, see the places you really want to visit and share your experiences to inspire others. </div>
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