import axios from 'axios';
import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
function Add() {

  const [book,setBook]=useState({
    title:"",
    desc:"",
    id:"",
    cover:"",
  })

const navigate=useNavigate();

  const handleChange=(e)=>{
setBook(prev=>({...prev,[e.target.name]:e.target.value}));
  }
  const handleClick=async(e)=>{
  e.preventDefault();//SAyfanın refresh olmasını engelleriz

  try {
    await axios.post("http://localhost:8800/books",book)
    navigate("/")
  } catch (error) {
    console.log(error)
  }

  }
  console.log(book)
  return (
    <div className='form'>
      <h1>Add new employee</h1>
      <input type='number' placeholder='id' onChange={handleChange} name='id'/>
      <input type='text' placeholder='title' onChange={handleChange} name='title'/>
      <input type='text' placeholder='desc' onChange={handleChange} name='desc'/>
      <input type='text' placeholder='cover' onChange={handleChange} name='cover'/>
    
    <button onClick={handleClick}>Add SAve</button>
    </div>
  )
}

export default Add