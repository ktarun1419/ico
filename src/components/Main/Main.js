import React from 'react'
import './Main.css'
import Navbar from '../navbar/Navbar'
import BuySection from '../buysection/BuySection'
const Main = () => {
  return (
    <div className='main'>
        <Navbar />
        <BuySection />
    </div>
  )
}

export default Main