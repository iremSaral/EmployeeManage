import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Books = () => {

  const [books, setbooks] = useState([]);

  useEffect(() => {//Sayfa açıldığın bir kez çalışacak ilk çalışacak fonksiyonlar
    //Api erquest=aasync func

    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setbooks(res.data);

      } catch (error) {
        console.log(error);
      }


    }
    fetchAllBooks()
  });


const handleDelete=async(id)=>{
try {
  await axios.delete("http://localhost:8800/books/"+id);
console.log(id)
  // window.location.reload();
} catch (error) {
  console.log(error)
}

}
  return (
    <div >
      <h1>Books List</h1>
      <div className='books'>
        {books.map(book => (
          <div className='book' key={book.ıd}>
            <h2>
              {book.title}
            </h2>
            <p>{book.ıd}</p>
            <p>{book.desc}</p>
            <button className='update' onClick={()=>handleDelete(book.ıd)}> Delete </button>
            <button className='update'><Link to={`/Update/${book.ıd}`} >Update info</Link></button>
          </div>

        ))}
      </div>

      <button className='update'><Link to="/Add" >Add new one</Link></button>
    </div>
  )
}

export default Books
