import React, { useContext, useEffect, useState } from "react"
import { VenueInfoContext } from "./VenueInfoProvider"
import { FavoritesContext } from "../favorites/FavoritesProvider"
import "./venues.css"
import { Dropdown, ProgressBar } from "react-bootstrap";
import { UserContext } from "../auth/UserProvider";
import { ShareContext } from "../shared/ShareProvider";
import { NoteContext } from "../notes/NoteProvider";
import { Accordion, Card, Modal, Button } from "react-bootstrap";
import { MyMapComponent } from "../map/Map";


export const VenueDetail = ({venue}) => {
    const { getVenueInfo } = useContext(VenueInfoContext)
    const { favorites, addVenueToFavorites, getFavorites, removeFavorite } = useContext(FavoritesContext)
    const { users, getUsers } = useContext(UserContext)
    const { addShare, shares, getShares, removeShare } = useContext(ShareContext)
    const { notes, addNote, getNotes, deleteNote, updateNote } = useContext(NoteContext)
    const [ localVenueState, setLocalVenueState ] = useState({})

    useEffect(() => {
        getVenueInfo(venue.venId).then((data) => {
            setLocalVenueState(data.analysis.hour_analysis)
        })
    }, [venue])
   
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

    const [intensity_display, SetItensity_display] = useState([])

    useEffect(() => {
        const intensity = parseInt(localVenueState.intensity_nr)
        if (intensity === 2) {
            SetItensity_display(100)
        } else if (intensity === 1) {
            SetItensity_display(80)
        } else if (intensity === 0) {
            SetItensity_display(60)
        } else if (intensity === -1) {
            SetItensity_display(40)
        } else if (intensity === -2) {
            SetItensity_display(20)
        } else {
            SetItensity_display(5)
        }
    })

    // Code for Favoriting
    const showFavoriteButton = (venueId) => {
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].venueId === venueId && favorites[i].userId === parseInt(localStorage.getItem("vibehunt_memberId"))) {
                return (
                    <button className="unfav_button" onClick={event => {
                        event.preventDefault()
                        handleUnfavoriteVenue(parseInt(favorites[i].id))
                    }}>Unfavorite</button>
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
            if (users[i].id !== parseInt(localStorage.getItem("vibehunt_memberId"))) {
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

 

    const [show, setShow] = useState(false);
    const displayEditNoteButton = (noteObj) => {


        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const editNote = () => {
            if (document.querySelector(`input[name='note_edit']`).value === "") {
                return
            } else {
                updateNote({
                    id: noteObj.id,
                    venueId: noteObj.venueId,
                    userId: parseInt(localStorage.getItem("vibehunt_memberId")),
                    note: document.querySelector(`input[name='note_edit']`).value
                })
                setShow(false)
            }
        }

        for (let i = 0; i < notes.length; i++) {
            if (notes[i].userId === parseInt(localStorage.getItem("vibehunt_memberId"))) {
                return (
                    <>
                    <button className="note_editMe_button" onClick={handleShow}>Edit</button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Body>
                        <form className="venue_notes" >
                            <input name="note_edit"
                                className="form-control"
                                placeholder={noteObj.note}
                            />
                        </form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary" onClick={editNote}>
                            Save Changes
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    </>
                )
            }
        }
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

    // const [venLat, setVenLat] = useState([])
    // const [venLong, setVenLong] = useState([])
    const [venAdd, setVenAdd] = useState([])
    const [positObj, setPositObj] = useState({})

    // useEffect(() => {
    //     setVenLat(venue.lat)
    // }, [venue, localVenueState])

    // useEffect(() => {
    //     setVenLong(venue.long)
    // }, [venue, localVenueState])
    
    useEffect(() => {
        const [venAddress,] = venue.address.split(",")
        setVenAdd(venAddress)
    }, [venue])

    useEffect(() => {
        let thisLocat = {
            lat: venue.lat,
            lng: venue.long
        }
        setPositObj(thisLocat)
    }, [venue])

    
    const renderMap = (pObj) => {
        return (
            <MyMapComponent marker={pObj} key={new Date().getTime()} />
        )
    }

    return (
        <div className="venue_card">
            {renderMap(positObj)}
            <div className="venue_name">{venue.name}</div>
            <div className="venue_address">{venAdd}</div>
            <div className="venue_open">Current vibe: {localVenueState.intensity_txt}</div>
                <div className="venue_vibe">
                    <ProgressBar animated now={intensity_display} variant="warning" />
                </div>
                <div className="venue_buttons_flex">
                    <div className="favorite_button">{showFavoriteButton(venue.id)}</div>
                    <div className="share_dropdown">{displayUserDropdownItems()}</div>
                </div>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                        What's the vibe?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>

                        <form className="venue_notes" >
                            <input name={venue.id}
                                className="form-control"
                                placeholder="current vibe"
                            />
                            <button className="add_note_button"
                                onClick={event => {
                                    event.preventDefault()
                                    saveNote(venue.id)
                                }}>Add Note</button>
                        </form>

                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                        User Notes
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