import React from 'react'
import { Link } from 'react-router-dom'

function FriendsView() {
  return (
    <div className='container-fluid'>
    <div className='row'>
        <div className='col-12'>
            <Link to="/topbar/friends"><i class="fa-solid fa-backward icon"></i></Link>
        </div>
    </div>
</div>
  )
}

export default FriendsView