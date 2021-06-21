import React from "react"
import { Route } from "react-router-dom"
import { VenueWall } from "./venues/VenueWall";
import { VenueInfoProvider } from "./venues/VenueInfoProvider";
import { VenueDetailProvider } from "./venues/VenueDetailProvider";
import { Favorites } from "./favorites/Favorites";
import { FavoritesProvider } from "./favorites/FavoritesProvider";
import { UserProvider } from "./auth/UserProvider";
import { ShareProvider } from "./shared/ShareProvider";
import { Shares } from "../components/shared/Shares";
import { NoteProvider } from "./notes/NoteProvider";
import { NavBar } from "../components/nav/NavBar";
import { MyMapComponent } from "./map/Map";

export const ApplicationViews = () => {
    return (
        <>

            <VenueDetailProvider>
                <UserProvider>
                    <VenueInfoProvider>
                        <FavoritesProvider>
                            <ShareProvider>
                                <NoteProvider>
                                    <NavBar />
                                    <Route exact path="/">
                                        <VenueWall />
                                        
                                    </Route>
                                    
                                    <Route exact path="/favorites">
                                        <Favorites />
                                    </Route>

                                    <Route exact path="/shared_venues">
                                        <Shares />
                                    </Route>
                                </NoteProvider>
                            </ShareProvider>
                        </FavoritesProvider>
                    </VenueInfoProvider>
                </UserProvider>
            </VenueDetailProvider>

        </>
    )
}