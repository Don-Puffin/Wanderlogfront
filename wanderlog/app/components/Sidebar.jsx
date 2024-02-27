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



  const SideBar = (props) => {
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

  useEffect(() => {
   props.triggerVisibilityChangeInParent(modalOpen)
  }, [modalOpen]);

  return (
    <>
      <div className="sticky  top-0 w-full h-screen bg-black  ml-0 shadow-xl rounded-lg" id="sidebar">
<div className =" flex flex-col text-xl ">
<img className="h-auto w-3/4 ml-4 mt-4 p-2 transition-transform hover:scale-110" src= "wanderlog logo3.png" alt="wanderlog logo"/>
      
      
<Link href="/profile" className={`flex max-h-14 text-xl text-white p-4 rounded-xl hover:text-black hover:bg-white `} style={{ backgroundColor: pathname === "/profile" ? "#ffffff" : "inherit"}}>             
              <CgProfile size={30}  className="transition-transform hover:text-black  hover:scale-110" style={{ transitionDuration: "300ms", color: pathname === "/profile" ? "#000000" : "inherit" }} />
              <div className="m-2 my-auto" style={{ color: pathname === "/profile" ? "#000000" : "inherit"}}> Profile</div>
            </Link>
            <button
              onClick={openCloseModal}
               className={`flex text-xl text-white p-4 rounded-xl h-full hover:text-black hover:bg-white`}>              
            <IoMdAddCircleOutline color="inherit" size={30} className="transition-transform hover:scale-110" style={{ transitionDuration: "300ms"}} />
            <div className="m-2 my-auto"> Add Post</div>
            </button>
            {/* Add other navbar links/buttons */}
          
            <Link href="/feed" className={`flex max-h-14 text-white p-4 rounded-xl hover:bg-white hover:text-black`} style={{ backgroundColor: pathname === "/feed" ? "#ffffff" : "inherit"}}> 
           <MdOutlinePhotoCameraBack color="white" size={30} className="transition-transform hover:text-black hover:scale-110" style={{ transitionDuration: "300ms", color: pathname === "/feed" ? "#000000" : "inherit" }} />
           <div className="m-2 my-auto" style={{ color: pathname === "/feed" ? "#000000" : "inherit"}}> Feed</div>
    </Link>

    <Link href="/map" className={`flex max-h-14 text-xl text-white p-4 rounded-xl hover:bg-white hover:text-black`} style={{ backgroundColor: pathname === "/map" ? "#ffffff" : "inherit"}}>
        <GrMapLocation color="white" size={30} className="transition-transform hover:scale-110" style={{ transitionDuration: '300ms', color: pathname === "/map" ? "#000000" : "inherit" }}/>
        <div className="m-2 my-auto"> Map</div>
    </Link> 

    <Link href="/help" className={`flex max-h-14 text-xl text-white mb-5 p-4 rounded-xl hover:bg-white hover:text-black`} style={{ backgroundColor: pathname === "/help" ? "#ffffff" : "inherit"}}> 
        <MdHelpOutline color="white" size={30} className="transition-transform hover:scale-110" style={{ transitionDuration: '300ms', color: pathname === "/help" ? "#000000" : "inherit", textcolor: pathname === "/help" ? "#000000" : "inherit"  }}/>
        <div className="m-2 my-auto"> Help</div>
    </Link>
          
          
        


        {/* Add other navbar links/buttons */}
        <button
          onClick={handleLogout}
          className=" flex max-h-14 text-xl text-white mb-5 p-2 rounded-xl hover:bg-white hover:text-black cursor-pointer"
          
        >
          <GiPowerButton color="inherit" size={30} />
          <span className="ml-"></span>
          <div className="m-2 my-auto"> Logout</div>
        </button>
      </div>
      <div className={"w-screen"} id="modal-container">
        <CreatePost isOpen={modalOpen} setIsOpen={setModalOpen} />
        </div>
    </div>
    </>
  );
};

export default SideBar;



