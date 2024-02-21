import React from 'react'
import {APIProvider, Map, Marker, useMapsLibrary} from '@vis.gl/react-google-maps';


function postGoogleMap(props) {

    const apiKeyValue = process.env.NEXT_PUBLIC_GOOGLE_API_KEY 

  const position = {lat: props.lat, lng: props.lng}
return  (
    <APIProvider apiKey={apiKeyValue}>
      <Map center={position} zoom={10} disableDefaultUI = {false} fullscreenControl={true} zoomControl={false}>
      <Marker position={position} />
      </Map>
    </APIProvider>
  );
}


export default postGoogleMap;




