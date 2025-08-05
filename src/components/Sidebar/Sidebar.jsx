import React, { useState } from 'react'
import styles from "./Sidebar.module.css";
import dashboard from "../../assets/icons/Dashboard.svg"
import coming_soon from "../../assets/icons/coming-soon.svg"
import asma from "../../assets/icons/asma.svg"
import asmafull from "../../assets/icons/asma-full-logo.svg"
import { NavLink } from "react-router-dom";
import list from "../../assets/icons/doc-list.svg"
import cheq from "../../assets/icons/cheque.svg"
import meet from "../../assets/icons/meeting.svg"
import insta from "../../assets/icons/insta.svg"
import llink from "../../assets/icons/link.svg"
import { useAuth } from "../../Context/AuthContext";


import accc from "../../assets/icons/record.svg"

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
          <NavLink to={'/coming-soon'} className={styles.items} ><img alt='' src={coming_soon} /><div className={styles.line} /> {open && <p>بزودی</p>}</NavLink>
          <NavLink to={'/Record'} className={styles.items} ><img alt='' src={accc} /><div className={styles.line} />{open && <p>کارنامه و آمار تحصیلی</p>}</NavLink>

          {(user?.role !== 'teacher' || user?.role === 'deputy') && (<div className={styles.bigitems} >
            <NavLink to={'/Accounting'} className={styles.under}>
              <img alt='' src={accc} /><div className={styles.line} />{open && <p>حسابداری</p>}
            </NavLink>
            <NavLink to={'/a'} className={styles.under}>
              <img alt='' src={list} /><div className={styles.line} />{open && <p>لیست اسناد</p>}
            </NavLink>
            <NavLink to={'/b'} className={styles.under}>
              <img alt='' src={cheq} /><div className={styles.line} />{open && <p>لیست چک ها</p>}
            </NavLink>
            <NavLink to={'/Meetings'} className={styles.under}>
              <img alt='' src={meet} /><div className={styles.line} />{open && <p>جلسات</p>}
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
