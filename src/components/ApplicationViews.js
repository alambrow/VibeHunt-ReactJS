import React from "react"
import { Route } from "react-router-dom"
import { VenueWall } from "./venues/VenueWall";
import { VenueInfoProvider } from "./venues/VenueInfoProvider";
import { VenueDetailProvider } from "./venues/VenueDetailProvider";
import { Favorites } from "./favorites/Favorites";
import { FavoritesProvider } from "./favorites/FavoritesProvider";
import { UserProvider } from "./auth/UserProvider";

export const ApplicationViews = () => {
    return (
        <>
            <VenueDetailProvider>
                <UserProvider>
                    <VenueInfoProvider>
                        <FavoritesProvider>
                            <Route exact path="/">
                                <VenueWall />
                            </Route>
                            
                            <Route exact path="/favorites">
                                <Favorites />
                            </Route>
                        </FavoritesProvider>
                    </VenueInfoProvider>
                </UserProvider>
            </VenueDetailProvider>

        </>
    )
}