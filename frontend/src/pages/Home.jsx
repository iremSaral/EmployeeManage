import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import EmployeeList from '../components/AllEmployeeList';
import Card from '../components/Card';
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";

function Home({ onLogoutSuccess }) {
  const navigate = useNavigate();
  const locationHook = useLocation();
  //admin ıd
  const id = locationHook.pathname.split("/")[2];
  const [depName, setDepName] = useState("");
  const [depDesc, setDesc] = useState("");
  const [depteam, setTeamid] = useState("");

  //Active department
  //     const fetchDetail=async()=>{
  //       try {
  //         const res = await axios.post("http://localhost:8800/homeDetail/"+id);
  //       setDepName(res.data[0].name);//Department name
  //       setDesc(res.data[0].desc);
  //      // setTeamid();
  //       console.log(res.data[0].teamid)
  //        } catch (error) {

  //        }
  //     }

  const [department, setDepartment] = useState([]);

  useEffect(() => {
    const fetcDepartment = async () => {
      try {
        const res = await axios.post("http://localhost:8800/cardComp");
        setDepartment(res.data);
        //  console.log(res.data[0].img.toString());
      } catch (error) {
        console.log(error)
      }
    }
    fetcDepartment()
  }, [id])


  return (
    <div className='homeContainer'>
      <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
        <h2 className='homeTitle'>Employee Management System</h2>
        <p onClick={onLogoutSuccess} ><AiOutlineLogout /></p>
      </div>
      <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginTop: 40 }}>
        {
          department.map(department => (
            <div
              key={id}>
              <Card img={department.img} id={department.id} name={department.name} desc={department.desc} />
            </div>))}
      </div>
      <h5 style={{ textAlign: 'left', marginTop: 100 }}>List of Employee in Company..</h5>
      <EmployeeList />

    </div>
  )
}

export default Home
