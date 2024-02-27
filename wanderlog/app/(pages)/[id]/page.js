"use client"
import React, { useState, useEffect } from 'react';
import SideBar from "../../components/Sidebar"
import ApiClient  from '../../../utils/ApiClient';
import { useRouter } from 'next/navigation';
import ProfileGoogleMap from '../../components/ProfileGoogleMap';
import { CldUploadWidget } from 'next-cloudinary';

import axios from 'axios';
const Page = ({ params }) => {

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
    imageURL: "/userPlaceHolder.jpg",
    lat: 34.672314,
    lng: 135.484802,
  });
  const isEditMode = false;
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
    client.getOtherProfile(params.id)
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

  if (!isAuthenticated) {
    return <div className="text-black mx-auto p-10">Authenticating...</div>;
  }


  return (

    
    <div className="flex flex-cols-2">
    <div className="sticky top-0 w-1/3  bg-white">
    <SideBar/>
        
        </div>

        <div className="h-full w-screen bg-white">
        

        <div className="w-1/2 mt-10  bg-gray-100 shadow-xl rounded-lg text-gray-900">
      <div className="rounded-t-lg h-80 overflow-hidden">
      <h1 className="hidden">Profile</h1>
      {/* <div><h1 className="pt-20 text-center text-3xl">User : {params.id}</h1></div> */}
    
      <ProfileGoogleMap lat={currentProfile.lat} lng={currentProfile.lng} id={params.id}/>
      </div>
      <div className="mx-auto w-32 h-32 relative left-0 mt-16 border-4 border-green-300 rounded-full overflow-hidden">
        <img className="object-cover object-center h-32" src={currentProfile.imageURL} />
      </div>
      
      
      <div className="text-center  mt-2">
        <h2 className="font-extralight text-base text-gray-500">{currentProfile.username}</h2>
        <p className="font-semibold"></p>
      </div>
      <div>

        <>
      <div className="text-xs text-center mt-5 mx-5">{currentProfile.userLocation}</div>
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
      
      </>
      </div>
  {/* { isEditMode ? (<form>
    <h1>Edit profile</h1>

  </form>) : (
    null) } */}

      <div className="flex p-4 border-t mx-8 mt-2">
     



        

      
      </div>
    </div>
        
   
        </div>
    </div>)
}
 
export default Page;

    

