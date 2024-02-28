"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import ApiClient from "../../../utils/ApiClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CookiePolicy from "../../components/CookiePopup"
import {Tooltip, Button} from "@nextui-org/react";
import { IoIosHelpCircleOutline } from "react-icons/io";
import toast, {Toaster} from "react-hot-toast";

export default function Home() {

  // // const [token, setToken] = useState(null);
  const client = new ApiClient(
   () => token,
   () => logout()
  );
  
  const router = useRouter()
  const notify = (text) => toast(text);

  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-between p-24">
  //   <div className="opacity-90 w-64 bg-slate-200 rounded-2xl m-5 h-96"></div>
  //   <div className="opacity-90 w-64 bg-slate-200 rounded-2xl m-5 h-96"></div>
  // <div className="opacity-90 w-64 bg-slate-200 rounded-2xl m-5 h-96"></div>
  // <div className="opacity-90 w-64 bg-slate-200 rounded-2xl m-5 h-96"></div>

  //   {/* if not logged in, return Login from login.js,
  //     (within login.js, option to return Register from register.jsx)

  //     if logged in, default to returning feed full of post.jsxs,

  //     if "profile" clicked, return profile instead of feed */}


  //   </main>
  // );

  const [disabled, setDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setDisabled(true);
    client.getLogin(e.target.username.value, e.target.password.value)
    .then(data => {
    console.log(data.status)
    if (data.status === 200) {
      notify(data.message);
      router.push("/feed");
    } else {      
      notify(data.message); // Display message if login unsuccessful
    }
    })
    .catch(() => {
    notify(data.message); // Handle error if request fails
    })
    .finally(() => {
    setDisabled(false); // Re-enable the login button
    });
    }

    //if already logged in, route to feed    

    return (
      <div className="font-[sans-serif] bg-black text-[#333] md:h-screen">
        <CookiePolicy />
        <div className="grid md:grid-cols-2 items-center gap-8 h-full">
          <div className="p-4">
            <img
              src="/wanderlog logo3.png"
              className="lg:max-w-[80%] w-full h-full object-contain block mx-auto"
              alt="login-image"
            />
          </div>
          <div className="flex items-center md:p-8 p-6 bg-white md:rounded-tl-[55px] md:rounded-bl-[55px] h-full">
            
         
            <form className="max-w-lg w-full mx-auto" onSubmit={submitHandler}>
              <div className="mb-12">
                <h3 className="text-4xl font-extrabold">Sign in<span className="text-lg hover:text-green-500">
                <Tooltip
      content={
        <div className="bg-slate-200 px-1 py-2">
          <div className="bg-slate-200 text-small font-bold">How To Login</div>
          <div className="text-tiny">Enter a valid username</div>
         
        </div>
      }
    >
      <button>
       <Link href="/help"><IoIosHelpCircleOutline />
</Link>
      </button>
    </Tooltip></span>
    </h3>
                <p className="text-sm mt-4 ">
                  Don't have an account?{" "}
                  <Link className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap" href="/register">
                 
                    Register here!
                  
                </Link>
                </p>
              </div>
              <div>
                <label className="text-xs block mb-2">Username</label>
                <div className="relative flex items-center">
                  <input
                    name="username"
                    type="text"
                    required
                    className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                    placeholder="Enter Username"
                  />
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2"
                    viewBox="0 0 682.667 682.667"
                  >
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                      </clipPath>
                    </defs>
                    <g
                      clipPath="url(#a)"
                      transform="matrix(1.33 0 0 -1.33 0 682.667)"
                    >
                      <path
                        fill="none"
                        strokeMiterlimit="10"
                        strokeWidth="40"
                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                        data-original="#000000"
                      ></path>
                      <path
                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                        data-original="#000000"
                      ></path>
                    </g>
                  </svg> */}
                </div>
              </div>
              <div className="mt-8">
                <label className="text-xs block mb-2">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                    placeholder="Enter password"
                  />
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg> */}
                </div>
              </div>
    
              <div className="mt-12">
           
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-[#333] hover:bg-[#222] focus:outline-none"
                  disabled={disabled}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
        <Toaster position="bottom-right"/>

      </div>
    );
    
}
