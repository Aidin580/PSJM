import React, { useEffect, useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';

import style from './Accounting.module.css';
import Header from '../../components/Header/Header.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import Add from '../../assets/icons/add.svg';
import Documents from '../../components/Documents/Documents.jsx';
import MobileErorr from '../../components/Erorr/Types/MobileErorr.jsx';
import PersianNumberFormatter from '../../utils/PersianNumberFormatter.jsx';

import { useAuth } from '../../Context/AuthContext.jsx';

export default function Accounting() {
  const { user, loading } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  // ✅ بررسی موبایل با عرض صفحه، نه userAgent
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 620);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ✅ فقط در production محدودیت موبایل اعمال میشه (اختیاری)
  if (process.env.NODE_ENV === 'production' && isMobile) return <MobileErorr />;

  if (loading) return null;

  if (!user) return <Navigate to="" replace />;
  if (user.role !== 'admin') return <Navigate to="/unauthorized" replace />;

  return (
    <div className={style.Accounting}>
      <Header />
      <div className="App-Container">
        <Sidebar />
        <div className="Main-Content">
          <div className={style.balance}>
            <div className={style.price}>
              <h1><PersianNumberFormatter number={12000000} /> ریال</h1>
            </div>
            <NavLink to="/Accounting/Document" className={style.button}>
              <img src={Add} alt="add" />
              <p>سند جدید</p>
            </NavLink>
          </div>
          <Documents />
        </div>
      </div>
    </div>
  );
}
