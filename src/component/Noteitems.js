import React, { useContext } from 'react'
import NoteContext from '../context/NoteContext'

function Noteitems(props) {
  const context = useContext(NoteContext)
  const { deleteNotes} = context

  

  return (
    <>
      <div className="card mx-3" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="d-flex">
            <h5 className="card-title">{props.notes.title}</h5>
            <i className="fa-regular fa-pen-to-square mx-2" onClick={() => { props.updateForm(props.notes) }}></i>
            <i className="fa-light fa-trash-can mx-2" onClick={() => { deleteNotes(props.notes._id) }}></i>
          </div>
          <p className="card-text">{props.notes.description}</p>
        </div>
      </div>
    </>
  )
}

export default Noteitems
