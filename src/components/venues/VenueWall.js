import React, { useContext, useEffect } from "react"
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
                        return <>{venue.name}</>
                    })
                }
            </div>
        </>
    )
}