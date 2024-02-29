"use client";
import { useState, useEffect } from "react";
import ApiClient from "../../../utils/ApiClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CookiePolicy from "../../components/CookiePopup"
import {Tooltip, Button} from "@nextui-org/react";
import { IoIosHelpCircleOutline } from "react-icons/io";
import toast, {Toaster} from "react-hot-toast";

export default function Home() {

  const client = new ApiClient(
   () => token,
   () => logout()
  );
  
  const router = useRouter()
  const notify = (text) => toast(text);

  const [disabled, setDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setDisabled(true);
    client.getLogin(e.target.username.value, e.target.password.value)
    .then(data => {
    if (data.status === 200) {
      notify(data.message);
      router.push("/feed");
    } else {      
      notify(data.message); 
    }
    })
    .catch(() => {
    notify(data.message);
    })
    .finally(() => {
    setDisabled(false);
    });
    }

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
          <div className="text-tiny">Enter a valid username and password</div>
          <Link href="./help">Click For Help Page</Link>

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
