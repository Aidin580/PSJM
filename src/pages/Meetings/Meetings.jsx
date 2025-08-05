import style from './Meetings.module.css'
import React from 'react'
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { NavLink } from 'react-router-dom';
import Meeting from '../../components/Meeting/Meeting';
import Add from '../../assets/icons/add.svg'

export default function Meetings() {
  return (
    <div className={style.meetings}>

     <Header/>
     <div className='App-Container'>
     <Sidebar/>
     <div className='Main-Content'>
              <div className={style.balance}>   
            <div className={style.price}>
            <h1 >جلسات</h1>
            </div>
            <NavLink to={"/Meetings/Document"} className={style.button}>
                <img src={Add} alt="" />
                <p>سند جدید</p>
            </NavLink>
        </div>
        <Meeting/>
     </div>
     </div>
  
    </div>
  )
}
