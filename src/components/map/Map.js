import React from 'react';
import googleMapReact from 'google-map-react';

export const Map = ({ location }) => (
    <div className="map">
        <googleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyAGwi9FhPSDknEtWGHJA7r36wEg9TwhC8Y' }}
            defaultCenter={location}
            defaultZoom={15}
        />
    </div>
)