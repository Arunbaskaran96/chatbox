import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function ViewUser() {
  const[user,setUser]=useState({})
  const params=useParams()

  useEffect(()=>{
    getUser()
  },[])

  const getUser=async()=>{
    try {
      const person=await axios.get(`https://forgotpassword-g94p.onrender.com/user/${params.id}`,{
        headers:{
          Authorization:`${window.localStorage.getItem("token")}`
        }
      })
      setUser(person.data)
      console.log(person.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-12'>
                <Link to="/topbar/users"><i class="fa-solid fa-backward icon"></i></Link>
            </div>
        </div>
        <div className='row'>
          <div className='col-12 text-center view-container'>
            <div className='viewuser-minicard'>
              <div>
                <img className='viewuser-img' src={user.img} alt="user-image"/>
              </div>
              <div>
                <p><strong>Name   :</strong> {user.name}</p>
                <p><strong>Email   :</strong>{user.email}</p>
                <p><strong>Mobile   :</strong>{user.mobile}</p>
                <p><strong>City   :</strong>{user.city}</p>
                <button className='btn btn-secondary'>Friends List</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ViewUser