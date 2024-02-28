"use client";
import React from 'react'
import SideBar from "../../components/Sidebar"
import NavBar from '../../components/Navbar';
import ApiClient  from '../../../utils/ApiClient';
import { useRouter } from 'next/navigation';
import TopRatedMap from '../../components/TopRatedMap';
import { useState, useEffect } from "react";
import ProfileGoogleMap from '../../components/ProfileGoogleMap';

const page = () => {
  const router = useRouter();

  const client = new ApiClient(
    () => token,
    () => logout()
  );

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [hideMapInComponentTree, setHideMapInComponentTree] = useState(false);

  

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
  
  useEffect(() => {
    authUser();
    // just changed this - Alfie
    // if (isAuthenticated) refreshList();
  }, []);
  
  if (!isAuthenticated) {
    return <div className="text-black mx-auto p-10">Authenticating...</div>;
  }

  return (
    <div className="flex flex-cols-2">
            {hideMapInComponentTree &&
              <div
              className=" bg-gray-500 blur-2xl fixed top-0 left-0 right-0 bottom-0"
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
  <SideBar triggerVisibilityChangeInParent={(visibility) => setHideMapInComponentTree(visibility)}/>
  </div>   
  <div className="h-11/12 w-11/12  mx-auto">
              {
        hideMapInComponentTree && <img className="w-full h-full object-cover object-center" src="/placeholdermap.png" alt="post image" />
      }
      {
          // just changed this - Alfie
            <TopRatedMap lat={0} lng={0} hideMap={hideMapInComponentTree}></TopRatedMap>
          // currentProfile?.lat && currentProfile?.lng && <ProfileGoogleMap lat={currentProfile.lat} lng={currentProfile.lng}/>

        
      }     
   
    </div>
    </div>
  )
}

export default page