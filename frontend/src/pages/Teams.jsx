import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import EmployeeList from '../components/EmployeeList';
import { AiOutlinePlus } from "react-icons/ai"
import { useNavigate } from "react-router-dom";

function Teams() {

  const locationHook = useLocation();
  //admin ıd
  const id = locationHook.pathname.split("/")[2];
  // console.log(id)
  const [emp, setEmp] = useState([]);
  const [tname, settname] = useState("");

  useEffect(() => {
    const teamData = async () => {
      try {
        const res = await axios.post("http://localhost:8800/teamData/" + id);
        //console.log(res.data);
        setEmp(res.data);
        settname(res.data[0].teamname);

      } catch (error) {
        console.log(error)
      }
    }
    teamData();
  })

  //Ad Team Mem
  const navigate = useNavigate();

  const addNewOne = () => {
    navigate(`/AddMem/${id}`)
    console.log("aa")
  }
  return (
    <div>
      <h2 className='teamTitle'>My Team Detail</h2>
      <hr ></hr>
      <h4>{tname}</h4>
      <div className='Addnew'>
        <AiOutlinePlus onClick={addNewOne} style={{ backgroundColor: 'darkgreen', height: "20px", width: "20px", color: "white" }} />
      </div>
      <EmployeeList data={emp} />
    </div>
  )
}

export default Teams
