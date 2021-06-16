import React, { useContext, useEffect, useState } from "react"
import { VenueInfoContext } from "./VenueInfoProvider"
import { Map } from "../map/Map"

export const VenueDetail = ({venue}) => {
    const { getVenueInfo } = useContext(VenueInfoContext)
    const [localVenueState, setLocalVenueState] = useState({})

    useEffect(() => {
        getVenueInfo(venue.venId).then((data) => {
            debugger
            setLocalVenueState(data.analysis.hour_analysis)
        })
    }, [])
   

    const location = {
        address: '1600 Amphitheatre Parkway, Mountain View, california.',
        lat: parseInt(venue.lat),
        lng: parseInt(venue.long),
      }

    return (
        <div className="venue_card">
        <div className="venue_name">{venue.name}</div>
        <div className="venue_address">{venue.address}</div>
        <div className="venue_analysis"></div>
        <div>{localVenueState.intensity_nr}</div>
        </div>
    )
}