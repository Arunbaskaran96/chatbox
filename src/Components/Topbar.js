import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Components.css'

function Topbar() {
    const [ismobile,setMobile]=useState(false)
    const nav=useNavigate()
    const remove=()=>{
        window.localStorage.removeItem("token")
        nav("/")
    }
  return (
    <nav className='topbar-container'>
    <ul className='topbar-bio'>
        <h5 className='logo-container'>
        <i class="fa-sharp fa-solid fa-c your-logo"></i>
        </h5>
        <h4 className='bio'>Chat Box</h4>
    </ul>
    <ul  onClick={()=>{
        setMobile(false)
    }}  className={ismobile?"nav-links-mobile":"nav-links"}>
        <Link to='/topbar/users' className='about'>
            <li>Users</li>
        </Link>
        <Link to='/topbar/friends' className='skills'>
            <li>Friends</li>
        </Link>
        <Link to='/topbar/allmessages' className='projects'>
            <li>Messages</li>
        </Link>
        <Link to='/topbar/profile' className='projects' style={{fontSize:"25px"}}>
            <li><i class="fa-regular fa-user"></i></li>
        </Link>
        <li className='btn'>
            <button onClick={remove} className='btn btn-danger btn-sm'>Log Out</button>
        </li>
    </ul>
    <button onClick={()=>{
        setMobile(!ismobile)
    }} className='mobile-menu-icon'>
        {
            ismobile ?(<i className='fas fa-times'></i>
            ):(
                <i className='fas fa-bars'></i>
            )
        }
    </button>
</nav>
  )
}

export default Topbar