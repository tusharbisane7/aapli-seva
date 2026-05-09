import {
  GoogleMap,
  Marker,
  useJsApiLoader
} from "@react-google-maps/api";

function GoogleMapTracker({

  latitude,
  longitude

}) {

  const { isLoaded } =
  useJsApiLoader({

    googleMapsApiKey:
    "YOUR_GOOGLE_MAP_API_KEY"

  });

  if(!isLoaded) {

    return <h2>Loading Map...</h2>;

  }

  return (

    <GoogleMap

      center={{
        lat: latitude,
        lng: longitude
      }}

      zoom={12}

      mapContainerStyle={{
        width:"100%",
        height:"400px"
      }}

    >

      <Marker
        position={{
          lat: latitude,
          lng: longitude
        }}
      />

    </GoogleMap>

  );

}

export default GoogleMapTracker;