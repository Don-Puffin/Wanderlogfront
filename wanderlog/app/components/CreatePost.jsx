import React from 'react'
import { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader' 
import ApiClient  from '@/utils/ApiClient';
import Autocomplete from "react-google-autocomplete";

const apiKeyValue = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

const CreatePost = () => {

    const [userLat, setUserLat] = useState (0)
    const [userLng, setUserLng] = useState (0)
    const [locationName, setLocationName] = useState ("")
    
    const [imageURL, setImageURL] = useState ("/images/placeholder.png")

    const client = new ApiClient();

    // const loader = new Loader({
    //   apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    //   version: "weekly",
    // });
    useEffect(() => {
      const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
          version: "weekly",
      });

      loader.load().then(() => {
          console.log('Google Maps API loaded successfully');
      }).catch((error) => {
          console.error('Error loading Google Maps API:', error);
      });
  }, []);

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
            console.log(response)
        })
        .catch(error => {
            console.error(error)
        })
    }

    const handleLocation = async () => {
        // const geocoder = new Geocoder()
        // geocoder.geocode({address: locationName})
        // .then((response) => {
        //     setUserLat(response.results[0].geometry.location.lat())
        //     setUserLng(response.results[0].geometry.location.lng())
        // })
        // .catch((error) => {
        //     console.log(error)
        // })
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: locationName }, (results, status) => {
            if (status === 'OK') {
                const lat = results[0].geometry.location.lat();
                const lng = results[0].geometry.location.lng();
                setUserLat(lat);
                setUserLng(lng);
            } else {
                console.error('Geocode was not successful for the following reason:', status);
            }
        });
    }

  return (
    <div>
        
<form onSubmit={handleSubmit}>
  <label>
    {/* User types location, autocomplete helps,location sent to geocoder, lat/long returned in useState */}
    Location:
    <input type="text" name="location" />

<Autocomplete
  apiKey={apiKeyValue}
  style={{ width: "90%" }}
  onPlaceSelected={(place) => {
    setLocationName(place.formatted_address)
    handleLocation()
  }}
  options={{
    types: ["(regions)"],
  }}
  defaultValue="Amsterdam"
/>;
  </label>
  {/* <label>
    Lng:
    <input type="text" name="lng" />
  </label>
  <label>
    Lat:
    <input type="text" name="lat" />
  </label> */}
  <label>
    Info:
    <input type="text" name="text" />
  </label>
  <label>
    Rating:
    <input type="number" name="rating" />
  </label>
  <label>
    Submit:
  <input type="submit" value="Submit"/>
  </label>
</form>



    </div>
  )
}

export default CreatePost