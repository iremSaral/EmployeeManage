import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import {AiOutlineCloudDownload} from 'react-icons/ai'
import s from '../image/background.jpg'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Profiles() {

    const[profile,setProfile]=useState([]);
    const [team,setTeam]=useState([]);
    const locationHook = useLocation();
    const[load,setLoad]=useState(false)
    //admin ıd
    const id = locationHook.pathname.split("/")[2];
    useEffect(() => {
        const  fetchAdmin = async () => {
          try {
            const res = await axios.post("http://localhost:8800/SpeMem/"+id);
            setProfile(res.data[0])
            
          } catch (error) {
            console.log(error)
          }
        }
        fetchAdmin()
        getMyTeam();
      }, [id])

const downloadPDF=()=>{
const capture=document.querySelector('.profileContainer');
    setLoad(true);
    html2canvas(capture).then((canvas)=>{
        const imgData=canvas.toDataURL('img/png',0.8);
        const doc=new jsPDF('p','mm','a4');
        const componentWidth=doc.internal.pageSize.getWidth();
        const componentHeight=doc.internal.pageSize.getHeight();
        doc.addImage(imgData,'PNG',0,0,componentWidth,componentHeight);
        setLoad(false);
        doc.save("aa.pdf");
    })

}
      const getMyTeam=async()=>{
        try {
            const res=await axios.post("http://localhost:8800/SpeTeam/"+id);
setTeam(res.data[0])
            console.log(res.data);
        } catch (error) {
            
        }
      }
  return (
    <div className='profileContainer'>
    <div style={{ display: 'flex', flexDirection: "row",alignItems:'center',textAlign:'center',justifyContent:'center'}}>
    <h2>Resume Of Person</h2>
    <button  onClick={downloadPDF}><AiOutlineCloudDownload/> </button>

    </div>
   
    <img className='profileImg' src={`http://localhost:8800/images/`+profile.img}  />
    <h4>{profile.name} {profile.surname} </h4>
   <h5>{profile.job} </h5>
   <hr></hr>
   <h4>Status in company</h4>
   <hr></hr>
   <p>Team: {team.teamname}</p>
   <p>Descriptin: {team.teamdesc}</p>
   <p>Salary:{profile.salary}</p>
   <h4> Contact</h4>
   <hr></hr>
   <p>E-mail: {profile.email}</p>
   <p>Phone Number: {profile.telNum}</p>
    </div>

  )
}

export default Profiles