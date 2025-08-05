import React from 'react'
import styles from "./EditSchoolHeader.module.css"
import profile from "../../assets/icons/Profile.svg"
import react from 'react'

export default function EditSchoolHeader() {
  



  return (
    <div className={styles.container}>
      <div className={styles.profile}>
       <img src='' alt='' />
      </div>
      <div className={styles.schoolname}>
        <div className={styles.header}>
          <p>نام آموزشگاه</p>
          <img src={profile} alt=''/>
        </div>
        <h2>هنرستان فنی و حرفه ای سید نظام فصیحی لنگرودی</h2>
      </div>
      <div className={styles.adminname}>
         <div className={styles.header}>
          <p>مدیر</p>
          <img src={profile} alt=''/>
        </div>
        <h2>فرزاد باهک</h2>
      </div>
    </div>
  )
}
