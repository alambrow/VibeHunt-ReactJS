import React from "react";
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Route, Redirect } from "react-router-dom";
import { NavBar } from "./nav/NavBar";
import { UserProvider } from "./auth/UserProvider";
import { VenueWall } from "./venues/VenueWall";
import { VenueInfoProvider } from "./venues/VenueInfoProvider";
import { VenueDetailProvider } from "./venues/VenueDetailProvider";

export const VibeHunt = () => (
    <>
    
    <Route 
        render={() => {
            if (localStorage.getItem("vibehunt_memberId")) {
                return (
                    <>
                    <NavBar />
                    <h1>VibeHunt, hiiii</h1>
                    <VenueDetailProvider>
                        <VenueInfoProvider>
                            <VenueWall />
                        </VenueInfoProvider>
                    </VenueDetailProvider>
                    
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