import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Pages.css'

function Register() {
  const nav=useNavigate()
  const[disable,setDisable]=useState(false)
  const formik=useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      city:"",
      mobile:"",
      img:""
    },
    validate:(value)=>{
      let errors={}

      if(!value.name){
        errors.name="Please Enter your name"
      }
      if(!value.email){
        errors.email="Please Enter your Email"
      }
      if(!value.password){
        errors.password="Please Enter your Password"
      }
      if(!value.mobile){
        errors.mobile="Please Enter your Mobile No"
      }
      if(!value.city){
        errors.city="Please Enter your city"
      }
      if(!value.img){
        errors.img="Please Add your Image Url"
      }

      return errors
    },
    onSubmit:async(value)=>{
      try {
        await axios.post("http://localhost:8000/register",value)
        alert("Suceessfully created")
        nav("/")
      } catch (error) {
        setDisable(false)
        console.log(error)
      }
    }

  })
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12'>
        <Link to="/"><i class="fa-solid fa-backward icon"></i></Link>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className='row'>
          <div className='col-12 reg-container'>
            <div className='reg-leftside'>
              <label className='reg-lbl'>Name</label><br/>
              <input className='reg-int'  name='name' value={formik.values.name} onChange={formik.handleChange}></input><br/>
              <span style={{color:"red"}}>{formik.errors.name}</span><br/>
              <label className='reg-lbl'>Email</label><br/>
              <input className='reg-int' name='email' value={formik.values.email} onChange={formik.handleChange}></input><br/>
              <span style={{color:"red"}}>{formik.errors.email}</span><br/>
              <label className='reg-lbl'>Password</label><br/>
              <input className='reg-int' name='password' value={formik.values.password} onChange={formik.handleChange}></input><br/>
              <span style={{color:"red"}}>{formik.errors.password}</span><br/>
            </div>
            <div className='reg-rightside'>
              <label className='reg-lbl'>Mobile</label><br/>
              <input className='reg-int' name='mobile' value={formik.values.mobile} onChange={formik.handleChange}></input><br/>
              <span style={{color:"red"}}>{formik.errors.mobile}</span><br/>
              <label className='reg-lbl'>City</label><br/>
              <input className='reg-int' name='city' value={formik.values.city} onChange={formik.handleChange}></input><br/>
              <span style={{color:"red"}}>{formik.errors.city}</span><br/>
              <label className='reg-lbl'>Image Url</label><br/>
              <input className='reg-int' name='img' value={formik.values.img} onChange={formik.handleChange}></input><br/>
              <span style={{color:"red"}}>{formik.errors.img}</span><br/>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 text-center'>
            <button disabled={disable} className='btn btn-success'>Create</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register