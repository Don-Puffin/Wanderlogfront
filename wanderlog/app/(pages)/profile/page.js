"use client"
import React, { useState, useEffect } from 'react';
import SideBar from "../../components/SideBar"
import ApiClient  from '../../../utils/ApiClient';
import { useRouter } from 'next/navigation';
import ProfileGoogleMap from '../../../app/components/ProfileGoogleMap';
import { CldUploadWidget } from 'next-cloudinary';
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
  

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const authUser = () => {
    client.authUser()
      .then(response => {
        if (response.status === 200) {
          setIsAuthenticated(true);
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
    refreshList();
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
    client.editUserProfile(profile)
      .then(response => {
        console.log('Profile updated successfully:', response.data);
        setIsEditMode(!isEditMode);
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
  };

  if (!isAuthenticated) {
    return <div className="text-black mx-auto p-10">Authenticating...</div>;
  }

  // const [currentUser, setCurrentUser] = useState (mapUser)
  // const [userLink, setUserLink] = useState(`https://wanderlogfront.vercel.app/${currentUser}`);
  return (

    
    <div className="flex flex-cols-2">
    <div className="sticky top-0 w-1/3  bg-white">
        <SideBar />
        
        </div>

        <div className="h-full w-screen bg-white">
        

        <div className="w-1/2 mt-10  bg-gray-100 shadow-xl rounded-lg text-gray-900">
      <div className="rounded-t-lg h-80 overflow-hidden">
      <h1 className="hidden">Profile</h1>
      <ProfileGoogleMap lat={currentProfile.lat} lng={currentProfile.lng}/>
      </div>
      <div className="mx-auto w-32 h-32 relative left-0 mt-16 border-4 border-green-300 rounded-full overflow-hidden">
        <img className="object-cover object-center h-32" src={currentProfile.imageURL} />
      </div>
      
      <CldUploadWidget 
      onSuccess={(results, error) => {    
        if (error) {
          console.log(error);
        }
        console.log(results.event);
        console.log('URL:', results.info.url);
        console.log(currentProfile.imageURL)
        refreshList();
        client.editUserProfile(results.info.url)
        .then(response => {
          console.log('Profile picture updated successfully:', response.data);})
        .catch(error => {
          console.error("Error updating profile picture", error)
        })
        refreshList();
      }}
      uploadPreset="wanderlog" >
  {({ open }) => {
    return (
      <button className="w-22 border border-grey-500 block mx-auto rounded-full bg-white hover:shadow text-sm text-gray-500 px-6 p-2" onClick={() => open()}>
        Upload
      </button>
    );
  }}
</CldUploadWidget>
      <div className="text-center  mt-2">
        <h2 className="font-extralight text-base text-gray-500">{currentProfile.username}</h2>
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
  name="location"
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
      <div className="text-xs text-center mt-5 mx-5">{currentProfile.userLocation}</div>
     <p className={`text-xs text-center mt-5 py-2 mx-5 ${expanded ? 'expanded-bio' : 'collapsed-bio'}`}>
      {expanded ? currentProfile.bio : (currentProfile.bio ? currentProfile.bio?.substring(0, 200) + '...' : "" )}
</p>
  <p onClick={toggleExpanded} className="text-xs text-center cursor-pointer text-blue-500 mt-5 mx-5">
{ !expanded ? 'See More' : 'See Less'}
</p> 
<p className="mt-6 text-center text-sm">Your URL - https://wanderlogfront.vercel.app/{currentProfile.username}</p>

<div className="text-center mt-2">
<EmailShareButton className="ml-1" url={currentProfile.username}>
        <EmailIcon size={18} round={true}/>
      </EmailShareButton>
      <FacebookShareButton className="ml-1" url={currentProfile.username}>
      <FacebookIcon size={18} round={true} />
      </FacebookShareButton>
      <TwitterShareButton className="ml-1" url={currentProfile.username}>
      <XIcon size={18} round={true}/>  
      </TwitterShareButton>
      <WhatsappShareButton className="ml-1" url={currentProfile.username}>
      <WhatsappIcon size={18} round={true}/>  
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
            <button onSubmit={handleSubmit}  type='submit' className="w-20 border border-grey-500 block mx-auto rounded-full bg-white hover:shadow text-sm text-gray-500 px-6 p-2" onClick={() => setIsEditMode(false)}>Save</button>
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
    </div>
  );
  }
 
export default Page;
