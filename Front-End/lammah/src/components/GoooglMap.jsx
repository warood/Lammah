import API_URL from '../apiConfig.js'
import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import axios from "axios";
import { useParams } from "react-router-dom";

const handleApiLoaded = (map, maps) => {
  // use map and maps objects
};
function GoooglMap() {
  let { id } = useParams();

  const [marker, setMarker] = React.useState({
    getLat: 44.57043310909312,
    getLen: 46.5060904037667,
  });
  const [cantChange, setCantchangr] = React.useState(true);
  //const myLocation = "https://goo.gl/maps/JZS6aSpaY2hLbGdq7"
  const getLat = 25.57043310909312;
  const getLen = 46.5060904037667;

  // function handleMarkerClick(obj){ console.log(obj.x, obj.y, obj.lat, obj.lng, obj.event);}
  var latNew;
  var lngNew;

  React.useEffect(() => {
    if (id) {
      axios.get(`${API_URL}/api/facility/facilities/${id}`)
        .then((data) => {

          setMarker({ getLat: data.data.facility.location.lat, getLen: data.data.facility.location.lng });
          setCantchangr(false);
        });
    }
  }, []);

  function onClick(address) {
    //const { latLng } = coord;
    latNew = address.latLng.lat();
    lngNew = address.latLng.lng();
    address = address;
    localStorage.setItem(
      "address",
      JSON.stringify({ lat: address.latLng.lat(), lng: address.latLng.lng() })
    );
    setMarker({ getLat: latNew, getLen: lngNew });
  }

  return (
    <GoogleMap
      defaultZoom={5}
      defaultCenter={{ lat: getLat, lng: getLen }}
      onClick={(e) => (cantChange ? onClick(e) : "")}
    >
      <Marker
        position={{ lat: marker.getLat, lng: marker.getLen }}
      />
    </GoogleMap>
  );
}
const WrappedMap = withScriptjs(withGoogleMap(GoooglMap));
export default WrappedMap;
