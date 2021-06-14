import React, { useContext, useEffect, useState } from "react"
import { VenueInfoContext } from "./VenueInfoProvider"

export const VenueDetail = ({venueId}) => {
    const { venueInfo, getVenueInfo } = useContext(VenueInfoContext)
    const [ localVenueInfo, setRemoteInfo ] = useState([])

    useEffect(() => {
        debugger
        getVenueInfo(venueId)
    }, [venueId])
    
    return (
        <> 
        <div>{venueInfo}</div>
        </>
    )
} 