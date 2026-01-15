import Layout from './../../components/Layout'
import React from 'react'
import axios from 'axios'
import{Table, message} from "antd"
import { useState,useEffect } from 'react'
import API_BASE_URL from '../../services/api'
const Doctors = () => {
  const [doctors,setDoctors]=useState([])

  const getDoctors=async()=>{
    try {
    let res= await axios.get(`${API_BASE_URL}/api/admin/getAlldoctors`,{
        headers:{
            Authorization:  `Bearer ${localStorage.getItem("token")}`
        }
    })
    if(res.data.Message === "Users Data" ){
        setDoctors(res.data.data)
    }
    console.log(res.data.data)
    
    
    } catch (error) {
        console.log(error)
    }}
    
//////Handle Account
const handleAccountStatus=async (record, status)=>{
try {
  let res= await axios.post(`${API_BASE_URL}/api/admin/changeAccountStatus`,
  { doctorId: record._id, userId: record.userId, status:status, },
  { headers:{
      Authorization: `Bearer ${localStorage.getItem("token")}` }
  },)
  if(res.data.success){
    message.success(res.data.Message);
    window.location.reload()
  }

} catch (error) {
  message.error("SomeThing Went Wrong")

}





}
    
     useEffect(()=>{
    getDoctors()
    },[])


const columns=[
  
  {
  title:"Name",
  dataIndex:"name",
  render:(text,record)=>(
    <span>{record.firstName}  {record.lastName}</span>

  ),
},{
  title:"Status",
  dataIndex:"status",
},
{
  title:"Phone",
  dataIndex:"phone",
},
{
  title:"Actions",
  dataIndex:"actions",
  render:(text,record)=>(
<div  className=' d-flex'  >
{record.status === "pending" ?  ( <button className='btn btn-success' onClick={()=> handleAccountStatus(record, "approved")} >Approve</button>) :
 (<button className=' btn btn-danger' >Reject</button>) }


</div>


  )
}





]



  return (
 
   <Layout>
<h1 className=' text-center m-3'  >All Doctors</h1>
<Table  columns={columns} dataSource={doctors}  />
   </Layout>
  )
}

export default Doctors
