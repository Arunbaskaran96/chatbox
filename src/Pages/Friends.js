import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Friends() {
  const [users,setUsers]=useState([])
  const[disable,setDisable]=useState(false)

  useEffect(()=>{
    getFriends()
  },[])

  const getFriends=async()=>{
    const friend=await axios.get("https://forgotpassword-g94p.onrender.com/friendslist",{
      headers:{
        Authorization:`${window.localStorage.getItem("token")}`
      }
    })
    setUsers(friend.data)
    console.log(friend.data)
  }

  const Remove=async(item)=>{
    try {
      setDisable(true)
      await axios.delete(`https://forgotpassword-g94p.onrender.com/remove/${item._id}`,{
        headers:{
          Authorization:`${window.localStorage.getItem("token")}`
        }
      })
      alert("Removed Successfully")
      getFriends()
      setDisable(false)
    } catch (error) {
      setDisable(false)
      console.log(error)
    }
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 text-center'>
          <h4 className='container-heading'>Friends List</h4>
        </div>
      </div>
      <div className='row'>
        {
          users.map((item)=>{
            return(
              <div className='col-4'>
                <div className='user-card-container'>
                  <img className='user-image' src={item.friendid.img} alt=''/>
                  <div>
                    <h4 className='user-name'>{item.friendid.name}</h4>
                    <Link  to={`/topbar/messages/${item.friendid._id}`} className='btn btn-primary btn-sm user-bttn'>Message</Link>
                    <button disabled={disable} onClick={()=>Remove(item)} className='btn btn-danger btn-sm'>Remove</button><br/>
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

export default Friends