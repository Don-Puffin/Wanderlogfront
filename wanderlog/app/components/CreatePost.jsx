import React from 'react'
import { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader' 
import ApiClient  from '../../utils/ApiClient';
import Autocomplete from "react-google-autocomplete";
import axios from 'axios';
import {refreshList} from '../(pages)/feed/page.js';
import {NextUIProvider} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { CldUploadWidget } from 'next-cloudinary';

const apiKeyValue = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

const CreatePost = (props) => {
  console.log(props.isOpen)
    const isOpen = props.isOpen
  
    const [userLat, setUserLat] = useState (0)
    const [userLng, setUserLng] = useState (0)
    const [locationName, setLocationName] = useState ("")
    const [placeID, setPlaceID] = useState ("")
    
    const [imageURL, setImageURL] = useState ("/images/placeholder.png")

    const client = new ApiClient();


    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const postLocation = {name: "", lat: 0, long: 0, rating: 0}
        postLocation.name = locationName
        console.log("name", postLocation.name)
        postLocation.lat = userLat
        postLocation.long = userLng
        postLocation.rating = event.target.rating.value
        const postImage = imageURL
        const postText = event.target.text.value

        client.createPost(postText, postLocation, postImage)
        .then(response => {
          ;
          
          alert("Post created successfully");
            console.log(response)
        })
        .catch(error => {
            console.error(error)
        })
        
    }

    const handleLocation = async (placeId) => {    
        let googleMapsResponse = []
        try {
          googleMapsResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${apiKeyValue}`
          );
        } catch (error) {
          console.error(error);
        }
          const googleMapsResult = googleMapsResponse.data.results        
          const lat = googleMapsResult[0].geometry.location.lat;
          const lng = googleMapsResult[0].geometry.location.lng;
          setUserLat(lat);
          setUserLng(lng);
  
        };
    
        // const hideModal = () => {
        //   const modalElement = document.getElementById('modalHide');
        //   if (isOpen) {
        //     modalElement.classList.remove('hidden');
        //   } else {
        //     modalElement.classList.add("hidden")
        //   }
        // };
        

        // useEffect(() => {
        //   hideModal();
        // }, [])

  return (
  // isOpen &&  (  // <div className="bg-gray-100 z-0 w-screen h-screen absolute top-0">
    <div className='fixed'>    
<form id="form" className=" max-w-screen top-0 mx-auto h-96 w-96 shadow-xl rounded-lg  p-4 bg-gray-100" onSubmit={handleSubmit}>
  <div className="gap-4">
  <h2 className="text-center text-xl font-bold">Create Post</h2>
  <label className="mt-4"> 
    Location:
  <Autocomplete
  apiKey={apiKeyValue}
  style={{ width: "90%" }}
  onPlaceSelected={(place) => {
    setLocationName(place.formatted_address)
    const placeId = place.place_id
    handleLocation(placeId)
  }}
  options={{
    types: ["(regions)"],
  }}
  defaultValue="Amsterdam"
  />
  </label>
  <label className="py-4">
  Description:
    <textarea type="text" name="text" className="p-4 w-80"/>
  </label>
  <label>
    <br/>
    Rating:
    <input type="number" name="rating" />
  </label>
  <label>
  <CldUploadWidget 
      onSuccess={(results, error) => {    
        if (error) {
          console.log(error);
        }
        console.log(results.event);
        console.log('URL:', results.info.url);
        console.log(currentProfile.imageURL)
        client.editUserProfile(results.info.url)
        .then(response => {
          console.log('Profile picture updated successfully:', response.data);})
        .catch(error => {
          console.error("Error updating profile picture", error)
        })
      }}
      uploadPreset="wanderlog" >
  {({ open }) => {
    return (
      <button className="mt-2 w-22 border border-grey-500 block mx-auto rounded-full bg-white hover:shadow text-sm text-gray-500 px-6 p-2" onClick={() => open()}>
        Upload
      </button>
    );
  }}
</CldUploadWidget>
  <input type="submit" value="Submit" className="bottom border-2 border-black hover:bg-black cursor-pointer text-black hover:text-white font-bold py-2 px-4 rounded"/>
  </label>
  </div>
</form>
</div>
    // </div>
 )
  
}


export default CreatePost

