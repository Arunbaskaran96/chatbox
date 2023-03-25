import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./Pages.css"

function Users() {
  const [users,setUsers]=useState([])
  const [disable,setDisable]=useState(false)

  useEffect(()=>{
    getUsers()
  },[])

  const getUsers=async()=>{
    try {
      const user=await axios.get("https://forgotpassword-g94p.onrender.com/users",{
        headers:{
          Authorization:`${window.localStorage.getItem("token")}`
        }
      })
      setUsers(user.data)
    } catch (error) {
      console.log(error)
    }
  }

  const addFriend=async(item)=>{
    setDisable(true)
    try {
      await axios.post(`https://forgotpassword-g94p.onrender.com/addfriend/${item._id}`,item,{
        headers:{
          Authorization:`${window.localStorage.getItem("token")}`
        }
      })
      alert("successfully added")
      setDisable(false)
    } catch (error) {
      setDisable(true)
      console.log(error)
    }
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 text-center'>
          <h4 className='container-heading'>Users</h4>
        </div>
      </div>
      <div className='row'>
        {
          users.map((item)=>{
            return(
              <div className='col-md-4'>
                <div className='user-card-container'>
                  <img className='user-image' src={item.img} alt=''/>
                  <div>
                    <h4 className='user-name'>{item.name}</h4>
                    <Link to={`/topbar/viewuser/${item._id}`} className='btn btn-primary btn-sm user-bttn'>View</Link>
                    <button disabled={disable} onClick={()=>addFriend(item)} className='btn btn-success btn-sm'>Add Friend</button><br/>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Users