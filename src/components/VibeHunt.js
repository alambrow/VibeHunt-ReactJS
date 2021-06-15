import React from "react";
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Route, Redirect } from "react-router-dom";
import { NavBar } from "./nav/NavBar";
import { UserProvider } from "./auth/UserProvider";
import { ApplicationViews } from "./ApplicationViews";

export const VibeHunt = () => (
    <>
    
    <Route 
        render={() => {
            if (localStorage.getItem("vibehunt_memberId")) {
                return (
                    <>
                    <NavBar />
                    <ApplicationViews />
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