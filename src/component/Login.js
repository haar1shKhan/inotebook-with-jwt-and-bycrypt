import React, { useState } from 'react'
import {  useNavigate } from "react-router-dom";



function Login() {

  const [credential,setCredential]=useState({email:"",password:""})
  const navigate = useNavigate();

      
 const handleClick=async(e)=>{
    e.preventDefault()
   const reponse= await fetch(`http://localhost:5000/api/auth/login`,{

    method:'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token' : localStorage.getItem('token')
     },
    body: JSON.stringify({email:credential.email,password:credential.password})
    }) 

    const json = await reponse.json()
    console.log(json)
    localStorage.setItem('token',json.authtoken)
    if(json.success){
      navigate("/")
     }
  }

    const onChange=(e)=>{
      setCredential({...credential,[e.target.name]:e.target.value})
    }

  return (
    <div className='my-4 containe.r'> 
        <h1 className='mb-4'>Login page</h1>
        <form onSubmit={handleClick}>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" name = 'email' onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name='password' onChange={onChange} className="form-control" id="exampleInputPassword1"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Login
