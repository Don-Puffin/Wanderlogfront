"use client"
import React from 'react';
// import share from "./share.png";


// console.log(share)
const Card = (props) => {
  return (
    <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
      <div className="rounded-t-lg h-32 overflow-hidden">
        <img className="object-cover object-top w-full" src='https://www.researchgate.net/publication/362488268/figure/fig1/AS:11431281079780306@1660873730064/Map-of-Ardeche-within-France-Image-source-Google-Maps-2021.png' alt='Mountain' />
      </div>
      <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img className="object-cover object-center h-32" src='https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg' alt='Woman looking front' />
      </div>
      <div className="text-center mt-2">
        <h2 className="font-extralight text-base text-gray-500">{props.name}</h2>
        <p className="font-semibold">{props.location}</p>
      </div>
      <div className="text-xs text-center mt-5 mx-5">{props.info}</div>
      <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
        <li className="flex flex-col items-center justify-around">
          
          {/* <div>Likes</div> */}
        </li>
        <li className="flex flex-col items-center justify-between">
          {/* <div>comments</div> */}
        </li>
        <li className="flex flex-col items-center justify-around">
        {/* <div>Location</div> */}
        </li>
      </ul>
      <div className="p-4 border-t mx-8 mt-2">
        <button className="w-1/3 border border-grey-500 block mx-auto rounded-full bg-white hover:shadow text-sm text-gray-500 px-6 p-2">More</button>
      </div>
    </div>
  )
}

export default Card