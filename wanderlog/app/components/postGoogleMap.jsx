"use client";
import React from 'react'
//import {APIProvider, Map, Marker, useMapsLibrary} from '@vis.gl/react-google-maps';
import { GoogleMap, Marker, useJsApiLoader, LoadScript } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

function postGoogleMap(props) {

    const apiKeyValue = process.env.NEXT_PUBLIC_GOOGLE_API_KEY 
    const [supressGoogle, setSupressGoogle] = useState(false)

  const position = {lat: props.lat, lng: props.lng}

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKeyValue
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
    return isLoaded && !supressGoogle &&
      <GoogleMap  center={position} zoom={10} disableDefaultUI = {false} fullscreenControl={true} zoomControl={false} mapContainerStyle={{width: '100%', height: '100%', zIndex: '0'  
    }}
      mapOptions={{disableDefaultUI: true}} >
      <Marker position={position} />
      </GoogleMap>
    }

}





export default postGoogleMap;




