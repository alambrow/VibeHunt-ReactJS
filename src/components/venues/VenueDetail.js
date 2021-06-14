import React, { useContext, useEffect, useState } from "react"
import { VenueInfoContext } from "./VenueInfoProvider"

export const VenueDetail = ({venueId}) => {
    const { venueInfo, getVenueInfo } = useContext(VenueInfoContext)
    const [ localVenueInfo, setRemoteInfo ] = useState([])

    useEffect(() => {
        getVenueInfo(venueId)
    }, [])
    
    return (
        <> 
            <div>{venueInfo}</div>
        </>
    )
} 