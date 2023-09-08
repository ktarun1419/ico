import React from 'react'
import './Navbar.css'
import Logo from'../../assets/logo.png'
import { Web3Button } from '@web3modal/react'
const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='logo'>
            <img src={Logo} />
            <h1>AIMB</h1>
        </div>
        <Web3Button />
    </div>
  )
}

export default Navbar