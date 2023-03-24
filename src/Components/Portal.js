import React from 'react'
import { Outlet } from 'react-router-dom'
import Topbar from './Topbar'

function Portal() {
  return (
    <div>
        <Topbar/>
        <Outlet></Outlet>
    </div>
  )
}

export default Portal