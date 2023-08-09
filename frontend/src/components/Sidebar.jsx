import React, { useState, useEffect } from 'react'

import { FaBars } from 'react-icons/fa'
import { AiOutlineHome, AiOutlineTeam, AiOutlineProfile } from "react-icons/ai";
import { NavLink, } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import axios from 'axios'


function Sidebar({ children}) {
  const [admin, setAdmin] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const updateState = () => setIsOpen(!isOpen);//Açıksa kapalı,kapalıysa açık
  const locationHook = useLocation();
  const id = locationHook.pathname.split("/")[2];


  const menu = [
    {
      path: `/Home/${id}`,
      name: "Home",
      icon: <AiOutlineHome />

    },
    {
      path: `/Teams/${id}`,
      name: "Teams",
      icon: <AiOutlineTeam />
    },
    {
      path: `/Profiles/${id}`,
      name: "Profile",
      icon: <AiOutlineProfile />
    }
  ]


  useEffect(() => {

    const fetchAdmin = async () => {
      try {
        const res = await axios.post("http://localhost:8800/home/" + id);
        setAdmin(res.data[0].name)
      } catch (error) {
        console.log(error);
      }
    }
    fetchAdmin()
  }, [id]);

  return (
    <div className='SBContainer'>
      <div style={{ width: isOpen ? "200px" : "50px" }} className='sidebar'>
        <div className='topsection'>
          <h1 style={{ display: isOpen ? "block" : "none" }} className='titlesb'>{admin}</h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className='menuitems'>
            <FaBars onClick={updateState} />
          </div>

        </div>
        {
          menu.map(
            (item, index) => (
              <NavLink to={item.path} key={index} className="link" activeclassName="active">
                <div className="icon">{item.icon}</div>
                <div style={{ display: isOpen ? "block" : "none" }} className="linkText">{item.name} </div>
              </NavLink>
            )
          )
        }
      </div>
      <main>{children}</main>
    </div>
  )
}

export default Sidebar
