"use client";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdAddCircleOutline } from "react-icons/io";
import Link from "next/link";
import { GrMapLocation } from "react-icons/gr";
import { MdOutlinePhotoCameraBack } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { GiPowerButton } from "react-icons/gi";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SideBar = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.log("pathname");
    console.log(pathname)
  }, [pathname]);

  return (
    <>
      <div className="sticky  top-0 w-4/6 h-screen bg-gray-100  ml-0 shadow-xl rounded-lg text-gray-900">
<div className =" flex flex-col  ">
<img className="h-auto w-3/4 ml-4 mt-4 p-2 transition-transform hover:scale-110" src= "wanderloglogobw.png" alt="wanderlog logo"/>
      
      
    <Link href="/profile" className={`mt-4 flex text-lg text-black p-4 rounded-xl hover:!bg-gray-200`} style={{ backgroundColor: pathname === "/profile" ? "#E5E7EB" : "inherit"}}> 
        <CgProfile size={40} className="transition-transform hover:scale-110"  style={{ transitionDuration: '300ms' }}/> 
        <div className="m-2 my-auto">Profile</div>
    </Link>

    <Link href="/add-post" className={`flex bg-grey-300 text-lg text-black p-4 rounded-xl hover:!bg-gray-200`} style={{ backgroundColor: pathname === "/add-post" ? "##E5E7EB" : "inherit"}} >
        <IoMdAddCircleOutline size={40} className="transition-transform hover:scale-110" 
          style={{ transitionDuration: '300ms' }} />
        <div className="m-2 my-auto">Add Post</div>
    </Link>

    {/* feed */}
    <Link href="/feed" className={`flex text-lg text-black p-4 rounded-xl hover:!bg-gray-200`} style={{ backgroundColor: pathname === "/feed" ? "#E5E7EB" : "inherit"}}> 
           <MdOutlinePhotoCameraBack size={40} className="transition-transform hover:scale-110" style={{ transitionDuration: "300ms" }} />
        <div className="m-2 my-auto"> Feed</div>
    </Link>

    <Link href="/map" className={`flex text-lg text-black p-4 rounded-xl hover:!bg-gray-200 `} style={{ backgroundColor: pathname === "/map" ? "#E5E7EB" : "inherit"}}>
        <GrMapLocation size={40} className="transition-transform hover:scale-110" style={{ transitionDuration: '300ms' }}/>
        <div className="m-2 my-auto"> Map</div>
    </Link> 

    <Link href="/toprated" className={`flex text-xl text-black mb-5 p-4 rounded-xl hover:bg-gray-200 `} style={{ backgroundColor: pathname === "/toprated" ? "#E5E7EB" : "inherit"}}> 
        <FaStar size={40} className="transition-transform hover:scale-110" style={{ transitionDuration: '300ms' }}/>
        <div className="m-2 my-auto"> Top Rated</div>
    </Link>
    <div className=" mt-80 flex text-xl text-gray-900 mb-5 p-4 rounded-xl hover:bg-gray-200">
<GiPowerButton size={30} className="transition-transform hover:scale-110" 
    style={{ transitionDuration: '300ms' }}/>
    <div className="m-2 my-auto text-md"> Logout</div>
    </div>
    </div>
    </div>
    </>
  );
};

export default SideBar;
