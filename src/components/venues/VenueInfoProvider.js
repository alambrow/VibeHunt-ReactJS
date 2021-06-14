import React, {useState, createContext} from "react"

export const VenueInfoContext = createContext()

export const VenueInfoProvider = (props) => {
    const [venueInfo, setVenueInfo] = useState([])

    const getVenueInfo = venueId => {
          
          const params = new URLSearchParams({ 
            'api_key_public': 'pub_729871213bc2453cbe7c684c66d4288f',
            'venue_id': venueId.toString(),
          });
          
          fetch(`https://besttime.app/api/v1/forecasts/now?${params}`, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                setVenueInfo(data)
            })
    }

    return (
        <VenueInfoContext.Provider value={{
            venueInfo, getVenueInfo
        }}>
            {props.children}
        </VenueInfoContext.Provider>
    )
}