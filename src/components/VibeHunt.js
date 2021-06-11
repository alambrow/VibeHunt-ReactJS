import React from "react";
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Route, Redirect } from "react-router-dom";
import { NavBar } from "./nav/NavBar";

export const VibeHunt = () => (
    <>
    <h1>VibeHunt</h1>
    <Route 
        render={() => {
            if (localStorage.getItem("vibehunt_memberId")) {
                return (
                <>
                    <NavBar />
                </>
            );
            } else {
                return <Redirect to="/login" />;
            }
        }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
    </>
)