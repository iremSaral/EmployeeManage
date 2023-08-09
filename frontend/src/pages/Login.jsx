import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useNavigate} from "react-router-dom";
import axios from 'axios';

function Login({ onLoginSuccess }) {
  const navigate=useNavigate();
    const [admin,setAdmin]=useState(
  {      email:" ",
        password:""}
    )

    
  const handleChange = (e) => {
    setAdmin(prev => ({ ...prev, [e.target.name]: e.target.value }));
  //console.log(admin)
}

  const handleSubmit= async(event)=>{
    event.preventDefault();
   try {
   await axios.post('http://localhost:8800/login',admin)
   .then(res=>{

    if(res.data){
      onLoginSuccess(); // Giriş başarılı olduğunda handleLoginSuccess'i çağır
     navigate(`/Home/${res.data[0].id}`)
     //console.log(res.data[0].id)
    }
   })
 

   } catch (error) {
    console.log(error)
   }
    
  }

    return (
        <div className='loginBG'>
            <div className='loginFormBG'>
                <form >
                    <div className='mb-3'> 
                        <label htmlFor='email'>E-mail </label>
                        <input type='email' placeholder='E-mail' className='form-control' 
                        onChange={handleChange} name='email'/>
                    </div>
                    <div>
                        <label htmlFor='password'>Password </label>
                        <input type='password' placeholder='Password' className='form-control'
                         onChange={handleChange} name='password'/>
                    </div>
                    <button className='btn btn-success' onClick={handleSubmit}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
