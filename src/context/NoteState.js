
import { useState } from "react"
import NoteContext from "./NoteContext"


const NoteState=(props)=>{
 let a =[]

const [notes,setNotes] = useState(a)

// add notes
const addNotes=async (title,description,tag)=>{

  const response = await fetch('http://localhost:5000/api/notes/addNotes',{

  method:'POST',
  headers: {
    'Content-Type': 'application/json',
    'auth-token' : localStorage.getItem('token')
  },
  body: JSON.stringify({title,description,tag})
  })
  
  
   const note = await response.json()

    setNotes(notes.concat(note))
  

}

// fetch all notes 

const fetchNotes= async()=>{

    const response = await fetch('http://localhost:5000/api/notes/fetchNotes',{

    method:'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token' : localStorage.getItem('token')
     }
    }) 

    const json = await response.json()
    setNotes(json)

}


// delete notes

const deleteNotes=async (id)=>{

   await fetch(`http://localhost:5000/api/notes/deleteNote/${id}`,{

    method:'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'auth-token' : localStorage.getItem('token')
       }
    }) 
    

//   const newNote = notes.filter((notes)=>{return notes._id!==id})

//  setNotes(newNote)
fetchNotes()

}

// update notes

const updateNotes= async(notes)=>{
  
   await fetch(`http://localhost:5000/api/notes/updateNote/${notes.id}`,{

    method:'PUT',
    headers: {
      'Content-Type': 'application/json',
      'auth-token' : localStorage.getItem('token')
       },
    body: JSON.stringify({title:notes.etitle,description:notes.edescription,tag:""})
    }) 

    fetchNotes()

}

    return <NoteContext.Provider value={{notes,addNotes,deleteNotes,updateNotes,fetchNotes}}>
            {props.children }
    </NoteContext.Provider>

}

export default NoteState 
