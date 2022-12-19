import React from 'react'
import './Footer.css'

import { BsFillSuitHeartFill } from "react-icons/bs";

const Footer = () => {
  return (
    <div className='footer'>
        <h5>Created with {<BsFillSuitHeartFill />}  and React + Redux</h5>
        <h6>by</h6>
        <h5>Graham Jantz</h5>
        <a href='https://github.com/grahamjantz/monopoly-money-v2.1' target='_blank' rel="noreferrer">Help</a>
    </div>
  )
}

export default Footer