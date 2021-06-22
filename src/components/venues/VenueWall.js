import React, { useContext, useEffect, useState } from "react"
import { VenueDetail } from "./VenueDetail"
import { VenueDetailContext } from "./VenueDetailProvider"
import { VenueInfoContext } from "./VenueInfoProvider"


export const VenueWall = () => {
    const { venueDetail, getVenueDetail } = useContext(VenueDetailContext)
    const { getVenueInfo } = useContext(VenueInfoContext)
    const [ localVenueState, setLocalVenueState ] = useState({})

    useEffect(() => {
        getVenueDetail()
    }, [])
  
    let venueInfo = []
    let sortedVenueInfo = []

    useEffect(() => {
        
        for (let i = 0; i < venueDetail.length; i++) {
            getVenueInfo(venueDetail[i].venId).then((data) => {
                
                venueInfo.push(data)
                
            })
        }
        console.log(venueInfo)
        
    }, [venueDetail])
    


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