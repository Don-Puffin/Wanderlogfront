import React from 'react'
import { GoogleMap, Marker, InfoWindow, useJsApiLoader, LoadScript} from '@react-google-maps/api';
import ApiClient  from '../../utils/ApiClient';
import { useState, useEffect, Fragment } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";


function ProfileGoogleMap(props) {
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
  const [positions, setPositions] = useState([]);
  const [locationDetails, setLocationDetails] = useState([]);
  const getLocations = () => {
    client.getMapLocations(props.id).then(response => {
      const locationDetail = response.mapLocations;
      const positions = response.mapLocations ? response.mapLocations.map(loc => ({ lat: loc.lat, lng: loc.lng })) : [];
      setPositions(positions);
      setLocationDetails(locationDetail);
    })
  }

  useEffect(() => {
    getLocations();
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKeyValue,
    libraries: googleLibraries
  })

  useEffect(() => { 
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
      zoom={1.6}
      disableDefaultUI = {true} 
      fullscreenControl={false} 
      zoomControl={false}
      mapContainerStyle={{width: '100%', height: '100%'}}
      options={mapOptions}
      > 
        {positions.length > 0 ? positions.map((position, index) => {

        const marker = (
          <Marker key={index} position={position} onMouseOver={() => handleMouseOver(index)} />
        );
        
        let content;
        const stars = locationDetails[index].rating
        if (stars === 1) {
          content = <div className="flex w-full justify-center text-yellow-500"><FaStar /><CiStar /><CiStar /><CiStar /><CiStar /></div>;
        } else if (stars === 2) {
          content = <div className="flex w-full justify-center text-yellow-500"><FaStar /><FaStar /><CiStar /><CiStar /><CiStar /></div>;
        } else if (stars === 3) {
          content = <div className="flex w-full justify-center text-yellow-500"><FaStar /><FaStar /><FaStar /><CiStar /><CiStar /></div>;
        } 
        else if (stars === 4) {
          content = <div className="flex w-full justify-center text-yellow-500"><FaStar /><FaStar /><FaStar /><FaStar /><CiStar /></div>;
        } else if (stars >= 5) {
          content = <div className="flex w-full justify-center text-yellow-500"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>;
        }else {
          content = <div>No Rating Given</div>;
        }

        const infoWindow = (
          <InfoWindow key={`info-${index}`} position={position} onClick={handleMouseOut}>
            <div>
              <h2>{locationDetails[index].name}</h2>
              <div>{content}</div>
            </div>
          </InfoWindow>
        );
    
        return [marker, isOpen === index && infoWindow];
        }) : null}
      </GoogleMap>}
    </>
    )
}
}

export default ProfileGoogleMap


