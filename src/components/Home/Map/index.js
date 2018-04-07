import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import mapStyle from '../../../styles/covertmap.json'

const Map = ({ disasters }) =>
    <MyMapComponent
        isMarkerShown={true}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDR5Uai7RHVMuveaBzlPYnECg0usXWafZk&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `80vh` }} />}
        disasters={disasters}
    />

export default Map;

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={3}
    defaultCenter={{ lat: 38.627003, lng: -90.199402 }}
    defaultOptions={{ styles: mapStyle }}
  >
    {props.isMarkerShown &&
      props.disasters.map(disaster =>
        <div key={disaster.index}>
          <Marker position={{ lat: parseInt(disaster.lat), lng: parseInt(disaster.lng) }} onMouseOver={() => alert(disaster.name)} />
        </div>
      )}
  </GoogleMap>
))