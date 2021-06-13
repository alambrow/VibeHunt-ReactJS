import React from "react";
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Route, Redirect } from "react-router-dom";
import { NavBar } from "./nav/NavBar";

export const VibeHunt = () => (
    <>
    <NavBar />
    
    <Route 
        render={() => {
            if (localStorage.getItem("vibehunt_memberId")) {
                return (
                <>
                    <h1>VibeHunt, hiiii</h1>
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