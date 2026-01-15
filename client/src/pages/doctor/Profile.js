import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useSelector,useDispatch } from 'react-redux'
import { useParams,useNavigate } from 'react-router-dom'
import { Col, Form, Row, message, TimePicker } from 'antd'
import axios from "axios"
import Input from 'antd/es/input/Input'
import API_BASE_URL from '../../services/api'
import {showLoading,hideLoading} from "../../redux/features/alertSlice"
import moment from "moment"


const Profile = () => {
   const {user}=useSelector(state=>state.user)
   const [doctor,setDoctor]=useState(null)
   const dispatch=useDispatch()
   const navigate=useNavigate()

   const params=useParams()
////////
const handleFinish=async(values)=>{
  try {
    dispatch(showLoading())
  const res= await axios.post(`${API_BASE_URL}/api/doctor/updateprofile`,
  {...values, userId:user._id,
     timings:[
      moment(values.timings[0]).format("HH:mm"),
      moment(values.timings[1]).format("HH:mm"),
     ]},
  {
  headers:{
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
  })
  dispatch(hideLoading())
  if(res.data.success){
    message.success(res.data.message)
    navigate('/')
  }
  
  } catch (error) {
    console.log(error)
    dispatch(hideLoading())
    message.error("SomeThing Went Wrong")
  }
      
  }





   //get Doctor info

const getDoctorinfo=async()=>{
try {
  const res= await axios.post(`${API_BASE_URL}/api/doctor/getDoctorInfo`,{userId:params.id},
  {
    headers:{
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
  if(res.data.success){
    setDoctor(res.data.data)
  }
} catch (error) {
  console.log(error)
}

}

useEffect(()=>{
  getDoctorinfo()
},[])









  return (
    <Layout>
       <h1 className=' text-white text-center mt-2 display-6 font-weight-bold            '   >Manage Profile <hr className=' text-purple border-2'/></h1>
      {doctor && (
        <Form layout="vertical"
         onFinish={handleFinish} className='m-3'
         initialValues={{
          ...doctor,
          timings:[
            moment(doctor.timings[0],"HH:mm"),
            moment(doctor.timings[1],"HH:mm"),
          ]
         }}  >
<h4 className=''>Personal Details :</h4>
<Row gutter={22} >

<Col xs={24} md={24} lg={8}>
<Form.Item  label="First Name" name="firstName" required rules={[{required:true}]} >
<Input type='text' placeholder='Enter Your First Name'   />
</Form.Item></Col>
<Col xs={24} md={24} lg={8}>
<Form.Item  label="Last Name" name="lastName" required rules={[{required:true}]} >
<Input type='text' placeholder='Enter Last First Name'   />
</Form.Item></Col>
<Col xs={24} md={24} lg={8}>
<Form.Item  label="Phone Number" name="phone" required rules={[{required:true}]} >
<Input type='text' placeholder='Enter Your Phone Number'   />
</Form.Item></Col>
<Col xs={24} md={24} lg={8}>
<Form.Item  label="Email" name="email" required rules={[{required:true}]} >
<Input type='text' placeholder='Enter Your Email'   />
</Form.Item></Col>
<Col xs={24} md={24} lg={8}>
<Form.Item  label="Website" name="webSite" required rules={[{required:true}]} >
<Input type='text' placeholder='Enter Your Website'   />
</Form.Item></Col>
<Col xs={24} md={24} lg={8}>
<Form.Item  label="Address" name="address" required rules={[{required:true}]} >
<Input type='text' placeholder='Enter Your First Name'   />
</Form.Item></Col>
</Row>
<h4 className=''>Professional Details :</h4>
<Row gutter={22} >

<Col xs={24} md={24} lg={8}>
<Form.Item  label="Specialization" name="specialization" required rules={[{required:true}]} >
<Input type='text' placeholder='Your Specialization'   />
</Form.Item></Col>
<Col xs={24} md={24} lg={8}>
<Form.Item  label="Experience" name="experience" required rules={[{required:true}]} >
<Input type='text' placeholder='Experience'   />
</Form.Item></Col>
<Col xs={24} md={24} lg={8}>
<Form.Item  label="Fee" name="feePerConsultation" required rules={[{required:true}]} >
<Input type='text' placeholder='Fee Per Consultant'   />
</Form.Item></Col>
<Col xs={24} md={24} lg={8}>
<Form.Item  label="Timings" name="timings" required rules={[{required:true}]} >
<TimePicker.RangePicker format='HH:mm'  />
</Form.Item></Col>
<Col xs={24} md={24} lg={8}>

<button className='btn btn-primary form-btn' type='submit' >Submit</button>

</Col>
</Row>







</Form>
      )}
      
    </Layout>
  )
}

export default Profile
