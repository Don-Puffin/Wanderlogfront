"use client"
import React, { useState, useEffect } from 'react';
import ApiClient from '../../utils/ApiClient';
import PostGoogleMap from './postGoogleMap.jsx';
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
// import share from "./share.png";



// console.log(share)
const Post = (props) => {
  // different buttons for owner and non-owner
  const client = new ApiClient();
  // const [owned, setOwned] = useState()
  // const checkUser = () => {
  //   client.authUser().then(response => {
  //     if (response.currentUser === props.name) {
  //       console.log(response.currentUser);
  //       console.log(props.name); 
  //       setOwned(true)
  //     } else {
  //       setOwned(false)
  //     }
  //   }).catch(error => {
  //     console.error("there was an error", error)
  //   })
  // }

  const owned = props.isOwned;

  let content;

  const stars = (props.rating)
  
  
    // setShowStars(props.rating)
  
  
  
  
 

  // Determine which div to show based on the value of num
  if (stars === 1) {
    content = <div className="flex text-yellow-500"><FaStar /><CiStar /><CiStar /><CiStar /><CiStar /></div>;
  } else if (stars === 2) {
    content = <div className="flex text-yellow-500"><FaStar /><FaStar /><CiStar /><CiStar /><CiStar /></div>;
  } else if (stars === 3) {
    content = <div className="flex text-yellow-500"><FaStar /><FaStar /><FaStar /><CiStar /><CiStar /></div>;
  } 
  else if (stars === 4) {
    content = <div className="flex text-yellow-500"><FaStar /><FaStar /><FaStar /><FaStar /><CiStar /></div>;
  }else if (stars => 5) {
    content = <div className="flex text-yellow-500"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>;
  }else {
    content = <div>No Rating Given</div>;

  }


  return (
    <div  className="w-72 mt-10 bg-white shadow-xl rounded-lg text-gray-900 ">
      <div className="rounded-t-lg h-36 overflow-hidden">
      {
        props.hideGoogleMap && <img className="w-full h-36 object-cover object-center" src={`https://a.ccdn.es/cnet/contents/media/own/2022/6/1299003.jpg/900x505cut/`} alt="post image" />
      }
      <PostGoogleMap  postLocation = {props.postLocation} lat={props.lat} lng={props.lng} rating={props.rating}
        hideMap={props.hideGoogleMap}
      />
      {/* <PostGoogleMap  {lat=0, lng=0} /> */}
      </div>
      <div className="mt-2 justify-left w-16 h-16 ml-2 border-4 border-black rounded-full overflow-hidden">
        <img  className=" object-cover object-center h-16" src ='vercel.svg' alt='Woman looking front' />
      </div>
      <div className="text-center mt-2 items-center">
        <h2 className="font-extralight text-base text-gray-500">{props.name}</h2>
        <p className="font-semibold">{props.location}</p>
        <p className="ml-28 mt-2 ">{content}</p>
        
      </div>
      <div className="text-xs text-center mt-5 mx-5">{props.info}</div>
      <div></div>
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
      {/* button renders conditionally depending on if owner */}
      {owned ? (
        <button>Edit</button>
      ) : (
        null
      )}
    </div>
  )
}

export default Post