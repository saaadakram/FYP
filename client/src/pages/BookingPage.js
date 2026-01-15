import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import "../styles/booking.css"
import axios from "axios"
import API_BASE_URL from '../services/api'
import { useParams } from 'react-router-dom'
import { DatePicker, TimePicker, message } from 'antd'
import moment from "moment"
import {  useDispatch,useSelector } from 'react-redux'
import {showLoading,hideLoading} from '../redux/features/alertSlice'

const BookingPage = () => {

    const {user}=useSelector(state=> state.user)
    const[doctors,setDoctors]=useState([])
    const params=useParams()
    const dispatch=useDispatch()
    const [date,setDate]=useState()
    const[time,setTime]=useState()
    const [name,firstName]=useState("")
    const [lastname,lastName]=useState("")
    const [phone,setPhone]=useState("")
    const [isAvailable,setIsAvailable]=useState()
    ////Login User DAta
   
    const getUser=async()=>{
try {
    const res=await axios.post(`${API_BASE_URL}/api/doctor/getdoctorbyid`,
    {doctorId: params.doctorId},
    {
     headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
     }   
    })
    if(res.data.success){
        setDoctors(res.data.data)
    }

} catch (error) {
    console.log(error)
    
}




    }
//////////Booking function//
const handleBooking=async()=>{
    try {
        setIsAvailable(true)
    if(!date && !time){
        return alert("Date And Time Required")
    }
        dispatch(showLoading())
    const res= await axios.post(`${API_BASE_URL}/api/book-appointment`,
    {doctorId: params.doctorId,
    userId:user._id,
    doctorInfo:doctors,
    userInfo:user,
    firstName:name,
    lastName:lastname,
    date:date,
    phone:phone,
    time:time,
    },
    {
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    dispatch(hideLoading())
    if(res.data.success){
        message.success(res.data.message)
    }
        
    } catch (error) {
        dispatch(hideLoading())
        console.log(error)
    }
}

//////////////// Check Availability
const chekAvail=async()=>{
try {
    dispatch(showLoading())
    const res= await axios.post(`${API_BASE_URL}/api/booking-availability`,
    {doctorId:params.doctorId, date,time},
    {  headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }}
    )
    dispatch(hideLoading())
if(res.data.success){
    setIsAvailable(true)
    message.success(res.data.message)
}else{
    message.error(res.data.message)
}

} catch (error) {
    dispatch(hideLoading())
    console.log(error)
}




}


    useEffect(()=>{
        getUser()
 
    
    
    },[])
    




  return (
    <Layout>
   
      <h1 className=' text-white text-center mt-2 display-6 font-weight-bold            '   >Book Your Appointmnet <hr className=' text-purple border-2'/></h1>
<div className='container'  >
<div className='row'>
{doctors && (
    <div className='col col-md-6 overflow-hidden '>
    <h4 className='upeer'>Dr.{doctors.firstName} {doctors.lastName}   </h4>

    <h4 className=' upeer'>Fees<b className='mx-1 '>:</b> {doctors.feePerConsultation}  </h4>
    <h4 className='upeer'>Timings<b className='mx-1 '>:</b> {doctors.timings} </h4>
   <div className='d-flex flex-column w-50'     >
   <DatePicker className=' my-1 inn' format="DD-MM-YYYY"  onChange={(value)=>setDate(moment(value).format("DD-MM-YYYY"))}  />
   <TimePicker className=' my-1 inn ' format="HH-mm" onChange={(value)=> setTime(
   moment(value).format("HH-mm"),)}/>
   
   
    <input className=' text-dark   border rounded p-1 my-1 in mx-auto ' value={name} onChange={(e)=>firstName(e.target.value)} required  type="text"  placeholder="Enter Your Name" />
    <input className=' text-dark border rounded p-1 my-1  in mx-auto ' value={lastname} onChange={(e)=>lastName(e.target.value)} required type="text"  placeholder="Enter Your last Name" />
    <input className=' text-dark border rounded p-1 my-1  in mx-auto  ' value={phone} onChange={(e)=>setPhone(e.target.value)} required type='text' placeholder='Enter Your Phone Number'   />
   <button className='btn btn-primary mt-3' onClick={chekAvail}  >Check Availablility</button>

    <button className='btn btn-dark mt-3 ' onClick={handleBooking}  >Book Now</button>
  
   </div>




    </div>
) }
<div className=' col col-md-6'>
<img src="/images/mockup-pazienti-5.png" class="img-fluid" alt="Mockup Pazienti Image"/>
</div>


</div>
</div>





    </Layout>
  )
}

export default BookingPage
