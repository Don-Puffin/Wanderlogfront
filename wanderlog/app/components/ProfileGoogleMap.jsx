import React from 'react'
import {APIProvider, Map, Marker, useMapsLibrary} from '@vis.gl/react-google-maps';
// import {currentProfile} from '../../app/(pages)/profile/page.js';

function ProfileGoogleMap({}) {
    const apiKeyValue = process.env.NEXT_PUBLIC_GOOGLE_API_KEY 
    const centerOfWorld = { lat: 30, lng: 0 };

    // const position = {lat:props.lat, lng:props.lng}; 
  const positions = [{lat: 40.7128, lng:-74.0060}, {lat: 48.8566, lng: 2.3522}, {lat: -33.8688, lng: 151.2093}, {lat: -25.363, lng: 131.044}, {lat: 51.5074, lng: -0.1278}];
  // const position2 = {lat: 48.8566, lng: 2.3522};
  // const position = {lat: props.lat, lng:props.lng};
  // console.log("this is in map", position)
  
// write list of lat and lng here for 5 cities around the world




  return (
    <APIProvider apiKey={apiKeyValue}>
      <Map  center={centerOfWorld} zoom={1.6} disableDefaultUI = {true} fullscreenControl={false} zoomControl={false} >
        {positions.map((position, index) => (
        <Marker key={index} position={position} />
      ))}
        {/* <Marker position={position} /> */}
        {/* <Marker position={position2} /> */}
      </Map>
    </APIProvider>
  );
}





export default ProfileGoogleMap


