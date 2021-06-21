import React, { useContext, useEffect, useState } from "react"
import { VenueInfoContext } from "./VenueInfoProvider"
import { FavoritesContext } from "../favorites/FavoritesProvider"
import "./venues.css"
import { Dropdown, ProgressBar } from "react-bootstrap";
import { UserContext } from "../auth/UserProvider";
import { ShareContext } from "../shared/ShareProvider";
import { NoteContext } from "../notes/NoteProvider";
import { Accordion, Card, Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";


export const VenueDetail = ({venue}) => {
    const { getVenueInfo } = useContext(VenueInfoContext)
    const { favorites, addVenueToFavorites, getFavorites, removeFavorite } = useContext(FavoritesContext)
    const [ localVenueState, setLocalVenueState ] = useState({})
    const { users, getUsers } = useContext(UserContext)
    const { addShare, shares, getShares, removeShare } = useContext(ShareContext)
    const { notes, addNote, getNotes, deleteNote, updateNote } = useContext(NoteContext)

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

    const history = useHistory()

    const intensity = parseInt(localVenueState.intensity_nr)
    let intensity_display = 0

    if (intensity === 2) {
        intensity_display = 100
    } else if (intensity === 1) {
        intensity_display = 80
    } else if (intensity === 0) {
        intensity_display = 60
    } else if (intensity === -1) {
        intensity_display = 40
    } else if (intensity === -2) {
        intensity_display = 20
    } else {
        intensity_display = 5
    }

    // Code for Favoriting
    const showFavoriteButton = (venueId) => {
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].venueId === venueId && favorites[i].userId === parseInt(localStorage.getItem("vibehunt_memberId"))) {
                return (
                    <button className="unfav_button" onClick={event => {
                        event.preventDefault()
                        handleUnfavoriteVenue(parseInt(favorites[i].id))
                    }}>Remove Favorite</button>
                )
            }
        }
        return (
            <button className="fav_button" onClick={event => {
                event.preventDefault()
                handleFavoriteVenue(venueId)
            }}>Favorite</button>
          
        )
    }

    const handleFavoriteVenue = (venueId) => {
        addVenueToFavorites({
            userId: parseInt(localStorage.getItem("vibehunt_memberId")),
            venueId: parseInt(venueId)
        })
    }

    const handleUnfavoriteVenue = (favoriteId) => {
        removeFavorite(favoriteId)
    }

    // Code for share button/creating shares
    const displayUserDropdownItems = () => {

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
                htmlX += "[X]"
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
        alert("Shared!")
    }


    const saveNote = (venueID) => {
            if (document.querySelector(`input[name='${venueID}']`).value === "") {
                document.querySelector(`input[name='${venueID}']`).style.background = "#fc7878"
                return
            } else {
                addNote({
                    userId: parseInt(localStorage.getItem("vibehunt_memberId")),
                    venueId: venueID,
                    note: document.querySelector(`input[name='${venueID}']`).value,
                })
            }
            
    }

 

    const displayEditNoteButton = (noteObj) => {
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].userId === parseInt(localStorage.getItem("vibehunt_memberId"))) {
                return (
                    <button className="note_delete_button" onClick={event => {
                        event.preventDefault()
                        handleShowModal()
                    }
                    }>Edit</button>
                )
            }
        }
    }

    

    const handleShowModal = (noteObj) => {
   
    }

    const displayRemoveNoteButton = (noteObj) => {
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].userId === parseInt(localStorage.getItem("vibehunt_memberId"))) {
                return (
                    <button className="note_delete_button" onClick={ event => {
                        event.preventDefault()
                        removeNote(noteObj.id)
                    }}>Delete</button>
                )
            }
        }
    }

    const removeNote = (noteId) => {
        deleteNote(noteId)
    }
    
    const displaySavedNote = (venueId) => {
        let localNotes = []

        for (let i = 0; i < notes.length; i++) {
            if (notes[i].venueId === venueId) {
                localNotes.push(notes[i])
            }
        }

        return (
            <>
            {
                localNotes.map((note) => {

                    let Username = "nomen nescio"
                    for (let i = 0; i < users.length; i++) {
                        if (parseInt(users[i].id) === parseInt(note.userId)) {
                            Username = users[i].userName
                        }
                    }
                    
                    return (
                        <div className="note_card">
                            <div className="note_user">{Username}:</div>
                            <div id={note.id} className="note_txt">{note.note}</div>
                            <div className="note_edit_button">{displayEditNoteButton(note)}</div>
                            <div className="note_remove_button">{displayRemoveNoteButton(note)}</div>
                        </div>
                    )
                })
            }
            </>
        )
    }


    const [venAdd,] = venue.address.split(",")
    return (
        <div className="venue_card">
        <div className="venue_name">{venue.name}</div>
        <div className="venue_address">{venAdd}</div>
        <div className="venue_open">Current business: {localVenueState.intensity_txt}</div>
        <div className="venue_vibe">
            <ProgressBar animated now={intensity_display} variant="info" />
        </div>
        <div className="venue_buttons_flex">
            <div className="favorite_button">{showFavoriteButton(venue.id)}</div>
            <div className="share_dropdown">{displayUserDropdownItems()}</div>
        </div>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                    Add a note
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>

                    <form className="venue_notes" >
                        <input name={venue.id}
                            className="form-control"
                            placeholder="Notes"
                        />
                        <button 
                            onClick={event => {
                                event.preventDefault()
                                saveNote(venue.id)
                                history.push("/")
                            }}>Append Note</button>
                    </form>

                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                    Appended notes
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <div clasName="saved_notes">{displaySavedNote(venue.id)}</div>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                </Accordion>
        </div>
    )
}