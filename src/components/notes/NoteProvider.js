import React, { useState, createContext } from "react";

export const NoteContext = createContext()

export const NoteProvider = (props) => {
    const [ notes, setNotes ] = useState([])

    const addNote = noteObj => {
        return fetch("http://localhost:8088/userNotes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(noteObj)
        })
        .then(getNotes)
    }

    const deleteNote = noteId => {
        return fetch(`http://localhost:8088/userNotes/${noteId}`, {
            method: "DELETE"
        })
        .then(getNotes)
    }

    const getNotes = () => {
        return fetch("http://localhost:8088/userNotes")
        .then(res => res.json())
        .then(setNotes)
    }

    return (
        <NoteContext.Provider value={{
            notes, addNote, getNotes, deleteNote
        }}>
            {props.children}
        </NoteContext.Provider>
    )
}