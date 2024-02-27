import { useState, useEffect } from "react";
import { usePlacesService } from "react-google-autocomplete";

export default function AutocompleteComponent() {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading
  } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  });

  useEffect(() => {
    if (placePredictions.length > 0) {
      // Fetch place details for the first element in placePredictions array
      placesService.getDetails(
        {
          placeId: placePredictions[0].place_id
        },
        (placeDetails) => savePlaceDetailsToState(placeDetails)
      );
    }
  }, [placesService, placePredictions]);

  const savePlaceDetailsToState = (placeDetails) => {
    // Handle saving place details to state
    console.log("Place details:", placeDetails);
  };

  return (
    <>
      <input
        placeholder="Search for a place"
        onChange={(evt) => {
          getPlacePredictions({ input: evt.target.value });
        }}
      />
      {isPlacePredictionsLoading && <div>Loading...</div>}
      {placePredictions.map((prediction) => (
        <div key={prediction.place_id}>{prediction.description}</div>
      ))}
    </>
  );
}
