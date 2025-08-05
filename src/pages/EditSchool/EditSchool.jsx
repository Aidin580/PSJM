import { useState, react } from "react";
import style from "./EditSchool.module.css"
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

import Amozeshgah from '../../assets/icons/Amozeshgah.svg';
import Profile from '../../assets/icons/Profile.svg';
import Nezam from '../../assets/images/nezam.png'
import AboutSchool from '../../components/AboutSchool/AboutSchool';
import { useAuth } from '../../Context/AuthContext';


export default function EditSchool() {
  const { logout, user } = useAuth();
  return (
    <div>
       <Header/>
           <div className='App-Container'>
           <Sidebar/>
           <div className='Main-Content' id='main'>
            <div className={style.tiles}>
              <div className={style.tile}>
                <img src={Nezam} alt="" />
              </div>

              <div className={style.tile}>
                <div className={style.header}>
                  <p>نام آموزشگاه</p>
                  <img src={Amozeshgah} alt="" />
                </div>
                <h1>هنرستان فنی و حرفه ای حاج سید نظام فصیحی</h1>
              </div>
              <div className={style.tile}>

                <div className={style.header}>
                  <p>مدیر</p>
                  <img src={Profile} alt="" />
                </div>
                <h1>{user?.profile?.first_name} {user?.profile?.last_name}</h1>
              </div>
            </div>
               <AboutSchool/>
           </div>
           </div>
    </div>
  )
}
