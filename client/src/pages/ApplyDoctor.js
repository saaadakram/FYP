import React from 'react'
import Layout from '../components/Layout'
import { Col, Form, Row, TimePicker, message } from 'antd'
import Input from 'antd/es/input/Input'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {showLoading,hideLoading} from '../redux/features/alertSlice'
import axios from "axios"
import moment from 'moment'
import API_BASE_URL from '../services/api'
const ApplyDoctor = () => {
  const {user}=useSelector(state => state.user)
const dispatch=useDispatch()
const navigate=useNavigate()


//handle form
const handleFinish=async(values)=>{
try {
  dispatch(showLoading())
const response= await axios.post(`${API_BASE_URL}/api/apply-doctor`,{...values, userId:user._id,
timings:[
  moment(values.timings[0]).format("HH:mm"),
  moment(values.timings[1]).format("HH:mm"),
 ]


},{
headers:{
  Authorization: `Bearer ${localStorage.getItem("token")}`
}
})
dispatch(hideLoading())
if(response.data.Message){
  message.success(response.data.Message)
  navigate('/')
}

} catch (error) {
  console.log(error)
  dispatch(hideLoading())
  message.error("SomeThing Went Wrong")
}
    
}

  return (
    <Layout>
 <h1 className=' text-white text-center mt-2 display-6 font-weight-bold            '   >Apply To Doctor <hr className=' text-purple border-2'/></h1>
<Form layout="vertical" onFinish={handleFinish} className='m-3'  >
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
    </Layout>
  )
}

export default ApplyDoctor
