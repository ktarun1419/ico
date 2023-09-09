import React from 'react'
import './Navbar.css'
import Logo from'../../assets/logo.png'
import { useConnectWallet } from '@web3-onboard/react'
// import { Web3Button } from '@web3modal/react'
const Navbar = () => {
  const addressShortner=(address)=>{
    let newAddress=String(address).slice(0,4)+'....'+String(address).slice(38,42)
    return newAddress
  }
  const connectWallet=()=>{
    if (wallet) {
      disconnect(wallet)
    }else{
      connect()
    }
  }
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  console.log({wallet,connecting});
  return (
    <div className='navbar'>
        <div className='logo'>
            <img src={Logo} />
            <h1>AIMB</h1>
        </div>
        <button className='connect_wallet' onClick={connectWallet} >{wallet ? addressShortner(wallet.accounts[0]?.address):'Connect'}</button>
        {/* <Web3Button /> */}
    </div>
  )
}

export default Navbar