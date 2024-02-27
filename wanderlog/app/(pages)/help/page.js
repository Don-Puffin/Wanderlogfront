"use client";
import React from 'react'
import SideBar from "../../components/Sidebar"
import ApiClient from '../../../utils/ApiClient';
import { useRouter } from 'next/navigation';


const page = () => {
  const router = useRouter();

  const client = new ApiClient(
    () => token,
    () => logout()
  );

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status

  const authUser = () => {
    client.authUser()
      .then(response => {
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          router.push('/');
        }
      })
      .catch(error => {
        console.error('Error authenticating user:', error);
        router.push('/');
      });
  };
  
  if (!isAuthenticated) {
    return <div className="text-black mx-auto p-10">Authenticating...</div>;
  }

  return (
    <div className="flex flex-cols-2">
    <div className="sticky top-0 w-1/3  bg-white">
        <SideBar />
        </div>

        <div className="grid grid-cols-3 gap-10  h-full w-screen bg-white">
        
   
        </div>
    </div>
  )
}

export default page