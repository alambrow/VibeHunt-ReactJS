import React from "react";
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Route, Redirect } from "react-router-dom";


export const VibeHunt = () => (
    <>
    <h1>VibeHunt</h1>
    <Route 
        render={() => {
            if (localStorage.getItem("vibehunt_memberId")) {
                return (
                <>
                   <h2>hiiiii!!!!</h2>
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