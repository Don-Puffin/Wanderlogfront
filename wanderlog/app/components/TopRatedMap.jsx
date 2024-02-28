import React from 'react'
// import {APIProvider, Map, Marker, useMarkerRef, useMapsLibrary, InfoWindow} from '@vis.gl/react-google-maps';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader, LoadScript} from '@react-google-maps/api';
// import {currentProfile} from '../../app/(pages)/profile/page.js';
import ApiClient  from '../../utils/ApiClient';
import { useState, useEffect, Fragment } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";

function TopRatedMap(props) {
  const [supressGoogle, setSupressGoogle] = useState(false)

  const apiKeyValue = process.env.NEXT_PUBLIC_GOOGLE_API_KEY 
    const googleLibraries = ["places","maps"]

    const centerOfWorld = { lat: 30, lng: 0 };
    const mapOptions = {
      disableDefaultUI: true
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleMouseOver = (index) => {
   setIsOpen(index);
   console.log(isOpen);
  };

  const handleMouseOut = () => {
    setIsOpen(null);
  };
    

  const client = new ApiClient();
  // const positions = []
  const [positions, setPositions] = useState([]);
  const [locationDetails, setLocationDetails] = useState([]);
  // const [markerRef, marker] = useMarkerRef();
  const getLocations = () => {
    client.getTopRatedLocations().then(response => {
      console.log(response);
      const locationDetail = response.mapLocations;
      const positions = response.mapLocations ? response.mapLocations.map(loc => ({ lat: loc.lat, lng: loc.lng })) : [];
      console.log(positions);
      setPositions(positions);
      setLocationDetails(locationDetail);
    })
  }


  useEffect(() => {
    getLocations();
  }, []);

  // const closeInfoWindow = () => {
  //   markerRef.current.close();
  // }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKeyValue,
    libraries: googleLibraries
  })

  useEffect(() => { 
    console.log('hideMap', props.hideMap)
    if (props.hideMap) {
      setSupressGoogle(true)
    }
    else {
      setSupressGoogle(false)
    }
  }, [isLoaded, props.hideMap])


  if (!isLoaded) {
    return <div>Map loading...</div>
  }

  if (supressGoogle) {
    return <div>Map supressed...</div>}

  if (isLoaded && !supressGoogle) {

  return (
    <>
    
    {isLoaded &&
      <GoogleMap  
      center={centerOfWorld} 
      zoom={3}
      disableDefaultUI = {true} 
      fullscreenControl={false} 
      zoomControl={false}
      mapContainerStyle={{width: '100%', height: '100%'}}
      options={mapOptions}
      > 
        {positions.length > 0 ? positions.map((position, index) => {
        // <Marker key={index} position={position} onMouseOver ={() => handleMouseOver(index)} onMouseOut={handleMouseOut}>
        //   {isOpen === index && <InfoWindow position={position} >
        //   <h2>{locationDetails[index].name}</h2>
        //   <p>{locationDetails[index].rating}/5</p>
        // </InfoWindow>}
        // </Marker>
        const marker = (
          <Marker key={index} position={position} onMouseOver={() => handleMouseOver(index)} />
        );
        
        let content;

        const stars = (locationDetails[index].rating)
      
        if (stars >= 4 && stars <= 5) {
          content = <div className="flex w-full justify-center text-yellow-500"><FaStar /><FaStar /><FaStar /><FaStar /><CiStar /></div>;
        } else if (stars >= 5) {
          content = <div className="flex w-full justify-center text-yellow-500"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>;
        }
        const infoWindow = (
          <InfoWindow key={`info-${index}`} position={position} onClick={handleMouseOut}>
            <div>
              <h2>{locationDetails[index].name}</h2>
              {content}
              
            </div>
          </InfoWindow>
        );
    
        return [marker, isOpen === index && infoWindow];
        }) : null}
        {/* <Marker position={position} /> */}
        {/* <Marker position={position2} /> */}
      </GoogleMap>}
     
    </>
    )
}
}

export default TopRatedMap


