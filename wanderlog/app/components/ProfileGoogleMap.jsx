import React from 'react'
import {APIProvider, Map, Marker, useMarkerRef, useMapsLibrary, InfoWindow} from '@vis.gl/react-google-maps';
// import {currentProfile} from '../../app/(pages)/profile/page.js';
import ApiClient  from '@/utils/ApiClient';
import { useState, useEffect } from "react";

function ProfileGoogleMap({}) {
    const apiKeyValue = process.env.NEXT_PUBLIC_GOOGLE_API_KEY 
    const centerOfWorld = { lat: 30, lng: 0 };

  const [isOpen, setIsOpen] = useState(false);
  const handleMouseOver = (index) => {
   setIsOpen(index);
  };

  const handleMouseOut = () => {
    setIsOpen(null);
  };
    

  const client = new ApiClient();
  // const positions = []
  const [positions, setPositions] = useState([]);
  const [locationDetails, setLocationDetails] = useState([]);
  const [markerRef, marker] = useMarkerRef();
  const getLocations = () => {
    client.getMapLocations().then(response => {
      console.log(response);
      console.log(response.mapLocations);
      // for (let i = 0; i < response.mapLocations.length; i++) {
      //   positions.push({lat: response.mapLocations[i].lat, lng: response.mapLocations[i].lng})
      //   console.log(positions)
      // }
      const locationDetail = response.mapLocations;
      const positions = response.mapLocations.map(loc => ({ lat: loc.lat, lng: loc.lng }));
      setPositions(positions);
      setLocationDetails(locationDetail);
    })
  }

  useEffect(() => {
    getLocations();
  }, []);

  const closeInfoWindow = () => {
    markerRef.current.close();
  }

  return (
    <APIProvider apiKey={apiKeyValue}>
      <Map  center={centerOfWorld} zoom={1.6} disableDefaultUI = {true} fullscreenControl={false} zoomControl={false}  > 
        {positions.map((position, index) => (
        <>
        {isOpen === index && <InfoWindow position={position} onCloseClick={closeInfoWindow}>
          <h2>{locationDetails[index].name}</h2>
          <p>{locationDetails[index].rating}/5</p>
        </InfoWindow>}
        <Marker ref={markerRef} key={index} position={position} onMouseOver ={() => handleMouseOver(index)} onMouseOut={handleMouseOut}/>
        </>
      ))}
        {/* <Marker position={position} /> */}
        {/* <Marker position={position2} /> */}
      </Map>
    </APIProvider>
  );
}

export default ProfileGoogleMap


