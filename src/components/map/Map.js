import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

export const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDPylV5jpvE-KR6gSprY04JvFglLMuDnME&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `15rem`, width: `15rem` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap 
    defaultZoom={16} 
    defaultCenter={{ lat: 36.1513, lng: -86.7941 }}
  >
    {props.isMarkerShown && (
      <Marker position={props.marker} />
    )}
  </GoogleMap>
));