import React, { useState } from 'react'
import '../styles/register.css'
import {useDispatch} from "react-redux"
import { showLoading,hideLoading } from '../redux/features/alertSlice'
import API_BASE_URL from '../services/api'
import {Link,useNavigate} from 'react-router-dom'



const Register = () => {
  const dispatch=useDispatch()
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

     const onfinishHandler=async(e)=>{
      e.preventDefault()
    
try {
  dispatch(showLoading())
let response= await fetch(`${API_BASE_URL}/api/register`,{
  method:"POST",
  body:JSON.stringify({name,email,password}),
  headers:{
    "content-type":"application/json"
  }
})
dispatch(hideLoading())
const data= await response.json()
alert(data.Message)


} catch (error) {
  dispatch(hideLoading())
  console.log(error)
}




    }

  return (
  <>
  <div className='sign-in__wrapper' >
   <div className="wrapper   ">
   <div className="logo">
    <img   src="/images/cropped-eyfdm-edited.png" alt />
  </div>
  <div className=' mt-3'>
   <h4 className=' text-center fw-semibold    '  >Create a<span className='  text-primary'>n account</span></h4></div>


  <form onSubmit={onfinishHandler} className="p-3  ">
  <div className="form-field d-flex align-items-center">
      <span className="far fa-user" />
      <input value={name} onChange={(e)=>setName(e.target.value)}  type="text"  placeholder="Enter Your Name" />
    </div>
    <div className="form-field d-flex align-items-center">
      <span className="far fa-user" />
      <input value={email} onChange={(e)=>setEmail(e.target.value)}  type="text"  placeholder="Enter Your Email" />
    </div>
    <div className="form-field d-flex align-items-center">
      <span className="fas fa-key" />
      <input value={password} onChange={(e)=>setPassword(e.target.value)}  type="text"  placeholder="Password" />
    </div>
    <button type='submit' className="btn mt-1 fw-semibold">Sign Up </button>
  </form>
  <div className="text-center fs-6 fw-medium">
    <Link to={"/login"}>Already have an account ?</Link>
  </div>
</div>
</div>


  </>
  )
}

export default Register
