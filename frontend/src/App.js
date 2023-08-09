
import "./style.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import React, { useState } from 'react'
import Books from './pages/Books';
import Add from './pages/Add';
import Update from './pages/Update';
import Login from './pages/Login';
import Home from './pages/Home';
import Teams from './pages/Teams';
import AddMem from './pages/AddMem';
import Sidebar from '../src/components/Sidebar';
import UpdateMem from './pages/UpdateMem';
import Profiles from "./pages/Profiles";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  // Login bileşeninden giriş başarılı olduğunda çağırılacak fonksiyon
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogoutSuccess=()=>{

    setIsLoggedIn(false);

  }
  return (
    <div >
      <BrowserRouter>
      {isLoggedIn ? (
      <Sidebar onLogoutSuccess={handleLogoutSuccess} onLoginSuccess={handleLoginSuccess}>
        <Routes>
        <Route path='/Login' element={<Login  />} />
          <Route path='/Home/:id' element={<Home  onLogoutSuccess={handleLogoutSuccess} />} />
          <Route path='/Teams/:id' element={<Teams />} />
          <Route path='AddMem/:id' element={<AddMem/>} />
          <Route path='UpdateMem/:id' element={<UpdateMem/>} />
          <Route path='Profiles/:id' element={<Profiles/>}/>
          <Route path='/Books' element={<Books />} />
          <Route path='/Add' element={<Add />} />
          <Route path='/Update/:id' element={<Update />} />
        </Routes>
        </Sidebar>
      ):(
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
      </BrowserRouter>
    </div>
  );
}

export default App;