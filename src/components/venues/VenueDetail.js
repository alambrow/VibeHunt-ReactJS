import React, { useContext, useEffect, useState } from "react"
import { VenueInfoContext } from "./VenueInfoProvider"

export const VenueDetail = ({venue}) => {
    const { getVenueInfo } = useContext(VenueInfoContext)
    const [localVenueState, setLocalVenueState] = useState({})

    useEffect(() => {
        getVenueInfo(venue.id).then((data) => {
            setLocalVenueState(data)
        })
    }, [])

    return (
        <div className="local_state">
            {venue.name} {venue.address}
        </div>
    )
}