import React from 'react'
import styles from "./UserEditHeader.module.css"
import user from "../../assets/icons/name.svg"
import schoolname from "../../assets/icons/schoolname.svg"
import permissiom from "../../assets/icons/permission.svg"

export default function EditSchoolHeader() {

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
       <img src='' alt='' />
      </div>
            <div className={styles.adminname}>
         <div className={styles.header}>
          <p>نام و نام خانوادگی</p>
          <img src={user} alt=''/>
        </div>
        <h2>فرزاد باهک</h2>
      </div>
          <div className={styles.permission}>
         <div className={styles.header}>
          <p> دسترسی </p>
          <img src={permissiom
            
          } alt=''/>
        </div>
        <h2>مدیریت</h2>
      </div>
      <div className={styles.schoolname}>
        <div className={styles.header}>
          <p>مدرسه</p>
          <img src={schoolname} alt=''/>
        </div>
        <h2>هنرستان فنی و حرفه ای سید نظام فصیحی لنگرودی</h2>
      </div>
    </div>
  )
}
