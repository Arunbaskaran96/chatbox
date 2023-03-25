import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Pages.css'

function Login() {
  const nav=useNavigate()
  const[disable,setDisable]=useState(false)
  const formik=useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validate:(value)=>{
      let errors={}
      if(!value.email){
        errors.email="Please Enter Your Email"
      }
      if(!value.password){
        errors.password="Please Enter Your Password"
      }

      return errors
    },
    onSubmit:async(value)=>{
      try {
        setDisable(true)
        const user=await axios.post("https://forgotpassword-g94p.onrender.com/login",value)
        window.localStorage.setItem("token",user.data.token)
        nav("/topbar/friends")
      } catch (error) {
        setDisable(false)
        console.log(error)
      }
    }
  })
  return (
    <div className='container-fluid'>
        <div className='row'>
          <div className='col-4  login-leftside'>
            <div className='row'>
              <div className='col-12'>
              <img className='login-image' src='https://www.adsumsoftware.com/blog/wp-content/uploads/2023/03/chat-app-development.png' alt='login-images'/>
              </div>
            </div>
            <div className='row'>
              <div className='col-12 text-center' style={{marginTop:"100px"}}>
                <h5 className='signup-heading'>Don't have an account?</h5>
                <Link to="/register" className='signup-button'>Sign Up</Link>
              </div>
            </div>
          </div>
          <div className='col-8 login-rightside'>
            <div className='row login-card' >
              <div className='col-12 text-center'>
                <h4 className='login'>Login</h4>
              </div>
            </div>
            <div className='row login-main-card'>
              <form onSubmit={formik.handleSubmit}>
                <div className='col-12 text-center'>
                  <label for="emailid" className='login-lbl login-email'>Email</label><br/>
                  <input id="emailid" name='email' value={formik.values.email} onChange={formik.handleChange} className='login-int' type='email' ></input><br/>
                  <span style={{color:"red"}}>{formik.errors.email}</span><br/>
                  <label for="pass" className='login-lbl'>Password</label><br/>
                  <input id="pass"  name='password' className='login-int'  value={formik.values.password} onChange={formik.handleChange} type='password' ></input><br/>
                  <span style={{color:"red"}}>{formik.errors.password}</span><br/>
                  <input disabled={disable} className='signin-button' type="submit" value="Login"></input><br/>
                </div>
              </form>
            </div>
            <div className='row'>
              <div className='col-12 text-center'>
              <Link style={{textDecoration:"none"}} to="/topbar/home" className='forgot-button' type="submit" value="Forgot-password">Forgot Password</Link><br/>
              </div>
            </div>
            <div className='row' style={{marginTop:"100px"}}>
              <div className='col-12 text-center'>
                <h6>User Credential</h6>
                <p className='login-para'>Email:arundhilla@gmail.com</p>
                <p className='login-para'>Password:Arun</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Login