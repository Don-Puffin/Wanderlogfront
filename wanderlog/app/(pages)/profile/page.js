import React from 'react'
import Post from "../../components/Post"
import SideBar from "../../components/SideBar"

const page = () => {
  return (
    
    <div className="flex flex-cols-2">
    <div className="sticky top-0 w-1/3  bg-white">
        <SideBar />
        </div>

        <div className="grid grid-cols-3 gap-10  h-full w-screen bg-white">
        
   
        </div>
    </div>
  )
}

export default page