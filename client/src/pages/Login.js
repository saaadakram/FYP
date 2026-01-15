import React from 'react'
import '../styles/login.css'
import {useDispatch} from 'react-redux'
import { showLoading,hideLoading } from '../redux/features/alertSlice'
import {motion} from 'framer-motion'
import API_BASE_URL from '../services/api'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
const Login = () => {
  const dispatch=useDispatch()
const navigate=useNavigate()
const textVariants={
animate:{
  x:0,
  opacity:1,
  transition:{
    duration:1,
    staggerChildren:0.1
  }
},
scrolButton:{
  opacity:0,
  y:10,
  transition:{
    duration:2,
    repeat:Infinity
  }
}



}





const [email,setEmail]=useState('')
const [password,setPassword]=useState('')

   const onfinishHandler=async(e)=>{
    e.preventDefault()
  
try {
dispatch(showLoading())
let response= await fetch(`${API_BASE_URL}/api/login`,{
method:"POST",
body:JSON.stringify({email,password}),
headers:{
  "content-type":"application/json"
}
})
dispatch(hideLoading())
const data= await response.json()
alert(data.Message)
if(data.Message=="Login Successfull"){
  localStorage.setItem("token",data.token)
}
navigate("/")

} catch (error) {
dispatch(hideLoading())
console.log(error)
}




  }









  return (
<>
<div className=' d-flex '>
<div className='logo1'><motion.img  variants={textVariants} animate="scrolButton" src="/images/cropped-eyfdm-edited.png" alt /> </div>
<div><u className='line'><h2  className='text text-dark'>Medi<span className=' mate '>Mate</span></h2></u></div>
</div>
<div className="wrapper">

  <motion.div className="logo">
    <motion.img  variants={textVariants} animate="scrolButton" src="/images/cropped-eyfdm-edited.png" alt />
  </motion.div>
  <div className="text-center mt-4 name">
  <u><h4>Medi<span className=' mate'>Mate</span></h4></u>
  </div>
  <form onSubmit={onfinishHandler} className="p-3 mt-3">
    <div className="form-field d-flex align-items-center">
      <span className="far fa-user" />
      <input value={email} onChange={(e)=>setEmail(e.target.value)}  type="text"  placeholder="Enter Your Email" />
    </div>
    <div className="form-field d-flex align-items-center">
      <span className="fas fa-key" />
      <input value={password} onChange={(e)=>setPassword(e.target.value)}  type="text"  placeholder="Password" />
    </div>
    <button type='submit' className="btn mt-3">Login</button>
  </form>
  <div className="text-center fs-6">
    <a href="#">Forget password?</a> or <Link to={"/register"}>Sign up</Link>
  </div>
</div>







</>
  )
}

export default Login
