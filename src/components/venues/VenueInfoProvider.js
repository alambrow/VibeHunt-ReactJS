import React, {useState, createContext} from "react"

export const VenueInfoContext = createContext()

export const VenueInfoProvider = (props) => {
    const [venueInfo, setVenueInfo] = useState({venue_info: {}})

    const getVenueInfo = venueId => {
        return fetch(`https://besttime.app/api/v1/venues/${venueId.toString()}?api_key_public=pub_fdcfd27793b147a5902272b29478eef4`, {method: 'GET'})
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