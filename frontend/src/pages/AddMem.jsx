import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function AddMem() {

    const navigate = useNavigate();

    const locationHook = useLocation();
    //admin ıd
    const id = locationHook.pathname.split("/")[2];

    const [newMem, setNewMem] = useState({
        name: "",
        surname: "",
        telNum: "",
        email: "",
        salary: "",
        age: "",
        job: "",
        teamid: "",
        id: ""

    })

    useEffect(() => {
        const fetcDepartment = async () => {
            try {
                const res = await axios.post("http://localhost:8800/SpeMem/" + id);
                console.log(res.data[0])
                setNewMem(res.data[0]);
            } catch (error) {
                console.log(error)
            }
        }
        fetcDepartment()
    }, [id])

    const handleChange = (e) => {
        setNewMem(prev => ({ ...prev, [e.target.name]: e.target.value }));
        console.log(newMem);
    }

    const handleClick = async (e) => {
        e.preventDefault();//SAyfanın refresh olmasını engelleriz

        try {
            await axios.post("http://localhost:8800/employees", newMem)
            navigate(`/Teams/${id}`) 
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='form'>
            <p className='addTitle' >Add new employee</p>
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
                    <label style={{ marginTop: '30px' }}>id:</label>
                    <label style={{ marginTop: '30px' }}>Teamid:</label>
                </div>
                <div className="inputContainer">
                    <input className='inputField' type='text' placeholder={newMem.name} onChange={handleChange} name='name' />
                    <input className='inputField' type='text' placeholder={newMem.surname} onChange={handleChange} name='surname' />
                    <input className='inputField' type='number' placeholder={newMem.telNum} onChange={handleChange} name='telNum' />
                    <input className='inputField' type='text' placeholder={newMem.email} onChange={handleChange} name='email' />
                    <input className='inputField' type='text' placeholder={newMem.job} onChange={handleChange} name='job' />
                    <input className='inputField' type='number' placeholder={newMem.salary} onChange={handleChange} name='salary' />
                    <input className='inputField' type='number' placeholder={newMem.age} onChange={handleChange} name='age' />
                    <input className='inputField' type='number' placeholder={id}onChange={handleChange} name='id' />
                    <input className='inputField' type='number' placeholder={newMem.teamid} onChange={handleChange} name='teamid' />
                    <div className="btnContainer">
                        <button className='cancel' onClick={() => { navigate(`/Teams/${id}`) }} >X</button>
                        <button className='addBtn' onClick={handleClick} >Add SAve</button>

                    </div>

                </div>
            </div>


        </div>
    )
}

export default AddMem
