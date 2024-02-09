"use client"

import { useState } from 'react';
import ApiClient from "../../../utils/ApiClient";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [password, setPassword] = useState('');
  const [strengthText, setStrengthText] = useState('rotate-0 h-10 w-10');
  const [barsClass, setBarsClass] = useState('');
  const client = new ApiClient(
    () => token,
    () => logout()
   );
   const router = useRouter()

  const strength = {
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
    console.log(data.status)
    if (data.status === 201) {
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



  return (
    <div className="w-full mt-5 max-w-xs">
      <form onSubmit={submitHandler} className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 login-form">
        <h2 className="text-center">Register</h2>
        <h2 className="text-center mb-5">to add your location</h2>
        <div className="username">
          <div id="spinner" className="spinner"></div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            onChange={handleChange}
            value={password}
          />
          <p className="text-red-500 text-xs italic">Please choose a password.</p>
        </div>
        <div className="flex items-center">
        <div className="mx-auto mb-5">
        <img src="/speedometer.png" className={strengthText}></img>
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
            className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;