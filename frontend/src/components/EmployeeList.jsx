import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai"
import Modal from './Modal';
import {useNavigate} from "react-router-dom";

function EmployeeList(props) {
  const [openModal, setOpenModal] = useState(false);
 const[memDetail,setMemDetail]=useState("");

 const navigate=useNavigate();

  //İcon ekleme fonksiyonları
  const createActions = (row) => {
    return (
      <div>
        <AiOutlineDelete className='deleteButton' onClick={() => DeleteMem(row)} />
        <AiOutlineEdit className='updateButton'  onClick={()=>navigate(`/UpdateMem/${row.id}`)} />
      </div>
    );
  };
  //Show Detail
  const showDetail = (row) => {
    return (
      <div>
        <AiOutlineEye className='showButton' onClick={() => {

          setOpenModal(true)
         setMemDetail(row.id)
        // console.log(row.id)
        }} />
      </div>
    )
  }

  //Tamamlandı-Delete Mem
  const DeleteMem = async (row) => {
    //console.log(row.id)
    try {
      await axios.delete("http://localhost:8800/teammem/" + row.id);
      console.log("http://localhost:8800/teammem/" + row.id)
    } catch (error) {
      console.log(error)
    }
  }

  //Define Columns of Table
  const columns = [
    {
      name: "",
      selector: (row) => showDetail(row), // Action sütununa butonları eklemek için createActions fonksiyonunu kullanıyoruz
      ignoreRowClick: true, // Action sütununda satıra tıklama olayını engelliyoruz
      allowOverflow: true,
      button: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Surname", // Changed "surname" to "name"
      selector: (row) => row.surname,
      sortable: true
    },
    {
      name: "E-mail", // Changed "email" to "name"
      selector: (row) => row.email
    },
    {
      name: "Phone", // Changed "telNum" to "name"
      selector: (row) => row.telNum
    },
    {
      name: "Salary", // Changed "salary" to "name"
      selector: (row) => row.salary,
      sortable: true
    },
    {
      name: "Action",
      selector: (row) => createActions(row), // Action sütununa butonları eklemek için createActions fonksiyonunu kullanıyoruz
      ignoreRowClick: true, // Action sütununda satıra tıklama olayını engelliyoruz
      allowOverflow: true,
      button: true, // Action sütununda butonların görüntülenmesini sağlıyoruz
    },
  ];

  //Table Style
  const customStyle = {
    headRow: {
      style: {
        color: 'darkgreen',
      }
    },
    headCells: {//sütun ismi
      style: {
        fontSize: '20px',
        fontStyle: 'italic'
      }
    },
    cells: {//verielern yazısı
      style: {
        fontSize: '15px',
      }
    }
  }

  // useEffect(() => {
  //   const fetchEmployee = async () => {
  //     try {
  //       const res = await axios.post("http://localhost:8800/employeeTable");
  //       //console.log(res);
  //       setEmployee(res.data);

  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchEmployee()
  // }, [employee.id]);




  return (
    <div>
      <div style={{ padding: "5px 5px", backgroundColor: "darkgreen" }}>
        <DataTable
          columns={columns}
          data={props.data}
          fixedHeader
          pagination
          customStyles={customStyle}
        ></DataTable>
      </div>
      <Modal open={openModal} id={memDetail} setOpen={setOpenModal} />
    </div>
  )
}

export default EmployeeList
