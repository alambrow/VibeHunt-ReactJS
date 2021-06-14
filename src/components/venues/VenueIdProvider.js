import React, {useState, createContext} from "react"

export const VenueIdContext = createContext()

export const VenueIdProvider = (props) => {
    const [venueIds, setVenueIds] = useState([])

    const getVenueIds = () => {
        
        const params1 = new URLSearchParams({ 
            'api_key_private': 'pri_e7ab8374874143aaae6415180cd5c322',
          });

        return fetch(`https://besttime.app/api/v1/collection/col_19ef08a2f1fe4224a0677e8bf16fa82b?${params1}`, {
            method: 'GET'
            })
            .then(res => res.json())
            .then(function(data) {
                setVenueIds(data.venue_ids)
            })
    }

    return (
        <VenueIdContext.Provider value={{
            venueIds, getVenueIds
        }}>
            {props.children}
        </VenueIdContext.Provider>
    )
}