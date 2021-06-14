import React, { useContext, useEffect } from "react"
import { VenueIdContext } from "./VenueProvider"

export const VenueWall = () => {
    const { venueIds, getVenueIds } = useContext(VenueIdContext)

    useEffect(() => {
        getVenueIds()
        console.log(venueIds)
    }, [])

    

    return (
        <>
            <h1>hi</h1>
            {venueIds}
        </>
    )
}