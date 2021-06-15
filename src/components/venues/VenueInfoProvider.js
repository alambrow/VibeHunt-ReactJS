import React, {useState, createContext} from "react"

export const VenueInfoContext = createContext()

export const VenueInfoProvider = (props) => {
    const [venueInfo, setVenueInfo] = useState({})

    const getVenueInfo = venueId => {
        
        const params = new URLSearchParams({ 
            'api_key_public': 'pub_fdcfd27793b147a5902272b29478eef4',
             'venue_id': `${venueId.toString()}`,
         });

        return fetch(`https://besttime.app/api/v1/forecasts/now?${params}`, {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            setVenueInfo(data)
        })
    }

    return (
        <VenueInfoContext.Provider value={{
            getVenueInfo
        }}>
            {props.children}
        </VenueInfoContext.Provider>
    )
}