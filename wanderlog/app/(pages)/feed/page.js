'use client';
import React from 'react'
import Post from "../../components/Post"
import SideBar from "../../components/SideBar"
import ApiClient from '@/utils/ApiClient'
import { useState, useEffect } from "react"

const page = () => {
  const client = new ApiClient(
    () => token,
    () => logout()
  );
  
  const [posts, setPosts] = useState([])
  
  const refreshList = () => {
    console.log("refreshing")
    client.getAllPosts().then(response => {
      console.log(response)
      setPosts(response.posts)
    })
  }

  useEffect(() => {
    refreshList();
  }, []);

  return (
    <div className="flex flex-cols-2">
    <div className="sticky top-0 w-1/3  bg-white">
        <SideBar />
        </div>

        <div className="grid grid-cols-3 gap-10  h-full w-screen bg-white">
        
        {posts.map((post) => (
          <Post name={post.username} location={post.postLocation} info={post.postText}/>
        )
        )}
        {/* <Post name="Username" location="Paris - France" info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed eleifend ipsum, sed placerat quam."/>
        <Post name="Username" location="Paris - France" info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed eleifend ipsum, sed placerat quam."/>
        <Post name="Username" location="Paris - France" info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed eleifend ipsum, sed placerat quam."/>
        <Post name="Username" location="Paris - France" info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed eleifend ipsum, sed placerat quam."/> 
        <Post name="Username" location="Paris - France" info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed eleifend ipsum, sed placerat quam."/>
        <Post name="Username" location="Paris - France" info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed eleifend ipsum, sed placerat quam."/>
        <Post name="Username" location="Paris - France" info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed eleifend ipsum, sed placerat quam."/>
    */}
        </div>
    </div>
  )
}

export default page