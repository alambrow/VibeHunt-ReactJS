import React, {useState, createContext} from "react"

export const VenueInfoContext = createContext()

export const VenueInfoProvider = (props) => {
    const [venueInfo, setVenueInfo] = useState([])

    const getVenueInfo = venueId => {
          
        fetch(`https://besttime.app/api/v1/venues/${venueId.toString()}?api_key_public=pub_729871213bc2453cbe7c684c66d4288f`, {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            setVenueInfo(data)
        //     let applicationState = {
        //         data: []
        //       }
        //   applicationState.data = data
        //   console.log(applicationState.data.venue_info.venue_name)
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