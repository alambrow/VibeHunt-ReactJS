import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
    render() {
      return (
        <Map google={this.props.google} zoom={14}>
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />
        </Map>
      );
    }
  }
   
  export default GoogleApiWrapper({
    apiKey: ('AIzaSyAGwi9FhPSDknEtWGHJA7r36wEg9TwhC8Y')
  })(MapContainer)