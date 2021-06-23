import React, { useContext, useEffect, useState } from "react"
import { VenueDetail } from "./VenueDetail"
import { VenueDetailContext } from "./VenueDetailProvider"
import { VenueInfoContext } from "./VenueInfoProvider"


export const VenueWall = () => {
    const { venueDetail, getVenueDetail } = useContext(VenueDetailContext)
    const { getVenueInfo } = useContext(VenueInfoContext)
    const [ remoteVenueInfo, setRemoteVenueInfo ] = useState([])
    const [ filteredVenueIds, setFilteredVenueIds ] = useState([])
    const [ filteredVenueDetail, setFilteredVenueDetail] = useState([])
   
    useEffect(() => {
        getVenueDetail()
        console.log(venueDetail, "original ven detail")
    }, [])


    useEffect(() => {
        let localArray = []
        for (let i = 0; i < venueDetail.length; i++) {
            getVenueInfo(venueDetail[i].venId).then((data) => {
                localArray.push(data)
            })
        }
        setRemoteVenueInfo(localArray)
        console.log(remoteVenueInfo, "remote ven info")
    }, [venueDetail])

    
    useEffect(() => {
        let localArray = []
        for (let i = 0; i < remoteVenueInfo.length; i++) {
            if (remoteVenueInfo[i].analysis.hour_analysis.intensity_nr === "N/A" || remoteVenueInfo[i].analysis.hour_analysis.intensity_nr === "999") {
                localArray.push(remoteVenueInfo[i].venue_info.venue_id)
            } else {
                localArray.unshift(remoteVenueInfo[i].venue_info.venue_id)
            }
        }
        setFilteredVenueIds(localArray)
        console.log(filteredVenueIds, "filtered ven ids")
    }, [])

    useEffect(() => {
        let localArray = []
        for (let i = 0; i < filteredVenueIds.length; i++) {
            for (let n = 0; n < venueDetail.length; n++) {
                if (filteredVenueIds[i] === venueDetail[n].venId) {
                    localArray.push(venueDetail[n])
                }
            }
        }
        setFilteredVenueDetail(localArray)
        console.log(filteredVenueDetail, "filtered ven detail")
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