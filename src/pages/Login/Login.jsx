import React from 'react'
import "./Login.css"
import LoginTile from '../../components/LoginTile/LoginTile'
import LoginFooter from '../../components/LoginFooter/LoginFooter'
import LoginImg from "../../components/LoginImg/LoginImg"
import News from '../../components/News/News'

export default function Login() {
  return (
    <div className='Login'>
    <div className='Login--Right'>
       <LoginTile/>
     <LoginFooter/>
    </div>
     <div className='Login--Left'>
      <LoginImg/>
      <News/>
     </div>
    </div>
  )
}
