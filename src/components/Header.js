import React from 'react'
import ipfsLogo from '../../static/ipfs-logo.svg'

const Header = () =>
  <header className='flex items-center pa3 bg-navy'>
    <a className='w-50' href='https://ipfs.io' target='_blank' title='ipfs.io'>
      <img src={ipfsLogo} height='50' />
    </a>
    <h1 className='w-50 ma0 tr f3 fw2 montserrat aqua'>IPFS Gateways</h1>
  </header>

export default Header
