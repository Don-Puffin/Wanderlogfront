import React from 'react'
import { useState, useEffect } from 'react';
import ApiClient  from '../../utils/ApiClient';
import axios from 'axios';
import { CldUploadWidget } from 'next-cloudinary';
import {useRouter} from "next/navigation";
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import {FaRegWindowClose} from "react-icons/fa";
import toast, {Toaster} from "react-hot-toast";


const apiKeyValue = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
const googleLibraries = ["places","maps"]


const CreatePost = (props) => {

  const router = useRouter();

  let isOpen = props.isOpen
  
    const [userLat, setUserLat] = useState (0)
    const [userLng, setUserLng] = useState (0)
    const [locationName, setLocationName] = useState ("")
    const [searchResult, setSearchResult] = useState("")
    
    const [imageURL, setImageURL] = useState ("/images/placeholder.png")
  
    const notify = (text) => toast(text);


    const client = new ApiClient();
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKeyValue,
    libraries: googleLibraries
  })

  const onLoadFunction = (autocomplete) => {
    setSearchResult(autocomplete);
  }

  const onPlaceChangedFunction = () => {
    const place = searchResult.getPlace();
    setLocationName(place.formatted_address)
    const placeId = place.place_id
    handleLocation(placeId)
  }


  const openCloseModal = () => {
    props.setIsOpen(!isOpen)
  }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const postLocation = {name: "", lat: 0, long: 0, rating: 0}
        postLocation.name = locationName
        postLocation.lat = userLat
        postLocation.long = userLng
        postLocation.rating = event.target.rating.value
        const postImage = imageURL
        const postText = event.target.text.value

        client.createPost(postText, postLocation, postImage)
        .then(response => {
            notify(response.message);
            console.log(response.message)
            window.location.reload();
          })
        .catch(error => {
            console.error(error)
            notify(response.message);
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
    

  return (
   isOpen &&  (   
    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/4 -translate-y-1/2 md:w-1/3' id="modal"

    >    
<form id="form" className="max-w-screen top-0 mx-auto h-6/12 w-full  border-slate-200 border-2 shadow-xl rounded-xl p-4 bg-black bg-opacity-80 text-slate-200 z-50" onSubmit={handleSubmit}
>
<button type="button" onClick={openCloseModal} >
   <FaRegWindowClose className="text-slate-200 text-2xl hover:text-red"/>
  </button>  
  <div className="flex flex-col items-center">

  <h2 className="text-center text-xl font-bold tracking-wider">Create Post</h2>

  <label className="my-2 font-bold tracking-wide" for="location" > 
    Location:
    </label>
  {isLoaded && <Autocomplete onLoad={onLoadFunction} onPlaceChanged={onPlaceChangedFunction}> 
    <input id="location-input" name="location" type="text" placeholder="Where have you been?" className="rounded-md my-1 p-3 bg-black bg-opacity-80 border-slate-200 border-2"></input>
  </Autocomplete>
  }
  <label className="my-2 font-bold text-center tracking-wide">
  Description:
  </label>
  <textarea type="text" name="text" className="p-4 w-80 my-1 rounded-md bg-black bg-opacity-80 border-slate-200 border-2" placeholder="What was it like?"/>
  <div className="my-3 flex flex-row justify-around">
  <label className="font-bold tracking-wide">
    Rating:
    <select type="number" name="rating" className="border-slate-200 border-2 rounded-xl w-15 p-2 mx-2 relative bg-black bg-opacity-80">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
    </select>  
  </label>
  <CldUploadWidget 
      onSuccess={(results, error) => {    
        if (error) {
          console.log(error);
        }
        setImageURL(results.info.url)
      }}
      uploadPreset="wanderlog" >
  {({ open }) => {
    return (
      <button type="button" className="my-auto w-22 border border-slate-200 block mx-auto rounded-full bg-black bg-opacity-80 hover:shadow text-md text-slate-200 ml-3 px-6 p-2" onClick={() => open()}>
        Upload image
      </button>
    );
  }}
</CldUploadWidget>
</div>
  <input type="submit" value="Submit" className="bottom border-2 border-slate-200 hover:bg-slate-200 cursor-pointer text-slate-200 hover:text-black font-bold py-2 my-4 px-4 rounded-lg tracking-wide"/>
  </div>
</form>
<Toaster position="top-center"  />
</div>
 )
  )
}


export default CreatePost

