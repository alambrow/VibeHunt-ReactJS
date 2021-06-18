import React, { useContext, useEffect, useState } from "react"
import { VenueInfoContext } from "./VenueInfoProvider"
import { FavoritesContext } from "../favorites/FavoritesProvider"
import "./venues.css"
import { Dropdown } from "react-bootstrap";
import { UserContext } from "../auth/UserProvider";
import { ShareContext } from "../shared/ShareProvider";
import { NoteContext } from "../notes/NoteProvider";


export const VenueDetail = ({venue}) => {
    const { getVenueInfo } = useContext(VenueInfoContext)
    const { favorites, addVenueToFavorites, getFavorites, removeFavorite } = useContext(FavoritesContext)
    const [ localVenueState, setLocalVenueState ] = useState({})
    const { users, getUsers } = useContext(UserContext)
    const { addShare, shares, getShares, removeShare } = useContext(ShareContext)
    const { notes, addNote, getNotes, deleteNote } = useContext(NoteContext)

    useEffect(() => {
        getVenueInfo(venue.venId).then((data) => {
            setLocalVenueState(data.analysis.hour_analysis)
        })
    }, [])
   
    useEffect(() => {
        getFavorites()
    }, [])

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        getShares()
    }, [])

    useEffect(() => {
        getNotes()
    }, [])

    const intensity = parseInt(localVenueState.intensity_nr)
    let intensity_display = ""

    if (intensity <= 333) {
        intensity_display += '***'
    } else if (intensity <= 666) {
        intensity_display += "**"
    } else {
        intensity_display += "*"
    }

    // Code for Favoriting
    const showFavoriteButton = (venueId) => {
        for (let i = 0; i < favorites.length; i++){
            if (favorites[i].venueId === venueId && favorites[i].userId === localStorage.getItem("vibehunt_memberId")) {
                return (
                    <button className="unfav_button" onClick={event => {
                        event.preventDefault()
                        handleUnfavoriteVenue(venue.id)
                    }}>Remove Favorite</button>
                )
            }
        }
        return (
            <button className="fav_button" onClick={event => {
                event.preventDefault()
                handleFavoriteVenue(venue.id)
            }}>Favorite</button>
          
        )
    }

    const handleFavoriteVenue = (venueId) => {
        for (let i = 0; i < favorites.length; i++){
            if (favorites[i].venueId === venueId && favorites[i].userId === localStorage.getItem("vibehunt_memberId")) {
                return
            }
        }
        addVenueToFavorites({
            userId: localStorage.getItem("vibehunt_memberId"),
            venueId: venueId,
        })
    }

    const handleUnfavoriteVenue = (venueId) => {
        removeFavorite(venueId)
    }

    // Code for share button/creating shares
    const displayUserDropdownItems = (venueId) => {

        let usersArray = []

        for (let i = 0; i < users.length; i++) {
            if (users[i].id != parseInt(localStorage.getItem("vibehunt_memberId"))) {
                usersArray.push(users[i])
            }
        }

        return (
        <Dropdown id="vibehunt_dropdown"
        onSelect={handleSelect}
        >
        <Dropdown.Toggle variant="success" id="dropdown-basic">
                Share
        </Dropdown.Toggle>
            <Dropdown.Menu id="dropdown-background">
                {usersArray.map(userListItem)}
            </Dropdown.Menu>
        </Dropdown>
        )
    }

    const userListItem = (user) => {

        let htmlX = ""
        for (let i = 0; i < shares.length; i++) {
            if (shares[i].recipientId === parseInt(user.id) && shares[i].venueId) {
                htmlX += "X"
            }
        }

        return (
            <>
            <Dropdown.Item className="dropdown-item" eventKey={user.id}>{user.userName}  {htmlX}</Dropdown.Item>
            <Dropdown.Divider />
            </>
            )
        
    }

    const handleSelect = (e) => {
        for (let i = 0; i < shares.length; i++) {
            if (shares[i].recipientId === parseInt(e) && shares[i].venueId === venue.id) {
                removeShare(shares[i].id)
                alert("Share deleted.")
                return
            }
        }
        addShare({
            userId: parseInt(localStorage.getItem("vibehunt_memberId")),
            recipientId: parseInt(e),
            venueId: venue.id
        })
        alert(`Shared!`)
    }


    const saveNote = (venueID) => {

        if (document.querySelector("input[name='ven_notes']").value === "") {
            document.querySelector("input[name='ven_notes']").style.background = "#fc7878"
            alert("Please add a note.")
            return
        } else {
            addNote({
                userId: parseInt(localStorage.getItem("vibehunt_memberId")),
                venueId: venueID,
                note: document.querySelector("input[name='ven_notes']").value,
            })
        }
    }

    const removeNote = (noteId) => {
        deleteNote(noteId)
    }

    const displaySavedNote = (venueId) => {
        let localNotes = []

        for (let i = 0; i < notes.length; i++) {
            if (notes[i].userId === parseInt(localStorage.getItem("vibehunt_memberId")) && notes[i].venueId === venueId) {
                localNotes.push(notes[i])
            }
        }

        return (
            <>
            {localNotes.map(noteObj => (
                <div className="note">{noteObj.note}
                <button onClick={event => {
                    event.preventDefault()
                    removeNote(noteObj.id)}}>
                    Delete
                </button>
                </div>
            ))}
            </>
        )
    }


    const [venAdd,] = venue.address.split(",")
    return (
        <div className="venue_card">
        <div className="venue_name">{venue.name}</div>
        <div className="venue_address">{venAdd}</div>
        <div className="venue_open">{localVenueState.intensity_txt}</div>
        <div className="venue_vibe">Current Vibe: {intensity_display}</div>
        <div className="venue_buttons_flex">
            <div className="favorite_button">{showFavoriteButton(venue.id)}</div>
            <div className="share_dropdown">{displayUserDropdownItems(venue.id)}</div>
        </div>
        <form className="venue_notes" >
            <input name="ven_notes" 
                id="venueNote"
                className="form-control"
                placeholder="Notes"
            />
            <button 
                onClick={event => {
                    event.preventDefault()
                    saveNote(venue.id)
                }}>Append Note</button>
        </form>
            <div clasName="saved_notes">{displaySavedNote(venue.id)}</div>
        </div>
    )
}