import { useContext, useEffect } from "react"
import { VenueDetailContext } from "../venues/VenueDetailProvider"
import { VenueDetail } from "../venues/VenueDetail"
import { ShareContext } from "./ShareProvider"

export const Shares = () => {
    const { shares, getShares } = useContext(ShareContext)
    const { venueDetail, getVenueDetail } = useContext(VenueDetailContext)

    useEffect(() => {
        getShares()
    }, [])

    useEffect(() => {
        getVenueDetail()
    }, [])
   
    let sharedWithMe = []

    for (let i = 0; i < shares.length; i++) {
        if (shares[i].recipientId === parseInt(localStorage.getItem("vibehunt_memberId"))) {
            sharedWithMe.push(shares[i])
        }
    }

    let localVenueDetail = []
    
    for (let i = 0; i < sharedWithMe.length; i++) {
        for (let n = 0; n < venueDetail.length; n++) {
            if (sharedWithMe[i].venueId === venueDetail[n].id) {
                localVenueDetail.push(venueDetail[n])
            }
        }
    }
    
    let myShares = []

    for (let i = 0; i < shares.length; i++) {
        if (shares[i].userId === parseInt(localStorage.getItem("vibehunt_memberId"))) {
            myShares.push(shares[i])
        }
    }

    let mySharesArray = []

    for (let i = 0; i < myShares.length; i++) {
        for (let n = 0; n < venueDetail.length; n++) {
            if (myShares[i].venueId === venueDetail[n].id) {
                mySharesArray.push(venueDetail[n])
            }
        }
    }

    return (
        <>
        <div className="fav_venues_title">Shared with Me</div>
            {
                localVenueDetail.map(venue => {
                    return <VenueDetail venue={venue} />
                })
            }
        <div className="fav_venues_title">Shared by Me</div>
            {
                mySharesArray.map(venue => {
                    return <VenueDetail venue={venue} />
                })
            }
        </>
    )

}