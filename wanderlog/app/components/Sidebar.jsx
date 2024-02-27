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
import { useEffect, useState } from "react";
import  ApiClient from "../../utils/ApiClient";
import { useRouter } from "next/navigation";
import { MdHelpOutline } from "react-icons/md";
import {Modalbutton} from "./Modalbutton"
import CreatePost from "./CreatePost";



  const SideBar = () => {
  const client = new ApiClient();
  const pathname = usePathname();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState()


  useEffect(() => {
    console.log("pathname");
    console.log(pathname)
  }, [pathname]);


    
  
  const handleLogout = async () => {
    client.logout()
    .then(() => {
      router.push('/')
    })
    .catch((error) => {
      console.log('Error logging out:', error);
    });
  };
  
  const openCloseModal = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true);
  }

  return (
    <>
      <div className="sticky top-0 w-4/6 bg-gray-100  ml-0 shadow-xl rounded-lg text-gray-900">
<div className =" flex flex-col ">
<img className="h-auto w-3/4 ml-4 mt-4 p-2 transition-transform hover:scale-110" src= "wanderloglogobw.png" alt="wanderlog logo"/>
      
      
    <Link href="/profile" className={`mt-4 flex text-lg text-black p-4 rounded-xl hover:!bg-gray-200`} style={{ backgroundColor: pathname === "/profile" ? "#E5E7EB" : "inherit"}}> 
        <CgProfile size={40} className="transition-transform hover:scale-110"  style={{ transitionDuration: '300ms' }}/> 
        <div className="m-2 my-auto">Profile</div>
    </Link>

    <button onClick={openCloseModal} className={`flex bg-grey-300 text-lg text-black p-4 rounded-xl hover:!bg-gray-200`} style={{ backgroundColor: pathname === "/add-post" ? "##E5E7EB" : "inherit"}} >
        <IoMdAddCircleOutline size={40} className="transition-transform hover:scale-110" 
          style={{ transitionDuration: '300ms' }} />
        <div className="m-2 my-auto">Add Post</div>
    </button>

    {/* feed */}
    <Link href="/feed" className={`flex text-lg text-black p-4 rounded-xl hover:!bg-gray-200`} style={{ backgroundColor: pathname === "/feed" ? "#E5E7EB" : "inherit"}}> 
           <MdOutlinePhotoCameraBack size={40} className="transition-transform hover:scale-110" style={{ transitionDuration: "300ms" }} />
        <div className="m-2 my-auto"> Feed</div>
    </Link>

    <Link href="/map" className={`flex text-lg text-black p-4 rounded-xl hover:!bg-gray-200 `} style={{ backgroundColor: pathname === "/map" ? "#E5E7EB" : "inherit"}}>
        <GrMapLocation size={40} className="transition-transform hover:scale-110" style={{ transitionDuration: '300ms' }}/>
        <div className="m-2 my-auto"> Map</div>
    </Link> 

    <Link href="/help" className={`flex text-xl text-black mb-5 p-4 rounded-xl hover:bg-gray-200 `} style={{ backgroundColor: pathname === "/help" ? "#E5E7EB" : "inherit"}}> 
        <MdHelpOutline size={40} className="transition-transform hover:scale-110" style={{ transitionDuration: '300ms' }}/>
        <div className="m-2 my-auto"> Help</div>
    </Link>
    <button onClick={handleLogout} className="bottom flex text-xl text-gray-900 mb-5 p-4 rounded-xl hover:bg-gray-200 cursor-pointer">
<GiPowerButton size={30} className="transition-transform hover:scale-110" 
    style={{ transitionDuration: '300ms' }}/>
    <div className="m-2 my-auto text-md cursor-pointer" > Logout</div>
    </button>
    </div>
    </div>
    <div className={"w-full relative"}>
    <CreatePost isOpen={modalOpen}/>
    </div>
    </>
  );
};

export default SideBar;
