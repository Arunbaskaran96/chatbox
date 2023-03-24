
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


import './Pages.css'

function Messages() {
  const[msg,setMsg]=useState([])
  const [disable,setDisable]=useState(false)
  const params=useParams()

  useEffect(()=>{
    getMessages()
  },[])

  const getMessages=async()=>{
    try {
      const message=await axios.get(`http://localhost:8000/messages/${params.id}`,{
        headers:{
          Authorization:`${window.localStorage.getItem("token")}`
        }
      })
      setMsg(message.data)
      console.log(message.data)
      console.log(message.data)
    } catch (error) {
      console.log(error)
    }
  }

  const formik=useFormik({
    initialValues:{
      msg:""
    },
    validate:()=>{},
    onSubmit:async(value)=>{
      try {
        setDisable(true)
        await axios.post(`http://localhost:8000/message/${params.id}`,value,{
          headers:{
            Authorization:`${window.localStorage.getItem("token")}`
          }
        })
        setDisable(false)
        getMessages()
      } catch (error) {
        setDisable(false)
        console.log(error)
      }
    }
  })

  return (
    <div className='container-fluid message-container'>
      <div className='row'>
        <div className='col-12 text-center'>
          <h5 className='container-heading'>CHAT AREA</h5>
        </div>
      </div>
      <div className='row'>
        <div className='col-3'></div>
        <div className='col-6   '>
          {
            msg.length>0?msg.map((item)=>{
              return(
                <div className='chat-mini-container'>
                  <img className='user-img'  src={item.senderId.img} alt="user-img"/>
                <span className='user-msg-name'>{item.senderId.name}--</span>
                <span className='user-msg'>{item.msg}</span><br/>
                </div>
              )
            }):<p>No Conversation Started</p>
          }
        </div>
        <div className='col-3'></div>
      </div>
      <div className='row textarea'>
        <form onSubmit={formik.handleSubmit}>
        <div className='col-12 text-center input-text-container'>
          <textarea className='chat-box' placeholder='Type your message here...' name='msg' onChange={formik.handleChange} value={formik.values.msg}></textarea>
          <button disabled={disable} className='btn-send' type='submit'>
          <i class="fa-regular fa-paper-plane sent-img"></i>
          </button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default Messages