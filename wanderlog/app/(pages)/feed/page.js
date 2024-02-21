'use client'

import React from 'react';
import Post from "../../components/Post";
import SideBar from "../../components/SideBar";
import ApiClient from '@/utils/ApiClient';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import CreatePost from "../../components/CreatePost";



const Page = () => {
  const router = useRouter();

  const client = new ApiClient(
    () => token,
    () => logout()
  );

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
    <div className="flex flex-cols-2">
      <div className="sticky top-0 w-1/3 bg-white">
        <SideBar />
      </div>

      {loading && <div className="text-black mx-auto p-10">Wanderlog is loading...</div>}

      {!loading &&!posts.length && (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
          <div>
            <h1 className="mx-auto text-2xl font-bold">Feed</h1>
            <p className="mt-10 text-grey-300 justify-center">There are no posts...</p>
            <div className='flex justify-center items-center'></div>
          </div>
        </div>
      )}

      {posts.length > 0 && (
        <div className="grid grid-cols-3 gap-10 h-full w-screen bg-white">
          {posts.map((post) => (
            <Post key={post._id} name={post.username} location={post.postLocation} lat={post.lat} lng={post.lng} info={post.postText} />
          ))}
        </div>
      )}
      <div>
      <CreatePost />
      </div>
    </div>
  );
  
};

export default Page;
