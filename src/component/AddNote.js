import React, { useContext, useState } from 'react'
import Alert from './Alert'
import noteContext from '../context/NoteContext'


const AddNote = () => {
  const context = useContext(noteContext)
  const { addNotes } = context
  const [note, setNote] = useState({ title: "", description: "", tag: "default" })
  const [alert, setAlert] = useState(null)

  const handleClick = (e) => {
    e.preventDefault()

    if ((note.title.length < 3 && note.description.length < 5) || (note.title.length < 3 || note.description.length < 5)) {
      setAlert({ type: 'warning', msg: 'Please add more characters' })
      
      return setTimeout(() => { setAlert(null) }, 2000)
    }

    addNotes(note.title, note.description, note.tag)
    setAlert({ type: 'success', msg: 'Note added success fully' })
    document.getElementById('title').value=''
    document.getElementById('description').value=''
    setTimeout(() => { setAlert(null) }, 2000)
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Alert alert={alert} />
      <div>
        <h1>Add notes</h1>
        <form action="">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
            <textarea className="form-control" onChange={onChange} id="description" name='description' rows="3"></textarea>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary" onClick={handleClick} >Add note</button>
          </div>
        </form>
        <h1>Your notes</h1>
      </div>
    </>
  )
}

export default AddNote
