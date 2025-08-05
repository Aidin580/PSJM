import React, { useState, useEffect } from 'react';
import styles from "./DashboardTile.module.css"
import student from "../../assets/icons/student.svg"
import teacher from "../../assets/icons/teachers.svg"
import kadr from "../../assets/icons/kadr.svg"
import calender from "../../assets/icons/work-list.svg"
import { NavLink } from "react-router-dom";
import api, { endpoints } from "../../config/api";

export default function DashboardTile() {
        const [datas, setdatas] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError(null);
      try {
        

      

        const response = await api.get(endpoints.dashboard);
        
        console.log(response)
        const teacherdata = Array.isArray(response.data.data) ? response.data.data : [];
        setdatas(teacherdata);

      } catch (err) {
        
        const serverMessage = err.response?.data?.message || err.response?.data?.error || JSON.stringify(err.response?.data);

        if (serverMessage) {
          setError(`پیام سرور: ${serverMessage}`);
        } else if (err.request) {
          setError("خطای شبکه: پاسخی از سرور دریافت نشد.");
        } else {
          setError(`خطای ناشناخته در تنظیم درخواست: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className={styles.container}>
    <div className={styles.tiles}>
      <NavLink to={"/"} className={styles.tile}>
          <div className={styles.header}>
            <p className={styles.title}>کل دانش آموزان</p>
            <img src={student} alt=""/>
            </div>  
            <div className={styles.content}>
              <h1>۱۱۴۲۶</h1>
            </div>
      </NavLink>
      <NavLink to={"/teachers"} className={styles.tile}>
          <div className={styles.header}>
            <p className={styles.title}>کل دبیران حاضر</p>
            <img src={teacher} alt=""/>
            </div>  
            <div className={styles.content}>
              <h1>۶۲۴</h1>
            </div>
      </NavLink>
      <NavLink to={"/members"} className={styles.tile}>
          <div className={styles.header}>
            <p className={styles.title}>کل کادر های آموزشگاه</p>
            <img src={kadr} alt=""/>
            </div>  
            <div className={styles.content}>
              <h1>۱۲۷</h1>
            </div>
      </NavLink>
      <NavLink to={"/week"} className={styles.tile}>
          <div className={styles.header}>
            <p >لیست کل مدارس</p>
            <img src={calender} alt=""/>
            </div>  
            <div className={styles.content}>
              <h1>۸۱</h1>
            </div>
      </NavLink>
    </div>
    </div>
  )
}
