import React from 'react'
import "../styles/notification.css";
import Layout from '../components/Layout'
import { Tabs,message } from 'antd'
import API_BASE_URL from '../services/api'
import { useDispatch, useSelector } from 'react-redux'
import{ hideLoading, showLoading } from '../redux/features/alertSlice'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
const NotificationPage = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
 const {user}=useSelector(state => state.user)
////Handle Read Notification///
   const handleMarkedAll=async()=>{
    try {
      dispatch(showLoading)
      const res= await axios.post(`${API_BASE_URL}/api/get-all-notification`,{userId:user._id},{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      dispatch(hideLoading())
      if(res.data.Message === "All Notifications Marked As Read"){
        message.success(res.data.Message)
      }else{
        message.error(res.data.Message)
      }




    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error("SomeThing Went Wrong")
    }

   }


   ////////////////// Delete Notifications 
   const handleDeleteRead=async()=>{
try {
  dispatch(showLoading())
let res= await axios.post(`${API_BASE_URL}/api/delete-all-notification`,{userId:user._id},{
  headers:{
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
})
dispatch(hideLoading())
if(res.data.Message === "User Deleted Successfull"){
  message.success(res.data.Message)
}else{
  message.error("SomeThing Went Wrong")
}

} catch (error) {
  console.log(error)
  message.error("something Went Wrong In Notifications")
}




   }
    
  return (
   <Layout>
      <h3 className='p-2 text-center'  >Notification Page</h3>
<Tabs>
<Tabs.TabPane   tab="UNREAD" key={0}>
<div  className='d-flex justify-content-end' >
<h4 style={{cursor:"pointer"}}  className='p-1 read-button   '  onClick={handleMarkedAll}>Mark All Read</h4>
</div>
{user?.notification.map(x=>(
    
    <div className='card mx-2' onClick={()=>navigate(x.onClickPath)}  style={{cursor: "pointer"}} >
    <div className='card-text p-1  shadow-lg    '>
        {x.message}
    </div>
    
    
    </div>
      
    
    ))}


</Tabs.TabPane>

<Tabs.TabPane  tab="Read" key={1}>
<div  className='d-flex justify-content-end' >
<h4   className='p-1   delete-button ' style={{cursor:"pointer"}}  onClick={handleDeleteRead}>Delete All Read</h4>
</div>
{user?.seen.map(x=>(
    
    <div className='card my-1 mx-2   ' onClick={()=>navigate(x.onClickPath)}  style={{cursor: "pointer"}} >
    <div className='card-text '>
       <p className='  font-weight-bold  '>{x.message}</p>
    </div>
    
    
    </div>
      
    
    ))}





</Tabs.TabPane>

</Tabs>






</Layout>
  )
}

export default NotificationPage
