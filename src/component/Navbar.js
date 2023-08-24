import React, { useEffect} from 'react'
// import PropTypes from 'prop-types'
import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";



export default function Navbar() {
  const location =  useLocation()
  const navigation = useNavigate()
  useEffect(()=>{
    // console.log(location.pathname)
  },[location])

 const handleLogOut =()=>{
    localStorage.removeItem("token")
    navigation('/login')
  }

  return (
  
    <>
    <nav className={`navbar navbar-expand-lg navbar-dark bg-dark`}>
       <div className="container-fluid">
         <a className="navbar-brand" href="/">nav</a>
         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
           <span className="navbar-toggler-icon"></span>
         </button>
         <div className="collapse navbar-collapse" id="navbarSupportedContent">
           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             <li className="nav-item">
               <Link className={`nav-link ${location.pathname==='/'?'active':""}`} aria-current="page" to="/">Home</Link>
             </li>
             <li className="nav-item">
               <Link className={`nav-link ${location.pathname==='/about'?'active':""}`} to="/about">about</Link>
             </li>
           </ul>
          { !localStorage.getItem('token')?<form className="d-flex" role="search">
             <div className={`form-check form-switch text-dark`}>
             <Link className="btn btn-success mx-2" to='/login'  >Login</Link>
             <Link className="btn btn-success mx-1" to='/signUp' >Sign Up</Link>
             </div>
           </form>:<button className='btn btn-success mx-1' onClick={handleLogOut}>Log out</button>}
         </div>
       </div>
    </nav>
   </>
  )
}

