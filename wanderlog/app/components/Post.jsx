"use client"
import React, { useState, useEffect } from 'react';
import ApiClient from '../../utils/ApiClient';
import PostGoogleMap from './postGoogleMap.jsx';
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