"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import ApiClient from "../../../utils/ApiClient";
import { useRouter } from "next/navigation";

export default function Home() {

  // // const [token, setToken] = useState(null);
  const client = new ApiClient(
   () => token,
   () => logout()
  );
  
  const router = useRouter()
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
      router.push("/feed");
    } else {      
      alert(data.message); // Display message if login unsuccessful
    }
    })
    .catch(() => {
    alert("An error occurred."); // Handle error if request fails
    })
    .finally(() => {
    setDisabled(false); // Re-enable the login button
    });
    }

    //if already logged in, route to feed    

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md bg-opacity-80">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              className="mt-1 p-2 w-full border rounded-md"
              disabled={disabled}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
              disabled={disabled}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            disabled={disabled}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
