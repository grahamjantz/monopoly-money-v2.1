import React from 'react'
import './Header.css'

import monopolyLogo from '../../images/monopolyLogo.png'
import { NavLink } from 'react-router-dom'

const header = () => {
  return (
    <div>
      <NavLink to='/' className='header'>
        <img src={monopolyLogo} className='monopoly-logo' alt='monopoly logo'/>
      </NavLink>
    </div>
  )
}

export default header