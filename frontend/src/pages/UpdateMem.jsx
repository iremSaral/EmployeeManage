import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function UpdateMem(props) {
    const navigate = useNavigate();

    const locationHook = useLocation();
    //admin ıd
    const id = locationHook.pathname.split("/")[2];

   const[mem,setMem]=useState("")

    useEffect(() => {
        const getMem = async () => {
            try {
                const que = await axios.post("http://localhost:8800/SpeMem/" + id);
               
                setUpdateMem(que.data[0])
            } catch (error) {
            }
        }
        getMem();
    }, [id])


    const updateMember = async (props) => {
        try {
           await axios.put("http://localhost:8800/employee/"+id,updateMem);
           navigate(`/Teams/${updateMem.id}`)
        } catch (error) {
            console.log(error)
        }
    }

    const [updateMem, setUpdateMem] = useState({
        id:"",
        name: "",
        surname: "",
        telNum: "",
        email: "",
        salary: "",
        age: "",
        job: "",
        teamid: "",
        

    })

    const handleChange = (e) => {
        setUpdateMem(prev => ({ ...prev, [e.target.name]: e.target.value }));
       // console.log(updateMem)
    }




    return (
        <div className='form'>
            <p className='addTitle' >Update employee</p>
            <hr></hr>
            <div className="MainContainer">
                <div className="labelContainer">
                    <label style={{ marginTop: '10px' }}>Name:</label>
                    <label style={{ marginTop: '30px' }}>Surname:</label>
                    <label style={{ marginTop: '30px' }}>Phone Number:</label>
                    <label style={{ marginTop: '20px' }}>E-mail:</label>
                    <label style={{ marginTop: '30px' }}>Job:</label>
                    <label style={{ marginTop: '30px' }}>Salary:</label>
                    <label style={{ marginTop: '30px' }}>Age:</label>
                </div>
                <div className="inputContainer">
                    <input className='inputField' type='text' placeholder={updateMem.name} onChange={handleChange} name='name' />
                    <input className='inputField' type='text' placeholder={updateMem.surname} onChange={handleChange} name='surname' />
                    <input className='inputField' type='number' placeholder={updateMem.telNum} onChange={handleChange} name='telNum' />
                    <input className='inputField' type='text' placeholder={updateMem.email} onChange={handleChange} name='email' />
                    <input className='inputField' type='text' placeholder={updateMem.job} onChange={handleChange} name='job' />
                    <input className='inputField' type='number' placeholder={updateMem.salary} onChange={handleChange} name='salary' />
                    <input className='inputField' type='number' placeholder={updateMem.age} onChange={handleChange} name='age' />
                    <input className='inputField' type='number' placeholder={updateMem.age} onChange={handleChange} name='id' />
                    <input className='inputField' type='number' placeholder={updateMem.age} onChange={handleChange} name='teamid' />
                    <div className="btnContainer">
                        <button className='cancel' onClick={() => { navigate(`/Teams/${updateMem.id}`) }} >X</button>
                        <button className='addBtn' onClick={updateMember} >Update Member</button>

                    </div>

                </div>
            </div>


        </div>
    )
}

export default UpdateMem
