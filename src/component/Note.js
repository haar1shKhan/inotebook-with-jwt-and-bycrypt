import React , {useContext,useRef,useState, useEffect } from 'react'
import noteContext from '../context/NoteContext'
import Noteitems from './Noteitems'
import Alert from './Alert'
import AddNote from './AddNote'
import {  useNavigate } from "react-router-dom";

function Note() {
    const context = useContext(noteContext)
    const {notes,fetchNotes,updateNotes} = context
    const navigate = useNavigate();
    
    useEffect(()=>{
      //eslint-disable-next-line
      if(localStorage.getItem('token')){
        fetchNotes()
      }else{
        // eslint-disable-next-line 
        navigate("/login")
      }

  },[])
  const ref = useRef(null)
  const closeRef = useRef(null)

  const [upNote,setUpNote] = useState({id:"",etitle:'',edescription:"",etag:""})
  const [alert,setAlert] = useState(null)

  const updateForm = (currentNote) => {

    ref.current.click()
    setUpNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:""})
    
  }


  const handleClick=(e)=>{
      e.preventDefault()
      closeRef.current.click()
      if(upNote.etitle.length<3&&upNote.edescription.length<5){
        setAlert({type:'warning',msg:'Add more characters'})
        return setTimeout(()=>{setAlert(null)},1000)
      }
      updateNotes(upNote)
      setAlert({type:'success',msg:'Note has been updated'})
      setTimeout(()=>{setAlert(null)},2000)
  }

  const onChange =(e)=>{

    setUpNote({...upNote,[e.target.name]:e.target.value})

  }

  return (
    <>
     {
      alert&&<Alert alert={alert}/>
     }
      <AddNote/>
      
      <button type="button" ref={ref} className="btn  d-none btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h1>Update notes</h1>
              <form action="">
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={upNote.etitle} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                  <textarea className="form-control" onChange={onChange} id="edescription" value={upNote.edescription} name='edescription' rows="3"></textarea>
                </div>
              </form>
            </div>



            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" ref={closeRef} onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

    <div className='row my-3'>
        {notes.map((note)=>{
          return <Noteitems key={note._id} updateForm={updateForm} notes={note}/>
        })}
    </div>
        </>  
  )
}

export default Note
