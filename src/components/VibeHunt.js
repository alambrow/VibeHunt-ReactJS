import React from "react";
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Route, Redirect } from "react-router-dom";
import { NavBar } from "./nav/NavBar";
import { UserProvider } from "./auth/UserProvider";
import { VenueWall } from "./venues/VenueWall";
import { VenueIdProvider } from "./venues/VenueIdProvider";
import { VenueInfoProvider } from "./venues/VenueInfoProvider";

export const VibeHunt = () => (
    <>
    <NavBar />
    
    <Route 
        render={() => {
            if (localStorage.getItem("vibehunt_memberId")) {
                return (
                <>
                    <h1>VibeHunt, hiiii</h1>
                    <VenueIdProvider>
                        <VenueInfoProvider>
                            <VenueWall />
                        </VenueInfoProvider>
                    </VenueIdProvider>
                </>
            );
            } else {
                return <Redirect to="/login" />;
            }
        }}
    />

    <UserProvider>
        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
    </UserProvider>
    </>
)