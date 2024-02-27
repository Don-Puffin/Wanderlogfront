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
import ApiClient from "../../utils/ApiClient";
import { useRouter } from "next/navigation";
import { MdHelpOutline } from "react-icons/md";
import { Modalbutton } from "./Modalbutton";
import CreatePost from "./CreatePost";

const NavBar = (props) => {
  const client = new ApiClient();
  const pathname = usePathname();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState();

  useEffect(() => {
    console.log("pathname");
    console.log(pathname);
  }, [pathname]);

  const handleLogout = async () => {
    client
      .logout()
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.log("Error logging out:", error);
      });
  };

  const openCloseModal = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true);
  };

  useEffect(() => {
    props.triggerVisibilityChangeInParent(modalOpen);
  }, [modalOpen]);

  return (
    <>
      <div className="sticky top-0 left-0 max-h-20 w-full bg-gray-100 shadow-xl rounded-lg text-gray-900" id="navbar">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto px-4 py-2">
          <Link href="/">
            <img
              className="h-auto w-24 cursor-pointer"
              src="wanderloglogobw.png"
              alt="wanderlog logo"
            />
          </Link>
          <div className="flex space-x-4">
            <Link
              href="/profile"
              className={`flex items-center text-lg text-black p-2 rounded-xl hover:bg-gray-200`}
            >
              <CgProfile size={24} />
              <span className="ml-2"></span>
            </Link>
            <button
              onClick={openCloseModal}
              className={`flex items-center bg-grey-300 text-lg text-black p-2 rounded-xl hover:bg-gray-200`}
            >
              <IoMdAddCircleOutline size={24} />
              <span className="ml-2"></span>
            </button>
            {/* Add other navbar links/buttons */}
          </div>
        </div>
        {/* Add other navbar links/buttons */}
        <button
          onClick={handleLogout}
          className="bottom-0 flex text-xl text-gray-900 mb-5 p-2 rounded-xl hover:bg-gray-200 cursor-pointer"
        >
          <GiPowerButton size={24} />
          <span className="ml-2"></span>
        </button>
      </div>
      <div className={"w-full"} id="modal-container">
        <CreatePost isOpen={modalOpen} setIsOpen={setModalOpen} />
      </div>
    </>
  );
};

export default NavBar;