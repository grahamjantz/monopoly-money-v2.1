import React from 'react'
import './Header.css'

import monopolyLogo from '../../images/monopolyLogo.png'

import { NavLink, useSearchParams } from 'react-router-dom'


const Header = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const roomId = searchParams.get('room_id')

  return (
    <div>
      <NavLink to='/' className='header'>
        <img src={monopolyLogo} className='monopoly-logo' alt='monopoly logo'/>
      </NavLink>
      {roomId ? (<p  className='header-room-code'>Room Code: {roomId}</p>) : ''}
    </div>
  )
}

export default Header