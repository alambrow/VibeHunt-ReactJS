import React, { useContext, useEffect, useState } from "react"
import { VenueDetail } from "./VenueDetail"
import { VenueDetailContext } from "./VenueDetailProvider"
import { VenueInfoContext } from "./VenueInfoProvider"
import { Form } from "react-bootstrap";


export const VenueWall = () => {
    const { venueDetail, getVenueDetail } = useContext(VenueDetailContext)
    const { getVenueInfo } = useContext(VenueInfoContext)
    const [ remoteVenueInfo, setRemoteVenueInfo ] = useState([])
    const [ filteredVenueIds, setFilteredVenueIds ] = useState([])
    const [ filteredVenueDetail, setFilteredVenueDetail] = useState([])
    const [ isSwitchOn, setIsSwitchOn ] = useState(false);
   
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
        
        const sortedVenueInfo = remoteVenueInfo

        sortedVenueInfo.sort(function (a, b) {
            return b.analysis.hour_analysis.intensity_nr - a.analysis.hour_analysis.intensity_nr;
        })

        console.log(sortedVenueInfo, "sorted ven info")

        // TODO: set up condition associated with Vibe Switch
       
        if (isSwitchOn === true) {
            for (let i = 0; i < sortedVenueInfo.length; i++) {
                if (sortedVenueInfo[i].analysis.hour_analysis.intensity_nr === "N/A" || sortedVenueInfo[i].analysis.hour_analysis.intensity_nr === "999" || sortedVenueInfo[i].analysis.hour_analysis.intensity_nr === "2") {
                    localArray.push(sortedVenueInfo[i].venue_info.venue_id)
                } else {
                    localArray.unshift(sortedVenueInfo[i].venue_info.venue_id)
                }
            }
        } else {
            for (let i = 0; i < sortedVenueInfo.length; i++) {
                if (sortedVenueInfo[i].analysis.hour_analysis.intensity_nr === "N/A" || sortedVenueInfo[i].analysis.hour_analysis.intensity_nr === "999") {
                    localArray.push(sortedVenueInfo[i].venue_info.venue_id)
                } else {
                    localArray.unshift(sortedVenueInfo[i].venue_info.venue_id)
                }
            }
        }
        
        

        filteredIdStorage = localArray
        setFilteredVenueIds(localArray)
        console.log(filteredIdStorage, "filtered id store")
    }, [remoteVenueInfo, isSwitchOn])

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

    const onSwitchAction = () => {

        if (isSwitchOn === false) {
            setIsSwitchOn(true)
        } else {
            setIsSwitchOn(false)
        }

    }

    return (
        <>
                <Form>
                    <Form.Check 
                        type="switch"
                        id="custom-switch"
                        onChange={onSwitchAction}
                        label="Toggle Cool Mode"
                    />
                </Form>
            <div className={isSwitchOn ? "venues__info__cool" : "venues__info"}>
                {   
                    filteredVenueDetail.map(venue => {
                        return <VenueDetail venue={venue} />
                    })
                }
            </div>
        </>
    )
}