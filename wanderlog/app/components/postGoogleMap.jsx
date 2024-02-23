import React from 'react'
//import {APIProvider, Map, Marker, useMapsLibrary} from '@vis.gl/react-google-maps';
import { GoogleMap, Marker, useJsApiLoader, LoadScript } from '@react-google-maps/api';

function postGoogleMap(props) {

    const apiKeyValue = process.env.NEXT_PUBLIC_GOOGLE_API_KEY 

  const position = {lat: props.lat, lng: props.lng}

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKeyValue
  })

return (
  // <LoadScript googleMapsApiKey={apiKeyValue}>
  <>
  {isLoaded &&
      <GoogleMap zIndex={0} center={position} zoom={10} disableDefaultUI = {false} fullscreenControl={true} zoomControl={false} mapContainerStyle={{width: '100%', height: '100%'}}
      mapOptions={{disableDefaultUI: true}} >
      <Marker position={position} />
      </GoogleMap>
    }
        </>

    // </LoadScript> 
);
}





export default postGoogleMap;




