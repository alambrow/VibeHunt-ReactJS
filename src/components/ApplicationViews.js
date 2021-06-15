import React from "react"
import { Route } from "react-router-dom"
import { VenueWall } from "./venues/VenueWall";
import { VenueInfoProvider } from "./venues/VenueInfoProvider";
import { VenueDetailProvider } from "./venues/VenueDetailProvider";
import { UserProvider } from "./auth/UserProvider";
import { ProfileForm } from "./profile/ProfileForm";

export const ApplicationViews = () => {
    return (
        <>
            <VenueDetailProvider>
                <VenueInfoProvider>
                    <Route exact path="/">
                        <VenueWall />
                    </Route>
                </VenueInfoProvider>
            </VenueDetailProvider>

            <UserProvider>
                <Route exact path="/my_profile">
                    <ProfileForm />
                </Route>
            </UserProvider>
        </>
    )
}