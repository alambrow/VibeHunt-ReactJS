import React from "react"
import { VenueWall } from "./venues/VenueWall";
import { VenueInfoProvider } from "./venues/VenueInfoProvider";
import { VenueDetailProvider } from "./venues/VenueDetailProvider";

export const ApplicationViews = () => {
    return (
        <>
            <VenueDetailProvider>
                <VenueInfoProvider>
                    <VenueWall />
                </VenueInfoProvider>
            </VenueDetailProvider>
        </>
    )
}