"use client"
import React, { useState, useEffect } from 'react';
import SideBar from "../../components/Sidebar.jsx"
import ApiClient  from '../../../utils/ApiClient';
import { useRouter } from 'next/navigation';
import ProfileGoogleMap from '../../components/ProfileGoogleMap';
import { CldUploadWidget } from 'next-cloudinary';
import toast, {Toaster} from "react-hot-toast";

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

import axios from 'axios';

import NavBar from "../../components/Navbar";



const Page = () => {

  

const router = useRouter();

  const client = new ApiClient(
    () => token,
    () => logout()
  );

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [currentProfile, setCurrentProfile] = useState({
    username: "Loading Username",
    bio: "Loading bio",
    userLocation: "Loading location",
    imageURL: "/userPlaceHolder.jpg",
    lat: 34.672314,
    lng: 135.484802,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [edited, setEdited] = useState(currentProfile);
  const [expanded, setExpanded] = useState(false);
  const [hideMapInComponentTree, setHideMapInComponentTree] = useState(false);

  const notify = (text) => toast(text);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const authUser = () => {
    client.authUser()
      .then(response => {
        if (response.status === 200) {
          setIsAuthenticated(true);
          refreshList();
        } else {
          router.push('/');
        }
      })
      .catch(error => {
        console.error('Error authenticating user:', error);
        router.push('/');
      });
  };

  const refreshList = () => {
    console.log("refreshing");
    client.getUserProfile()
      .then(response => {
        console.log(response);
        setCurrentProfile(response.profile);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  };

  useEffect(() => {
    authUser();
    // just changed this - Alfie
    // if (isAuthenticated) refreshList();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    client.editUserProfile(currentProfile.imageURL, currentProfile.bio, currentProfile.userLocation)
      .then(response => {
        console.log('Profile updated successfully:', response.data);
        notify(response.message);
        setIsEditMode(!isEditMode);
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        notify(response.message);
      });
  };

  if (!isAuthenticated) {
    return <div className="text-black mx-auto p-10">Authenticating...</div>;
  }

  // const [currentUser, setCurrentUser] = useState (mapUser)
  // const [userLink, setUserLink] = useState(`https://wanderlogfront.vercel.app/${currentUser}`);
  return (
    <div className="flex flex-col md:flex-row  ">
    

      {hideMapInComponentTree &&
              <div
              className=" bg-gray-500 fixed top-0 left-0 right-0 bottom-0"
              style={{
                opacity: "0.5",
                
              }}
              id= "gray-overlay"
            ></div>
      }


  <div className="md:hidden sticky w-full top-0 z-50" id="navbar">
  <NavBar triggerVisibilityChangeInParent={(visibility) => setHideMapInComponentTree(visibility)} />
  
  
    
    </div>


    <div className="hidden md:block sticky top-0 w-1/4 bg-white">
        <SideBar triggerVisibilityChangeInParent={(visibility) => setHideMapInComponentTree(visibility)
}/>
        
        </div>
      <div>
        </div>

        <div className="h-full w-screen bg-white">
        

        <div className="w-11/12 md:w-3/4 mt-10 mx-auto bg-gray-100 shadow-xl rounded-lg text-gray-900">
      <div className="rounded-t-lg h-80 overflow-hidden">
      <h1 className="hidden">Profile</h1>
      {
        hideMapInComponentTree && <img className="w-full h-36 object-cover object-center" src={`https://a.ccdn.es/cnet/contents/media/own/2022/6/1299003.jpg/900x505cut/`} alt="post image" />
      }
      {
        loading ? (
          <div>Loading map...</div>
        ) : (
          // just changed this - Alfie
          <ProfileGoogleMap lat={currentProfile.lat} lng={currentProfile.lng} hideMap={hideMapInComponentTree}/>
          // currentProfile?.lat && currentProfile?.lng && <ProfileGoogleMap lat={currentProfile.lat} lng={currentProfile.lng}/>

        )
      }
      </div>
      <div className="mx-auto w-32 h-32 left-0 mt-16 border-4 drop-shadow-lg border-white rounded-full overflow-hidden">
        <img className="object-cover object-center h-32" src={currentProfile.imageURL} />
      </div>
      
      <CldUploadWidget 
      onSuccess={(results, error) => {    
        if (error) {
          console.log(error);
          notify("Error updating profile picture. Please try again later.")
        }
        client.editUserProfile(results.info.url)
        .then(response => {
          console.log("Profile picture updated successfully!", response.data)
          notify('Profile picture updated successfully!');})
        .catch(error => {
          console.error("Error updating profile picture.", error)
          notify("Error updating profile picture. Please try again later.")
        })
        refreshList();
      }}
      uploadPreset="wanderlog" >
  {({ open }) => {
    return (
      <button className="w-22 border border-grey-500 block mx-auto mt-3 rounded-full bg-white hover:shadow text-sm text-gray-500 px-6 p-2" onClick={() => open()}>
        Upload
      </button>
    );
  }}
</CldUploadWidget>
      <div className="text-center mt-6">
        <h2 className="text-xl text-gray-500">{currentProfile.username}</h2>
        <p className="font-semibold"></p>
      </div>
      <div>
    

      {isEditMode ?(
<>
<form className="flex flex-col items-center justify-between" onSubmit={handleSubmit}>
<input
  type="text"
  id="textBox"
  className="mx-auto placeholder-top min-h-6 m-5"
  placeholder="Enter location"
  name="userLocation"
  value={currentProfile.userLocation}
  onChange={handleChange} 
/>
              <textarea
                className="min-h-20 min-w-96 placeholder-top "
                placeholder='Enter bio'
                name='bio'
                rows='6'
                value={currentProfile.bio}
                onChange={handleChange}
              />
              </form>
</>
      ) : (
        <>
      <div className="text-lg text-center mt-5 mx-5">{currentProfile.userLocation}</div>
     <p className={`text-base text-center mt-5 py-2 mx-5 ${expanded ? 'expanded-bio' : 'collapsed-bio'}`}>
      {expanded ? currentProfile.bio : (currentProfile.bio ? currentProfile.bio?.substring(0, 200) + '...' : "" )}
</p>
  <p onClick={toggleExpanded} className="text-xs text-center cursor-pointer text-gray-500 mt-5 mx-5">
{ !expanded ? 'See More' : 'See Less'}
</p> 
<p className="mt-6 mb-3 text-center text-sm"><a href={`https://wanderlogfront.vercel.app/${currentProfile.username}`}>URL: https://wanderlogfront.vercel.app/{currentProfile.username}</a></p>

<div className="text-center mt-2">
<EmailShareButton subject="Wanderlog" body="I wanted to share some exciting news with you—I've recently signed up for a fantastic new travel-sharing service called Wanderlog. It's a platform where you can document your travels, share recommendations, and connect with fellow adventurers.

I thought you might be interested in joining me on Wanderlog! It would be a great way for us to stay connected and share our travel experiences with each other. Plus, I know you always have fantastic recommendations for places to visit and things to do." className="ml-1" url={`https://wanderlogfront.vercel.app/${currentProfile.username}`}>
        <EmailIcon size={24} round={true}/>
      </EmailShareButton>
      <FacebookShareButton className="ml-1" subject="Wanderlog" body="I wanted to share some exciting news with you—I've recently signed up for a fantastic new travel-sharing service called Wanderlog. It's a platform where you can document your travels, share recommendations, and connect with fellow adventurers.

I thought you might be interested in joining me on Wanderlog! It would be a great way for us to stay connected and share our travel experiences with each other. Plus, I know you always have fantastic recommendations for places to visit and things to do." url={`https://wanderlogfront.vercel.app/${currentProfile.username}`}>
      <FacebookIcon size={24} round={true} />
      </FacebookShareButton>
      <TwitterShareButton className="ml-1"  body="I wanted to share some exciting news with you—I've recently signed up for a fantastic new travel-sharing service called Wanderlog. It's a platform where you can document your travels, share recommendations, and connect with fellow adventurers.

I thought you might be interested in joining me on Wanderlog! It would be a great way for us to stay connected and share our travel experiences with each other. Plus, I know you always have fantastic recommendations for places to visit and things to do." url={`https://wanderlogfront.vercel.app/${currentProfile.username}`}>
      <XIcon size={24} round={true}/>  
      </TwitterShareButton>
      <WhatsappShareButton className="ml-1"  body="I wanted to share some exciting news with you—I've recently signed up for a fantastic new travel-sharing service called Wanderlog. It's a platform where you can document your travels, share recommendations, and connect with fellow adventurers.

I thought you might be interested in joining me on Wanderlog! It would be a great way for us to stay connected and share our travel experiences with each other. Plus, I know you always have fantastic recommendations for places to visit and things to do." url={`https://wanderlogfront.vercel.app/${currentProfile.username}`}>
      <WhatsappIcon size={24} round={true}/>  
      </WhatsappShareButton>
      </div>

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
      </>)}
  
  {/* { isEditMode ? (<form>
    <h1>Edit profile</h1>

  </form>) : (
    null) } */}

      <div className="flex p-4 border-t mx-8 mt-2">
      {isEditMode ? (
          <div>
            {/* <h1>Edit Mode</h1> */}
            <button onSubmit={handleSubmit}  type='submit' className="w-20 border border-grey-500 block mx-auto rounded-full bg-white hover:shadow text-sm text-gray-500 px-6 p-2" onClick={handleSubmit}>Save</button>
          </div>
        ) : (
          <div>
            <button onSubmit={handleSubmit}  type='submit'className="w-20 border border-grey-500 block mx-auto rounded-full bg-white hover:shadow text-sm text-gray-500 px-6 p-2" onClick={() => setIsEditMode(true)}>Edit</button>
          </div>
        )}
      </div>
        {/* <button className="w-20 border border-grey-500 block mx-auto rounded-full bg-white hover:shadow text-sm text-gray-500 px-6 p-2">Edit</button>
        

      <button 
            type='submit'
            className={`bg-${isEditMode ? 'green' : 'cyan'}-500 text-black p-2 rounded-md shadow-lg mx-auto min-w-40`}
          >
            {isEditMode ? 'Update Profile' : 'Edit Profile'}
          </button> */}



        

      
      </div>
    </div>
        
   
        </div>
        <Toaster position="bottom-right"/>

    </div>
  );
  }
 
export default Page;
