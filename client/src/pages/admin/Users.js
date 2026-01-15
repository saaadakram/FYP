import Layout from './../../components/Layout'
import React from 'react'
import { useState ,useEffect} from 'react'
import axios from "axios"
import { Table } from 'antd'
import API_BASE_URL from '../../services/api'

const Users = () => {
 const [users,setUsers]=useState([])

 ///Get Users
 const getUsers=async()=>{
try {
let res= await axios.get(`${API_BASE_URL}/api/admin/getAllusers`,{
    headers:{
        Authorization:  `Bearer ${localStorage.getItem("token")}`
    }
})
if(res.data.Message === "Users Data" ){
    setUsers(res.data.data)
}
console.log(res.data.data)


} catch (error) {
    console.log(error)
}}



 useEffect(()=>{
getUsers()
},[])
/////ant desgin colum
const colums=[
{
    title:"Name",
    dataIndex:"name",
},
{
    title:"Email",
    dataIndex:"email",
},
{
    title:"Created AT",
    dataIndex:"createdAt",
},
{
    title:"Actions",
    dataIndex:"actions",
    render:(text,record)=>(
        <div className=' d-flex'>
       <button  className='btn btn-danger'  >Block</button>

        </div>
    ),
},
]
  return (
    <Layout>
       <h1>User List</h1> 


<Table  columns={colums} dataSource={users}  />

    </Layout>
  )
}

export default Users
