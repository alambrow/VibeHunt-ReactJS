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
    }, [])


    let venueInfoStorage = []

    useEffect(() => {
        let promises = []
        for (let i = 0; i < venueDetail.length; i++) {
            let venueFetchCall = getVenueInfo(venueDetail[i].venId)
            promises.push(venueFetchCall)
        }
     
        Promise.all(promises)
            .then((data) => {
                venueInfoStorage = data
                setRemoteVenueInfo(data)
                console.log(venueInfoStorage, "local info store")
            })
    }, [venueDetail])

    
    let filteredIdStorage = []

    useEffect(() => {
        let localArray = []
        
        for (let i = 0; i < remoteVenueInfo.length; i++) {
            if (remoteVenueInfo[i].analysis.hour_analysis.intensity_nr === "N/A" || remoteVenueInfo[i].analysis.hour_analysis.intensity_nr === "999") {
                localArray.push(remoteVenueInfo[i].venue_info.venue_id)
            } else {
                localArray.unshift(remoteVenueInfo[i].venue_info.venue_id)
            }
        }
        filteredIdStorage = localArray
        setFilteredVenueIds(localArray)
        console.log(filteredIdStorage, "filtered id store")
    }, [remoteVenueInfo])

    let filteredVenueDetailStorage = []

    useEffect(() => {
        let localArray = []
        for (let i = 0; i < filteredVenueIds.length; i++) {
            for (let n = 0; n < venueDetail.length; n++) {
                if (filteredVenueIds[i] === venueDetail[n].venId) {
                    localArray.push(venueDetail[n])
                }
            }
        }
        filteredVenueDetailStorage = localArray
        setFilteredVenueDetail(localArray)
        console.log(filteredVenueDetailStorage, "filtered venue store")
    }, [filteredVenueIds])
    
    console.log(filteredVenueDetail)
    return (
        <>
            <div className="venues__info">
                {   
                    filteredVenueDetail.map(venue => {
                        return <VenueDetail venue={venue} />
                    })
                }
            </div>
        </>
    )
}