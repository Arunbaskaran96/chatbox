import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import './Pages.css'

function ForgotPassword() {
  const formik=useFormik({
    initialValues:{
      email:""
    },
    validate:(value)=>{
      let errors={}
      if(!value.email){
        errors.email="Please enter your email"
      }
      return errors
    },
    onSubmit:async(value)=>{
      try {
        await axios.post("https://forgotpassword-g94p.onrender.com/forgot",value)
      } catch (error) {
        console.log(error)
      }
    }
  })
  return (
    <div className='forgot-container'>
      <form onSubmit={formik.handleSubmit}>
        <div className='forgot-mini'>
          <label>Enter Your Email Here</label><br/>
          <input name='email' value={formik.values.email} onChange={formik.handleChange}  style={{width:"250px",marginBottom:"20px"}} type="email"></input><br/>
          <input className='btn btn-success' style={{marginLeft:"40px"}} type="submit" value="Submit"></input>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword