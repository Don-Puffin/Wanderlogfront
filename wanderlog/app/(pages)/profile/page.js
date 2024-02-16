"use client"
import React, { useState, useEffect } from 'react';
import SideBar from "../../components/SideBar"
import ApiClient  from '@/utils/ApiClient';
import { useRouter } from 'next/navigation';
// import { CldUploadWidget } from 'next-cloudinary';

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
    location: "Loading location",
    image: "/userPlaceHolder.jpg"
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

  const handleSubmit = (e) => {
    e.preventDefault();
    editUserProfile(profile)
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


  return (

    
    <div className="flex flex-cols-2">
    <div className="sticky top-0 w-1/3  bg-white">
        <SideBar />
        </div>

        <div className="h-full w-screen bg-white">
        

        <div className="w-1/2 mt-10  bg-gray-100 shadow-xl rounded-lg text-gray-900">
      <div className="rounded-t-lg h-32 overflow-hidden">
      <h1 className="hidden">Profile</h1>
      </div>
      <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img className="object-cover object-center h-32" src="/userPlaceHolder.jpg" alt='profileImage' />
      </div>
      <div className="text-center mt-2">
        <h2 className="font-extralight text-base text-gray-500">{currentProfile.username}</h2>
        <p className="font-semibold"></p>
      </div>

      {isEditMode ?(
<>
                <input 
                className="mx-auto text-xl  placeholder-top min-h-6"
                placeholder='Enter location'
                name='location'
                onSubmit={handleSubmit}
                value={currentProfile.location}
              />
              <textarea
                className="min-h-20 placeholder-top "
                placeholder='Enter bio'
                name='bio'
                rows='6'
                onSubmit={handleSubmit}
                value={profile.description}
              />
</>
      ) : (
        <>
      <div className="text-xs text-center mt-5 mx-5">{currentProfile.location}</div>
     <p className={`text-xs text-center mt-5 py-2 mx-5 ${expanded ? 'expanded-bio' : 'collapsed-bio'}`}>
      {expanded ? currentProfile.bio : (currentProfile.bio ? currentProfile.bio?.substring(0, 200) + '...' : "" )}
</p>
  <p onClick={toggleExpanded} className="text-xs text-center cursor-pointer text-blue-500 mt-5 mx-5">
{ !expanded ? 'See More' : 'See Less'}
</p> 

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
        <button className="w-20 border border-grey-500 block mx-auto rounded-full bg-white hover:shadow text-sm text-gray-500 px-6 p-2">Edit</button>
        

      <button 
            type='submit'
            className={`bg-${isEditMode ? 'green' : 'cyan'}-500 text-black p-2 rounded-md shadow-lg mx-auto min-w-40`}
          >
            {isEditMode ? 'Update Profile' : 'Edit Profile'}
          </button>



        
        {/* <CldUploadWidget uploadPreset="wanderlog">
  {({ open }) => {
    return (
      <button className="w-22 border border-grey-500 block mx-auto rounded-full bg-white hover:shadow text-sm text-gray-500 px-6 p-2" onClick={() => open()}>
        Upload
      </button>
    );
  }}
</CldUploadWidget> */}
        
      </div>
    </div>
        
   
        </div>
    </div>
  );
  }
 
export default Page;
