import { useContext, useEffect, useState } from "react"
import { VenueDetailContext } from "../venues/VenueDetailProvider"
import { VenueDetail } from "../venues/VenueDetail"
import { ShareContext } from "./ShareProvider"
import "./shares.css"

export const Shares = () => {
    const { shares, getShares } = useContext(ShareContext)
    const { venueDetail, getVenueDetail } = useContext(VenueDetailContext)
    const [sharedWithMe, setSharedWithMe] = useState([])
    const [localVenueDetail, setLocalVenueDetail] = useState([])
    const [myShares, setMyShares] = useState([])
    const [mySharesArray, setMySharesArray] = useState([])

    useEffect(() => {
        getShares()
    }, [])

    useEffect(() => {
        getVenueDetail()
    }, [])
    
    useEffect(() => {
        let shareWithMe = []
        for (let i = 0; i < shares.length; i++) {
            if (shares[i].recipientId === parseInt(localStorage.getItem("vibehunt_memberId"))) {
                shareWithMe.push(shares[i])
            }
        }
        setSharedWithMe(shareWithMe)
    }, [shares])

    useEffect(() => {
        let localVenDetail = []
        
        for (let i = 0; i < sharedWithMe.length; i++) {
            for (let n = 0; n < venueDetail.length; n++) {
                if (sharedWithMe[i].venueId === venueDetail[n].id) {
                    localVenDetail.push(venueDetail[n])
                }
            }
        }
        setLocalVenueDetail(localVenDetail)
    }, [sharedWithMe])

    useEffect(() => {
        let my_Shares = []
    
        for (let i = 0; i < shares.length; i++) {
            if (shares[i].userId === parseInt(localStorage.getItem("vibehunt_memberId"))) {
                my_Shares.push(shares[i])
            }
        }
        setMyShares(my_Shares)
    }, [shares])

    useEffect(() => {
        let my_SharesArray1 = []
        let my_SharesArray2 = []
        for (let i = 0; i < myShares.length; i++) {
            for (let n = 0; n < venueDetail.length; n++) {
                if (myShares[i].venueId === venueDetail[n].id) {
                    my_SharesArray1.push(venueDetail[n])
                }
            }
        }

        // for (let i = 0; i < my_SharesArray1.length; i++) {
        //     debugger
        //     if (my_SharesArray1[i].venId == my_SharesArray1[i+1].venId) {
        //         delete my_SharesArray1[i+1]
        //     }
        // }

        for(let i = 0; i < my_SharesArray1.length; i++) {
            if (my_SharesArray2.indexOf(my_SharesArray1[i]) === -1) {
                my_SharesArray2.push(my_SharesArray1[i])
            }
        }

        setMySharesArray(my_SharesArray2)
    }, [myShares])

    return (
        <>
        <div className="shares_wall">
            <div className="fav_venues_sharedWithMe">Shared with Me</div>
                {
                    localVenueDetail.map(venue => {
                        return <VenueDetail venue={venue} />
                    })
                }
            <div className="fav_venues_sharedByMe">Shared by Me</div>
                {
                    mySharesArray.map(venue => {
                        return <VenueDetail venue={venue} />
                    })
                }
        </div>
        </>
    )

}