import React, { useContext, useState, useEffect} from "react";
import { UserContext } from "../auth/UserProvider";

export const ProfileForm = () => {
    const { getUserById } = useContext(UserContext)
    const [ user, setUser ] = useState({})


    useEffect(() => {
        getUserById(parseInt(localStorage.getItem("vibehunt_memberId")))
    }, [])

    console.log(user)

    return (
        <>
        <div>
        hi
        </div>
        </>
    )
}