import React ,{useState} from 'react'
import {  useNavigate } from "react-router-dom";

function SignUp() {

  const [credential,setCredential]=useState({userName:"",email:"",password:""})
  const navigate = useNavigate();
      
  const handleClick=async(e)=>{

   console.log(credential)
   e.preventDefault()
    const reponse= await fetch(`http://localhost:5000/api/auth/createNewUser`,{
 
     method:'POST',
     headers: {
       'Content-Type': 'application/json',
       },
     body: JSON.stringify({name:credential.userName,email:credential.email,password:credential.password})
     }) 
 
     const json = await reponse.json()
     console.log(json)
     localStorage.setItem(json.authtoken)
     if(json.success){
      navigate("/")
     }
   }
 
     const onChange=(e)=>{
       setCredential({...credential,[e.target.name]:e.target.value})
     }

  return (
    <div>
     <div className='my-4 container'> 
        <h1 className='mb-4'>Sign Up</h1>
        <form onSubmit={handleClick}>
        <div className="mb-3">
            <label htmlFor="exampleInpuName1" className="form-label">User name</label>
            <input type="text" name='userName' onChange={onChange} className="form-control" id="exampleInpuName1" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" name='email' onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name='password' onChange={onChange} className="form-control" id="exampleInputPassword1"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
    </div>
  )
}

export default SignUp
