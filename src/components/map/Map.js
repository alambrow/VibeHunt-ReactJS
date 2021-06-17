import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Component } from 'react';
 
export class MapContainer extends Component {
  render() {

    const style = {
      width: '100vw',
      height: '100vh'
    }

    return (
      <div className="gmap" style={style}>
        <Map google={this.props.google} zoom={14}>
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />
          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
                <h1>hi</h1>
              </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyAGwi9FhPSDknEtWGHJA7r36wEg9TwhC8Y')
})(MapContainer)