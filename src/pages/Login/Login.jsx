import React from 'react'
import "./Login.css"
import LoginTile from '../../components/LoginTile/LoginTile'
import arcanix from '../../assets/icons/arcanix-purple.svg';
import asma from '../../assets/icons/asma-full-logo.svg';

export default function Login() {
  return (
    <div className='Login'>
      <div className='login_container'>
        <LoginTile/>
      </div>
      <div className="developers">
        <img src={arcanix} alt='' />
        <div className='vertical-line' />
        <img src={asma} alt='' />
      </div>
    </div>
  )
}
