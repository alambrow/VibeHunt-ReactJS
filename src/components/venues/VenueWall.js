import React, { useContext, useEffect } from "react"
import { VenueDetail } from "./VenueDetail"
import { VenueDetailContext } from "./VenueDetailProvider"


export const VenueWall = () => {
    const { venueDetail, getVenueDetail } = useContext(VenueDetailContext)

    useEffect(() => {
        getVenueDetail()
    }, [])
  
    return (
        <>
            <div className="venues__info">
                {
                    venueDetail.map(venue => {
                        return <VenueDetail venue={venue} />
                    })
                }
            </div>
        </>
    )
}