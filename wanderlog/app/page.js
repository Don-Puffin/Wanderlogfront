// Landing page
"use client"
import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';

const page = () => {
  return (
    
    <div id="body" className=" bg-black h-full">
      <div id="blackback" className="bg-black min-h-screen">
        <div className="mx-5 md:ml-14 flex flex-col lg:flex-row md:flex-col-medium p-2">   
                 
            {/* Spinning Globe */}
            <div className="p-4 w-full xl:w-1/2 md:1/4 md:mt-6 flex mx-auto mt-2 h-auto" id="earth"></div>           
           
             {/* Text */}
            <div className="w-full lg:w-1/2 w-full-medium p-4 lg:pt-44 lg:pl-44 lg:pr-42 mt-4 lg:mt-28">            
            <img className="h-auto w-1/2 mx-auto lg:mx-0" src="/wanderlog logo3.png" alt="wanderlog logo" />
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
              <div className="lg:ml-4 mt-6 text-white lg:w-80 lg:text-lg md:text-md">Immerse yourself in a vibrant community where you can like, share, and comment on others' posts while exploring their profiles, maps, reviews. Explore our site, see the places you really want to visit and share your experiences to inspire others. </div>
              {/* Buttons */}
              <div className="lg:ml-5 flex mt-2 gap-4">
                <Link href="/login" className="border-2 border-white hover:bg-white text-white hover:text-black font-semibold mt-8 py-2 px-6 rounded">
                  Login
                </Link>
                <Link href="/register" className="border-2 border-white hover:bg-white text-white hover:text-black font-semibold mt-8 py-2 px-4 rounded">
                  Register
                </Link>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default page
