import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from "moment"
import { Table,message } from 'antd'
import API_BASE_URL from '../../services/api'
import Layout from "./../../components/Layout"
const DoctorAppointments = () => {
    const [appointments,setAppointments]=useState([])
 
    const getAppointments=async()=>{
    try {
        const res= await axios.get(`${API_BASE_URL}/api/doctor/doctor-appointments`,
         {  headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }})
    if(res.data.success){
        setAppointments(res.data.data)
        getAppointments()
    }
    
    
    
    } catch (error) {
    
        console.log(error)
        
    }
    }
  /////////////////
  const handleStatus=async(record,status)=>{
try {
    let res= await axios.post(`${API_BASE_URL}/api/doctor/update-status`,{appointmentsId:record._id,status},{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }     
    })
  if(res.data.success){
    message.success(res.data.message)
  }
} catch (error) {
    console.log(error)
    message.error("Something Went Wrong")
}






  }  






    useEffect(()=>{
        getAppointments()
    },[])





    const columns=[
        {
            title:"ID",
            dataIndex:"_id"
        },
        {
            title:"Name",
            dataIndex:"name",
            render:(text,record)=>(
              <span>  {record.doctorId.firstName}  {record.doctorId.lastName}    </span>
            )
        },
        {
            title:"Phone",
            dataIndex:"phone",
            render:(text,record)=>(
              <span>  {record.doctorId.phone}    </span>
            )
        },
        {
            title:"Date & Time",
            dataIndex:"date",
            render:(text,record)=>(
              <span>  {moment(record.date).format("DD-MM-YYYY")}  &nbsp;
                     {moment(record.time).format("HH:mm")}
                </span>
            )
        },
        {
            title:"Status",
            dataIndex:"status",
        },
        {
            title:"Actions",
            dataIndex:"actions",
            render:(text,record)=>(
                <div className=' d-flex '>
{record.status==="pending" && 
(
    <div className='d-flex'>
<button className='btn btn-success ' onClick={()=>handleStatus(record,"approved")}>Approved</button>
<button className='btn btn-danger mx-2' onClick={()=>handleStatus(record,"reject")}>Reject</button>
    </div>
)
}


                </div>
            )
        }
    
    ]
    




  return (
    <Layout>
     <Table columns={columns} dataSource={appointments}   />
    
    
    </Layout>
  )
}

export default DoctorAppointments