import React, {useState, createContext} from "react"

export const VenueDetailContext = createContext()

export const VenueDetailProvider = (props) => {
    const [venueDetail, setVenueDetail] = useState([])

    const getVenueDetail = () => {
        return fetch("http://localhost:8088/venues")
        .then(res => res.json())
        .then(data => {
            setVenueDetail(data)
        })
    }

    return (
        <VenueDetailContext.Provider value={{
            venueDetail, getVenueDetail
        }}>
            {props.children}
        </VenueDetailContext.Provider>
    )
}