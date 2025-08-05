import React, { useState, useEffect, useRef } from 'react'
import styles from "./Headerdown.module.css"
import arrow from "../../assets/icons/Drop.svg"

import profile from "../../assets/images/Rectangle 464.png"
import setting from "../../assets/icons/setting.svg"
import bell from "../../assets/icons/Alarm-set.svg"
import Logout from "../../assets/icons/Logout.svg"
import hozor from "../../assets/icons/hozor&ghiyab.svg"
import record from "../../assets/icons/record.svg"
import editprofile from "../../assets/icons/editprofile.svg"
import editschool from "../../assets/icons/editschool.svg"
import bold from "../../assets/icons/Bold.svg"
import dark from "../../assets/icons/darmode.svg"
import dashbord from "../../assets/icons/Dashboard.svg"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../Context/AuthContext";

const Listitem = ({ object, id, activeDropdownId, setActiveDropdownId }) => {
  const dropdownRef = useRef(null);
  const showitem = activeDropdownId === id;

  const handelopen = () => {
    setActiveDropdownId(showitem ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInside = dropdownRef.current && dropdownRef.current.contains(event.target);
      const isMainClick = event.target.id === 'main' || event.target.closest('#main');
      const isException = event.target.closest('.ignore-closes');

      if ((!isClickInside || isMainClick) && !isException) {
        setActiveDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isOn, setIsOn] = useState(true);

  const toggle = () => {
    setIsOn(!isOn);
  };




  return (
    <div className={`${styles.dropdown} ignore-close ignore-closes `} ref={dropdownRef} style={{ paddingBottom: showitem ? "20px" : "" }} onClick={handelopen}>
      <div className={styles.dropdowntitle}>
        <img src={arrow} alt="" />
        <div className={styles.dropdowntitleinfo}>
          {object.position && <p className={styles.dropdowntitleinfopos}>سمت : {object.position}</p>}
          <p>{object.name}</p>
          <img src={object.image} alt="" />
        </div>
      </div>

      {showitem && (
        <>
          <div className={`${styles.dropdowncontent}  ignore-close ignore-closes ${object.itemone ? styles.dropdownzang : ""}`}>
            <p>{object.itemonetext}</p>
            {object.itemoneimg && <img src={object.itemoneimg} alt="" />}
          </div>

          <div className={`${styles.dropdowncontent} ignore-close ignore-closes ${object.itemtwo ? styles.dropdownzangtwo : ""}`}>
            <p>{object.itemtwotext}</p>
            {object.itemtwo && (
              <div className={`${styles.switchContainer} ignore-close ignore-closes ${isOn ? styles.on : styles.off}`} onClick={toggle}>
                <span className={styles.switchLabel}>{isOn ? 'روشن' : 'خاموش'}</span>
                <div className={styles.switchCircle}></div>
              </div>
            )}
            {object.itemtwoimg && <img src={object.itemtwoimg} alt="" />}
          </div>
        </>
      )}
    </div>
  );
};
export default function Headerdown({ headerdown }) {
  const { logout , user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.stopPropagation();
    e.preventDefault();

    logout();
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  const dropdownReff = useRef(null);
  const objects = [
    {
      name: "فرزاد باهک",
      position: "مدیر",
      image: profile,
      itemonetext: "ویرایش اطلاعات کاربری",
      itemtwotext: "ویرایش اطلاعات مدرسه",
      itemoneimg: editprofile,
      itemtwoimg: editschool
    }, {
      name: "تنظیمات",

      image: setting,
      itemonetext: "برجسته کردن متون",
      itemtwotext: "فعال سازی حالت تاریک",
      itemoneimg: bold,
      itemtwoimg: dark
    }, {
      name: "زنگ هوشمند",

      image: bell,
      itemonetext: "زدن زنگ بصورت دستی",
      itemtwotext: "زنگ اتوماتیک",
      itemone: true,
      itemtwo: true
    }]

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInside = dropdownReff.current && dropdownReff.current.contains(event.target);
      const isMainClick = event.target.id === 'main' || event.target.closest('#main');
      const isException = event.target.closest('.ignore-close');

      if ((!isClickInside || isMainClick) && !isException) {
        headerdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [headerdown]);

  const [activeDropdownId, setActiveDropdownId] = useState(null);
  return (
    <div ref={dropdownReff} className={styles.headerlist}>
      {objects.map((item, index) => (
        <Listitem
          key={index}
          id={index}
          object={item}
          activeDropdownId={activeDropdownId}
          setActiveDropdownId={setActiveDropdownId}
        />
      ))}
      {user?.role !== 'teacher' && (<Link to={"/"} className={styles.listitem}>ورود به داشبورد<img src={dashbord} alt=''></img></Link>)}
      <Link to={"/Hozor"} className={styles.listitem}>ورود به بخش حضور غیاب<img src={hozor} alt=''></img></Link>
      <Link to={"/Record"} className={styles.listitem}>ورود به بخش کارنامه<img src={record} alt=''></img></Link>
      <button onClick={handleLogout} className={styles.listitem}>خروج از حساب کاربری<img src={Logout} alt=''></img></button>
    </div>
  );
}
