"use client"
import React, { useState, useEffect } from 'react';
import ApiClient from '../../utils/ApiClient';
import PostGoogleMap from './postGoogleMap.jsx';
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
// import share from "./share.png";



// console.log(share)
const Post = (props) => {

  const [showPhoto, setShowPhoto] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const toggleShowPhoto = ()=>{

        setShowPhoto(!showPhoto)
  };
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
  
  const deletePost = () => {
    client.deletePost(props.idValue)
    .then(response => {
      console.log(response)
      window.location.reload();
    })
    .catch(error => {
      console.error(error)
    })
  }

  const openEdit = () => {
    setEditMode(!editMode)
  }

  const updateRating = (event) => {
    event.preventDefault();
    console.log(event.target.value)
    client.updatePost(props.idValue, event.target.rating.value);
    setEditMode(!editMode)
    window.location.reload();
  }


  // Determine which div to show based on the value of num
  if (stars === 1) {
    content = <div className="flex w-full justify-center text-yellow-500"><FaStar /><CiStar /><CiStar /><CiStar /><CiStar /></div>;
  } else if (stars === 2) {
    content = <div className="flex w-full justify-center text-yellow-500"><FaStar /><FaStar /><CiStar /><CiStar /><CiStar /></div>;
  } else if (stars === 3) {
    content = <div className="flex w-full justify-center text-yellow-500"><FaStar /><FaStar /><FaStar /><CiStar /><CiStar /></div>;
  } 
  else if (stars === 4) {
    content = <div className="flex w-full justify-center text-yellow-500"><FaStar /><FaStar /><FaStar /><FaStar /><CiStar /></div>;
  } else if (stars >= 5) {
    content = <div className="flex w-full justify-center text-yellow-500"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>;
  }else {
    content = <div>No Rating Given</div>;

  }


  return (
    <div  className="w-10/12 sm:w-11/12 mt-10 bg-white shadow-xl rounded-lg text-gray-900">
      <div className="rounded-t-lg h-36 overflow-hidden">
      {
        props.hideGoogleMap && <img className="w-full h-36 object-cover object-center" src="feedplaceholdermap.png" alt="post image" />
      }
      <PostGoogleMap  postLocation = {props.postLocation} lat={props.lat} lng={props.lng} rating={props.rating}
        hideMap={props.hideGoogleMap}
      />
      {/* <PostGoogleMap  {lat=0, lng=0} /> */}
      </div>
      <div className="mt-2 justify-left w-16 h-16 ml-2 border-4 border-black rounded-full overflow-hidden">
        <img className=" object-cover object-center h-16" src={props.profilePic} alt='profile picture' />
      </div>
      <div className="text-center mt-2 items-center">
        <h2 className="font-extralight text-base text-gray-500"><a href={`https://wanderlogfront.vercel.app/${props.name}`}>{props.name}</a></h2>
        <p className="font-semibold">{props.location}</p>
        <div className="mx-auto mt-2 ">{content}</div>
        {owned ? (
        <div  className="flex flex-row items-center gap-4 mr-2 justify-center">
                {editMode ? (
          <form onSubmit={updateRating} className="flex flex-col items-center">
              <label className="text-center text-sm text-gray-400 flex flex-col justify-center items-center p-2">
                Update rating:
                {/* <input type="number" name="rating" className="border-gray-200 border-1 rounded-lg w-10 p-2 mt-2"/> */}
                <select type="number" name="rating" className="border-gray-200 border-1 rounded-lg w-1/2 p-2 mt-2">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>

              </label>
            {/* <h1>Edit Mode</h1> */}
            <button type='submit' className="w-1/3 block mx-auto rounded-full bg-white hover:shadow text-sm text-slate-400 p-2">Save</button>
          </form>
        ) : (
          <div>
        <button className="w-full my-1 block mx-auto rounded-full bg-white hover:shadow text-sm text-slate-400 p-2" onClick={openEdit}>Edit</button>
          </div>
        )}
        <button className="max-auto text-slate-400" onClick={deletePost}><FaRegTrashAlt /></button>
        </div>
       
      ) : (
        null
      )}
      
        
      </div>
      <div className="text-xs text-center mt-5 mx-auto max-w-56 ">{props.info}</div>
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
      <button className="w-full border border-grey-500 block mx-auto rounded-full bg-white hover:shadow text-sm text-gray-500  p-2" onClick={toggleShowPhoto}>Photo</button>
      </div>
      {/* button renders conditionally depending on if owner */}
      {showPhoto? (
      <img className="w-10/12 mx-auto m-8 rounded-xl drop-shadow-xl" src={props.imageURL} alt='travel_photo' />
      ): (null)}
      
      
    </div>
  )
}

export default Post