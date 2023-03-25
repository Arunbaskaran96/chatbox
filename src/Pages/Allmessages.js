import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Pages.css'

function Allmessages() {
    const [friends,setFriends]=useState([])
    const[curruser,setCurruser]=useState([])
    const[currentUser,setCurrentuser]=useState(null)

    useEffect(()=>{
        getFriends()
    },[])

    const getFriends=async()=>{
        try {
            const friend=await axios.get("https://forgotpassword-g94p.onrender.com/friendslist",{
                headers:{
                    Authorization:`${window.localStorage.getItem("token")}`
                }
            })
            setFriends(friend.data)

        } catch (error) {
            console.log(error)
        }
    }
    const chat=async(item)=>{
        try {
            const user=await axios.get(`https://forgotpassword-g94p.onrender.com/messages/${item.friendid._id}`,{
                headers:{
                    Authorization:`${window.localStorage.getItem("token")}`
                }
            })
            setCurruser(user.data)
            console.log(user.data)
            const findUser=await axios.get(`https://forgotpassword-g94p.onrender.com/user/${item.friendid._id}`,{
                headers:{
                    Authorization:`${window.localStorage.getItem("token")}`
                }
            })
            setCurrentuser(findUser.data)
            console.log(findUser.data)
        } catch (error) {
            console.log(error)
        }
    }

    const chatting=async(currentUser)=>{
        try {
            await axios.post(`https://forgotpassword-g94p.onrender.com/message/${currentUser._id}`,{
                headers:{
                    Authorization:`${window.localStorage.getItem("token")}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    // const formik=useFormik({
    //     initialValues:{
    //         msg:""
    //     },
    //     validate:()=>{},
    //     onSubmit:async(value)=>{
    //         try {
    //             await axios.post(`http://localhost:8000/message`,value,{
    //                 headers:{
    //                     Authorization:`${window.localStorage.getItem("token")}`
    //                 }
    //             })
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    // })
  return (
    <div className='container-fuid'>
        <div className='row'>
            <div className='col-4'>
                <div className='row' style={{marginBottom:"30px"}}>
                    <div className='col-12 text-center'>
                        <h4 className='container-heading'>Friends</h4>
                    </div>
                </div>
                <div className='row text-center'>
                    {
                        friends.length>0?(
                            friends.map((item)=>{
                                return(
                                    <div className='col-12 chatuser-container' onClick={()=>chat(item)}>
                                        <h6 className='chatuser-name'>{item.friendid.name}</h6>
                                    </div>
                                )
                            })
                        ):(<div className='col-12 text-center'>You have no friend</div>)
                    }
                </div>
            </div>
            <div className='col-5'>
                <div className='row'>
                    Chat Area
                </div>
                <div className='row'>
                {
                    curruser.length===0?(<div>no conversation</div>
                    ):(
                    <div className='col-12 '>
                        {
                            curruser.map((item)=>{
                                return(
                                    <>
                                    <div className='chat-mini-container '>
                                        <img className='user-img'  src={item.senderId.img} alt="user-img"/>
                                        <span className='user-msg-name'>{item.senderId.name}--</span>
                                        <span className='user-msg'>{item.msg}</span><br/>
                                    </div>
                                    </>
                                )
                            })
                        }
                    </div>
                    )
                }
                </div>

            </div>
        </div>
    </div>
  )
}

export default Allmessages