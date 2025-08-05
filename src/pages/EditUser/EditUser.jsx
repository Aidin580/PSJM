import React from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import style from './EditUser.module.css'
import UserEditHeader from '../../components/UserEditHeader/UserEditHeader';
import UserEdit from '../../components/UserEdit/UserEdit'


export default function Hozor() {
  return (
    <div className='Dashboard'>
      <Header />
      <div className='App-Container'>
        <Sidebar />
        <div className='Main-Content'>
            <UserEditHeader />
            <UserEdit/>
        </div>
      </div>
    </div>
  );
}
