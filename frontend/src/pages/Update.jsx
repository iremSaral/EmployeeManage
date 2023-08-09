import axios from 'axios';
import React, {  useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

function Update() {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    id: "",
    cover: "",
  })

  const navigate = useNavigate();
  const locationHook = useLocation();
  //book ıd
  const bookId = locationHook.pathname.split("/")[2];
  //console.log(locationHook.pathname.split("/")[2]);

  const handleChange = (e) => {
    setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
  console.log(book)}
  const handleClick = async (e) => {
    e.preventDefault();//SAyfanın refresh olmasını engelleriz

    try {
      await axios.put("http://localhost:8800/books/" + bookId, book);
     // console.log(book)   
      navigate("/")
    } catch (error) {
      console.log(error)
    }

  }
  //console.log(book)
  return (
    <div className='form'>
      <h1>Update new employee</h1>
      <input className='input' type='number' placeholder='id' onChange={handleChange} name='id' />
      <input className='input' type='text' placeholder='title' onChange={handleChange} name='title' />
      <input className='input' type='text' placeholder='desc' onChange={handleChange} name='desc' />
      <input className='input' type='text' placeholder='cover' onChange={handleChange} name='cover' />

      <button className='formbutton' onClick={handleClick}>Update </button>
    </div>
  )
}

export default Update;