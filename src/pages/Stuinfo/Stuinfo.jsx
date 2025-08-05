import React from 'react'

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import StudentInfoTile from "../../components/StudentInfoTile/StudentInfoTile";

import { Outlet } from 'react-router-dom';

export default function Stuinfo() {
  return (
    <div className='Dashboard'>
    <Header/>
    <div className='App-Container'>
    <Sidebar/>
    <div className='Main-Content'>
    <StudentInfoTile/>
    <Outlet/>
    </div>
    </div>
   </div>
  )
}
