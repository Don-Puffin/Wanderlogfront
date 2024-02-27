'use client'

import React from 'react';
import Post from "../../components/Post";
import SideBar from "../../components/Sidebar";
import ApiClient from '../../../utils/ApiClient';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import CreatePost from "../../components/CreatePost";
import NavBar from "../../components/Navbar";



const Page = () => {
  const router = useRouter();

  const client = new ApiClient(
    () => token,
    () => logout()
  );

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hideMapInComponentTree, setHideMapInComponentTree] = useState(false);
  
  const refreshList = () => {
    console.log("refreshing");
    client.getAllPosts()
      .then(response => {
        console.log(response);
        setPosts(response.posts);
        setLoading(false); // Set loading to false after fetching posts
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
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

  useEffect(() => {
    authUser();
    refreshList();
  }, []);

  if (!isAuthenticated) {
    return <div className="text-black mx-auto p-10">Authenticating...</div>;
  }

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


  <div className="md:hidden sticky top-0 z-50" id="navbar">
  <NavBar triggerVisibilityChangeInParent={(visibility) => setHideMapInComponentTree(visibility)} />
  {hideMapInComponentTree &&
    <div
      className="bg-gray-500 fixed top-0 left-0 right-0 bottom-0"
      style={{
        opacity: "0.5",
      }}
    ></div>
  
      }
    </div>

    
    <div className="hidden md:block sticky top-0 w-1/3  bg-white">
        <SideBar triggerVisibilityChangeInParent={(visibility) => setHideMapInComponentTree(visibility)
}/>
        
        </div>
      <div>
      {/* <CreatePost /> */}
      </div>
      {loading && <div className="text-black mx-auto p-10">Wanderlog is loading...</div>}

      {!loading && posts?.length === 0  && (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
          <div>
            <h1 className="mx-auto text-2xl font-bold">Feed</h1>
            <p className="mt-10 text-grey-300 justify-center">There are no posts...</p>
            <div className='flex justify-center items-center'></div>
          </div>
        </div>
      )}

      {posts.length > 0 && (
        <div className="ml-10 grid grid-cols-3 gap-10 h-full w-screen bg-white">
          {posts.map((post) => (
            <Post key={post.id} idValue={post.id} zIndex={1}  name={post.username} location={post.postLocation} lat={post.lat} lng={post.lng} info={post.postText} rating={post.rating} isOwned={post.isOwned} hideGoogleMap={hideMapInComponentTree}/>
          ))}
        </div>
      )}
    
    </div>
  );
  
};

export default Page;
