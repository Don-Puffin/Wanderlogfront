import React from 'react'
import {APIProvider, Map, Marker, useMapsLibrary} from '@vis.gl/react-google-maps';
import {currentProfile} from '../../app/(pages)/profile/page.js';

function postGoogleMap() {
    const apiKeyValue = process.env.NEXT_PUBLIC_GOOGLE_API_KEY 


  const position = {lat: 40.7128, lng:-74.0060}
  return (
    <APIProvider apiKey={apiKeyValue}>
      <Map center={position} zoom={10} disableDefaultUI = {false} fullscreenControl={true} zoomControl={false} >
      <Marker position={position} />
      </Map>
    </APIProvider>
  );
}





export default postGoogleMap;

// import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

// function App() {
//   return (
//     <APIProvider apiKey={'YOUR_API_KEY'}>
//       <Map center={position} zoom={10}>
//         <Marker position={position} />
//       </Map>
//     </APIProvider>
//   );
// }

// export default App;



