import React, { useContext, useEffect } from "react"
import { VenueIdContext } from "./VenueIdProvider"
import { VenueDetail } from "./VenueDetail"

export const VenueWall = () => {
    const { venueIds, getVenueIds } = useContext(VenueIdContext)
    
    useEffect(() => {
        getVenueIds()
        console.log(venueIds)
    }, [venueIds])

  
    return (
        <>
            <div className="venues__live">
                {
                    venueIds.map(venueId => {
                        return <VenueDetail venueId={venueId} />
                    })
                }
            </div>
        </>
    )
}