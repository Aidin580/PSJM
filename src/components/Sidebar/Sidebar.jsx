import React, { useState } from 'react'
import styles from "./Sidebar.module.css";
import dashboard from "../../assets/icons/Dashboard.svg"
import coming_soon from "../../assets/icons/coming-soon.svg"
import asma from "../../assets/icons/asma.svg"
import asmafull from "../../assets/icons/asma-full-logo.svg"
import addFeild from '../../assets/icons/addFeild.svg';
import addBook from '../../assets/icons/addBook.svg';
import addSchool from '../../assets/icons/addSchool.svg';
import addStudent from '../../assets/icons/addStudent.svg';
import addTeacher from '../../assets/icons/addTeacher.svg';
import set_year from '../../assets/icons/edu-set-year.svg';
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import insta from "../../assets/icons/insta.svg"
import llink from "../../assets/icons/link.svg"



export default function Sidebar() {
  const [open, setopen] = useState(false);
  const inm = () => {
    setopen(true);
  }
  const outm = () => {
    setopen(false);
  }
  const { user } = useAuth();


  return (
    <>
      <div className={open && styles.open} onClick={outm}>
      </div>
      <div className={`${styles.sidebar} ${open && styles.sidebaropen}`} onClick={inm} >
        <div onClick={(e) => { e.stopPropagation() }} className={styles.top}>
          {user?.role !== 'teacher' && (<NavLink to={'/'} className={styles.items} ><img alt='' src={dashboard} /><div className={styles.line} />{open && <p>داشبورد</p>}</NavLink>)}
          <NavLink to={'/coming-soon'} className={styles.items} ><img alt='' src={coming_soon} /><div className={styles.line} /> {open && <p>نظارت و بررسی</p>}</NavLink>
          <NavLink to={'/Record'} className={styles.items} ><img alt='' src={set_year} /><div className={styles.line} />{open && <p>کارنامه و آمار تحصیلی</p>}</NavLink>

          {(user?.role !== 'teacher' || user?.role === 'deputy') && (<div className={styles.bigitems} >
            <NavLink to={'/feildList'} className={styles.under}>
              <img alt='' src={addFeild} /><div className={styles.line} />{open && <p>افزودن رشته</p>}
            </NavLink>
            <NavLink to={'/bookList'} className={styles.under}>
              <img alt='' src={addBook} /><div className={styles.line} />{open && <p>افزودن دروس</p>}
            </NavLink>
            <NavLink to={'/schoolList'} className={styles.under}>
              <img alt='' src={addSchool} /><div className={styles.line} />{open && <p>افزودن آموزشگاه</p>}
            </NavLink>
            <NavLink to={'/i-dont-know'} className={styles.under}>
              <img alt='' src={addStudent} /><div className={styles.line} />{open && <p>مدیریت و افزودن دانش آموزان</p>}
            </NavLink>
            <NavLink to={'/i-dont-know'} className={styles.under}>
              <img alt='' src={addTeacher} /><div className={styles.line} />{open && <p>مدیریت و افزودن دبیران</p>}
            </NavLink>
          </div>)}


        </div>
        <div className={styles.bottom} >

          {open && <>
            <img src={asmafull} alt='Logo'></img>
            <div className={styles.bottomr}>
              <h3>تمامی حقوق محفوظ گروه اسما</h3>
              <p>وبسایت رسمی<img src={llink} alt='' /></p><p>AsmaGroup.ir<img src={insta} alt='' /></p>
            </div>
          </>}


          {!open && <img src={asma} alt='Logo'></img>}

        </div>
      </div>
    </>

  )
}
