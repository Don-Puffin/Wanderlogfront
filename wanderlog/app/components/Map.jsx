import React from 'react'
import {APIProvider, Map, Marker, useMapsLibrary} from '@vis.gl/react-google-maps';

function GoogleMap() {
    const apiKeyValue = process.env.NEXT_PUBLIC_GOOGLE_API_KEY 
  const position = {lat: 61.2176, lng: -149.8997};
  return (
    <APIProvider apiKey={apiKeyValue}>
      <Map center={position} zoom={10}>
        <Marker position={position} />
      </Map>
    </APIProvider>
  );
}

export default GoogleMap
