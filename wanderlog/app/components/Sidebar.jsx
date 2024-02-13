"use client"
import React from 'react';
import { CgProfile } from "react-icons/cg";
import { IoMdAddCircleOutline } from "react-icons/io";
import { GrMapLocation } from "react-icons/gr";
import { MdOutlinePhotoCameraBack } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { GiPowerButton } from "react-icons/gi";

const SideBar = () => {
  return (
    <div className="sticky  top-0 w-4/6 bg-gray-100  ml-0 shadow-xl rounded-lg text-gray-900">
<div className =" flex flex-col  ">
<img className="h-auto w-3/4 ml-4 mt-4 p-2 transition-transform hover:scale-110" src= "wanderloglogobw.png" alt="wanderlog logo"/>
    <div className="mt-4 flex text-lg text-black p-4 rounded-xl hover:bg-gray-200">
<CgProfile size={40} className="transition-transform hover:scale-110" 
    style={{ transitionDuration: '300ms' }}/> <div className="m-2 my-auto">Profile </div>
</div>
<div className="flex bg-grey-300 text-lg text-black p-4 rounded-xl hover:bg-gray-200 ">
<IoMdAddCircleOutline size={40} className="transition-transform hover:scale-110" 
    style={{ transitionDuration: '300ms' }} /><div className="m-2 my-auto">Add Post</div>
</div>
<div className="flex text-lg text-black p-4 rounded-xl hover:bg-gray-200">
<MdOutlinePhotoCameraBack size={40} className="transition-transform hover:scale-110" 
    style={{ transitionDuration: '300ms' }}/><div className="m-2 my-auto"> Feed</div>
</div>
<div className="flex text-lg text-black p-4 rounded-xl hover:bg-gray-200">
<GrMapLocation size={40} className="transition-transform hover:scale-110" 
    style={{ transitionDuration: '300ms' }}/><div className="m-2 my-auto"> Map</div>
</div>
<div className="flex text-xl text-black mb-5 p-4 rounded-xl hover:bg-gray-200">
<FaStar size={40} className="transition-transform hover:scale-110" 
    style={{ transitionDuration: '300ms' }}/><div className="m-2 my-auto"> Top Rated</div>
</div></div>
<div className=" mt-80 flex text-xl text-gray-900 mb-5 p-4 rounded-xl hover:bg-gray-200">
<GiPowerButton size={30} className="transition-transform hover:scale-110" 
    style={{ transitionDuration: '300ms' }}/><div className="m-2 my-auto text-md"> Logout</div>
</div>

</div>
  
      

   
)
}

export default SideBar