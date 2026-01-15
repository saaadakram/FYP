
import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import moment from "moment"
import { Table } from 'antd'
import API_BASE_URL from '../services/api'

const Appointmnets = () => {
    const [appointments,setAppointments]=useState([])
 
const getAppointments=async()=>{
try {
    const res= await axios.get(`${API_BASE_URL}/api/users-appointments`,
     {  headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }})
if(res.data.success){
    setAppointments(res.data.data)
}



} catch (error) {

    console.log(error)
    
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
          <span>  {record.firstName}  {record.lastName}    </span>
        )
    },
    {
        title:"Phone",
        dataIndex:"phone",
        render:(text,record)=>(
          <span>  {record.phone}    </span>
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

]


  return (
    <Layout> <h1 className=' text-white text-center mt-2  font-weight-bold            '   >Appointments List <hr className=' text-purple border-2'/></h1>
    <Table columns={columns} dataSource={appointments}   />
    </Layout>
  )
}

export default Appointmnets