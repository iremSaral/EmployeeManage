import React, { useEffect, useState } from 'react'
import axios from 'axios'

import img from '../image/background.jpg'

function Modal(props) {

    const [memDetails, setMemDetail] = useState([]);

    useEffect(() => {//Sayfa açıldığın bir kez çalışacak ilk çalışacak fonksiyonlar
        //Api erquest=aasync func

        const fetchSpeMem = async () => {
            try {
                const res = await axios.post("http://localhost:8800/SpeMem/" + props.id);
                setMemDetail(res.data[0]);
                // console.log(res.name)
            } catch (error) {
                console.log(error);
            }


        }
        fetchSpeMem()

    }, [props.id]);
 
    if (!props.open) return null;
    //props.id ile gönderlen kişinin verleri çek
    return (
        <div>
            <div className="overlay">
                <div className="modalcontainer">
                    <img src={`http://localhost:8800/images/`+memDetails.img} className='modalpp' />
                    <div className="modalright">
                        <p style={{marginLeft: "10px", fontSize: '18px', fontWeight: 'bold',
                                color: 'darkgray',marginRight:'-200px'}} 
                                
                                onClick={()=>props.setOpen(false)} >X</p>

                        <div style={{ display: 'flex', flex: 1 }}>
                            <p style={{
                                marginLeft: "30px", fontSize: '30px', fontWeight: 'bold',
                                color: 'darkgray', marginTop: "-10px"
                            }}>{memDetails.name}</p>
                            <p style={{
                                marginLeft: "10px", fontSize: '30px', marginTop: '25px', fontWeight: 'bold',
                                color: 'darkgray', marginTop: "-10px"
                            }}>{memDetails.surname}</p>
                        </div>
                        <p style={{
                            marginLeft: "45px", fontSize: '20px', fontStyle: 'italic', marginTop: '-25px',
                            color: 'darkgray'
                        }}>{memDetails.job}  </p>
                        <p style={{
                            marginLeft: "25px", fontSize: '15px', fontStyle: 'italic', marginTop: '20px',
                            color: 'darkgray', textAlign: 'left'
                        }}>E-mail: {memDetails.email} </p>
                        <p style={{
                            marginLeft: "25px", fontSize: '15px', fontStyle: 'italic', marginTop: '-15px',
                            color: 'darkgray', textAlign: 'left'
                        }}>Phone: {memDetails.telNum} </p>
                        <p style={{
                            marginLeft: "25px", fontSize: '15px', fontStyle: 'italic', marginTop: '-15px',
                            color: 'darkgray', textAlign: 'left'
                        }}>Salary: {memDetails.salary} </p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
