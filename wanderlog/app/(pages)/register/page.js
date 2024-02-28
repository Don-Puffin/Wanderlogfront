"use client"

import { useState } from 'react';
import ApiClient from "../../../utils/ApiClient";
import { useRouter } from "next/navigation";
import {Tooltip, Button} from "@nextui-org/react";
import Link from 'next/link'
import { IoIosHelpCircleOutline } from "react-icons/io";
import CookiePolicy from "../../components/CookiePopup"
import toast, {Toaster} from "react-hot-toast";

const RegisterForm = () => {
  const [password, setPassword] = useState('');
  const [strengthText, setStrengthText] = useState('rotate-0 h-10 w-10');
  const [notifText, setNotifText] = useState('');
  const [notifDisplay, setNotifDisplay] = useState('');
  const [barsClass, setBarsClass] = useState('');
  const [showPasswordError, setPasswordError] = useState(false);
  const client = new ApiClient(
    () => token,
    () => logout()
   );
   const router = useRouter()

  const notify = (text) => toast(text);

  const strength = {
    0: '-rotate-90 h-10 w-10',
    1: '-rotate-90 h-10 w-10',
    2: 'rotate-0 h-10 w-10',
    3: 'rotate-90 h-10 w-10',
  };

  const getIndicator = (password, strengthValue) => {
    for (let index = 0; index < password.length; index++) {
      let char = password.charCodeAt(index);
      if (!strengthValue.upper && char >= 65 && char <= 90) {
        strengthValue.upper = true;
      } else if (!strengthValue.numbers && char >= 48 && char <= 57) {
        strengthValue.numbers = true;
      } else if (!strengthValue.lower && char >= 97 && char <= 122) {
        strengthValue.lower = true;
      }
    }

    let strengthIndicator = 0;

    for (let metric in strengthValue) {
      if (strengthValue[metric] === true) {
        strengthIndicator++;
      }
    }

    return strength[strengthIndicator] ?? '';
  };

  const getStrength = (password) => {
    let strengthValue = {
      upper: false,
      numbers: false,
      lower: false,
    };

    return getIndicator(password, strengthValue);
  };

  const handleChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    const strengthText = getStrength(newPassword);

    if (strengthText) {
      setStrengthText(`${strengthText} Password`);
      setBarsClass(strengthText);
    } else {
      setStrengthText('');
      setBarsClass('');
    }
  };

  const [disabled, setDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setDisabled(true);
    client.register(e.target.username.value, e.target.password.value)
    .then(data => {
    if (data.status === 201) {
      notify(data.message);
      router.push("/feed");
    } else {      
      // setNotifDisplay(true);
      // setNotifText(data.message); // Display message if login unsuccessful
      notify(data.message);
      setPasswordError(true);
    }
    })
    .catch(() => {
      // setNotifDisplay(true);
      // setNotifText(data.message); // Handle error if request fails
      notify(data.message)
      setPasswordError(true);
    })
    .finally(() => {
    setDisabled(false); // Re-enable the login button
    });
    }



  return (

      <div className="font-[sans-serif] bg-black text-[#333] md:h-screen">
        <CookiePolicy />
        {/* <Toast notifText={notifText} isVisible={notifDisplay}></Toast> */}
        <div className="grid md:grid-cols-2 items-center gap-8 h-full">
          <div className=" p-4">
            <img
              src="/wanderlog logo3.png"
              className="lg:max-w-[80%] w-full h-full object-contain block mx-auto"
              alt="login-image"
            />
          </div>
          
          <div className="flex items-center md:p-8 p-6 bg-white md:rounded-tl-[55px] md:rounded-bl-[55px] h-full">
            
          
            {/* DELETE FORM */}
            {/* <form className="max-w-lg w-full mx-auto" onSubmit={submitHandler}> */}
              <div >
                

                
              </div>
              <div>
                <h3 className="text-4xl font-extrabold">Register<span className="text-lg hover:text-green-500">  <Tooltip
      content={
        <div className="bg-slate-200 px-1 py-2">
          <div className="text-slate-700 text-small font-bold">How To Register</div>
          <p className="text-slate-700 text-sm ">
          <Link href="./help">Click For Help Page</Link>
          </p>
        </div>
      }
    >
      <button>
      <IoIosHelpCircleOutline />
      </button>
    </Tooltip></span></h3>
              
              <form onSubmit={submitHandler} className="bg-white  px-8 pt-6 pb-8 mb-4 login-form">
        
        <h2 className="text-center mb-5"></h2>
        <div className="username">
          <div id="spinner" className="spinner"></div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-xs mb-2" htmlFor="username">
            Username 
            
          </label>
          
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-xs mb-2" htmlFor="password">
            Password
          </label>
          <input
            className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline
            ${showPasswordError ? 'border-red-300': ''}`}
            id="password"
            type="password"
            placeholder="******************"
            onChange={handleChange}
            value={password}
          />
          {showPasswordError && (<p className="text-red-500 text-xs italic">Please choose a password (must include at least one lowercase, one uppercase, one number & one symbol)</p>
          )}
        </div>
        <div className="flex items-center">
        <div className="mx-auto mb-5">
          <p className="text-slate-500 text-xs text-center -ml-2 mb-2">Fair</p>
          <div className="flex">
          <p className="text-slate-500 text-xs mr-3 mt-3">Weak</p>
        <img src="/pin2.png" className={strengthText}></img>
        <p className="text-slate-500 text-xs ml-3 mt-3">Strong</p>
        </div>
        </div>

        </div>
        
        {/* <div id="bars" className={barsClass}>
          <div></div>
        </div> */}
        {/* <div className={`strength my-8 flex flex-1 items-center gap-8 h-6 rounded-md bg-opacity-10 bg-white ${barsClass}`} id="strength">
          {strengthText && <span>{strengthText}</span>}
        </div> */}
        <div className="flex items-center">
        
          <button
            className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-[#333] hover:bg-[#222] focus:outline-none"
            type="submit"
          >
            Register
          </button>
        </div>

       
      </form>
                
                
              </div>
              
    
              
            {/* </form> */}


{/* DELETE FORM */}

          </div>
        </div>
        <Toaster position="bottom-right"/>

      </div>
);
};

export default RegisterForm;