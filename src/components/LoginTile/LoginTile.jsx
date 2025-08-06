import React, { useState , useEffect } from 'react';
import style from "./LoginTile.module.css";
import logo from '../../assets/icons/sjm-logo-green.svg';
import x_panel from '../../assets/icons/x-panel-logo.svg';
import user from '../../assets/icons/user.svg';
import axios from 'axios';
import api,{ endpoints } from '../../config/api';
import { useAuth } from '../../Context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import FetchSchools from "../../Context/FetchSchools.jsx"
import Loading from "../LoadingSpinner/LoadingSpinner.jsx"
import { setAuthToken } from "../../config/api.js"; // یا مسیر درست به نسبت پروژه‌ت


export default function LoginTile() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember_me, setRemember_me] = useState(false);


  const [backendMessage, setBackendMessage] = useState("");
  const [messageType, setMessageType] = useState("error"); // یا 'success'

  const [loading, setLoading] = useState(false);

  const handleBeforeInput = (e) => {
    const char = e.data;
    if (char && /[\u0600-\u06FF]/.test(char)) {
      e.preventDefault();
      setBackendMessage("لطفاً کیبورد خود را روی زبان انگلیسی قرار دهید.");
    } else {
      setBackendMessage(""); // اگر اشتباه رفع شد، پیام پاک شه
    }
  };
  
  



  const handleChangeUsername = (e) => {
    const val = e.target.value;
    setUsername(val.replace(/[\u0600-\u06FF]/g, ""));
  };

  
  const handleChangePassword = (e) => {
    const val = e.target.value;
    setPassword(val.replace(/[\u0600-\u06FF]/g, ""));
  };
  

  const validateUsername = () => {
    if (username.length >= 3) {
      return true;
    } else {
      return false;
    }
  };
  
  const validatePassword = () => {
    if (password.length >= 8) {
      return true;
    } else {
      return false;
    }
  };
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setUser } = useAuth();

  const handleLogin = async () => {
    
    const isUsernameValid = validateUsername();
    const isPasswordValid = validatePassword();
    
    if (isUsernameValid && isPasswordValid) {
      setLoading(true)
      try {
        const response = await axios.post(endpoints.login, {
          username,
          password,
          remember_me,
        });
        
        console.log("ورود موفق ✅", response.data);
        
        setBackendMessage(response.data.message || "ورود موفق بود");
        setMessageType("success");

        const { token, user } = response.data.data;

        // ذخیره در context و localStorage
        const userData = {
          ...user,
          token,
          roles: user.roles, // حتما roles هم بدی تا AuthContext بتونه role بسازه
        };

        login(userData); // 🎯 حالا خودش تو context نقش رو می‌سازه

        // ⛔ دیگه لازم نیست این خطو بنویسی، چون login خودش ذخیره می‌کنه:
        // localStorage.setItem("user", JSON.stringify(userData));

        

        if (response.data.status) {
          const userRole = user.roles?.[0]?.name || ''; // گرفتن اولین رول کاربر (مثلاً "admin" یا "teacher")

          // مسیر‌دهی بر اساس نقش
          if (['admin', 'principal', 'deputy'].includes(userRole)) {
            navigate('/');
          } else if (userRole === 'teacher') {
            navigate('/Hozor');
          } else {
            navigate('/error'); // مسیر پیش‌فرض
          }
        }

      } catch (error) {
        setBackendMessage(error.response?.data?.message || 'نام کاربری یا رمز عبور اشتباه است');
        
      } finally {
        setLoading(false); // ✅ توقف لودینگ در هر حالتی
      }
    } else {
      console.log("مشکلات اعتبارسنجی وجود دارد ❌");

      if (!username || !password) {
        setBackendMessage('لطفاً همه فیلدها را پر کنید.');
      } else {
        setBackendMessage('نام کاربری یا رمز عبور وارد شده نامعتبر است');
      }
    }

  
  };
  
  // useEffect(() => {
  //   const fetchSchools = async () => {
  //     try {
  //       const response = await api.get(endpoints.schools);
  //       console.log("✅ مدارس:", response.data);
  //     } catch (error) {
  //       console.error("❌ خطا در گرفتن مدارس:", error);
  //     }
  //   };
  
  //   if (user?.token) {
  //     setAuthToken(user.token); // ⬅️ اضافه شد
  //     fetchSchools();
  //   }
  // }, [user]);
  
  return (
    
    <div className={style.container}>
      <FetchSchools/>
      <div className={style.pic}>
        <img src={x_panel} alt='' />
      </div>

      {backendMessage && (
        <div className={`${style.message} ${style[messageType]}`}>
          <span>{backendMessage}</span>
        </div>
      )}

      <h1 className={style.title}>ورود به حساب کاربری</h1>

      {/* نام کاربری */}
      <div className={style.input}>
        <input
          type="text"
          value={username}
          onBeforeInput={handleBeforeInput}
          onChange={handleChangeUsername}
          onBlur={validateUsername}
          placeholder="نام کاربری"
        />
      </div>

      {/* رمز عبور */}
      <div className={style.input}>
        <input
          type="password"
          value={password}
          onBeforeInput={handleBeforeInput}
          onChange={handleChangePassword}
          onBlur={validatePassword}
          placeholder="رمز عبور"
        />
      </div>

      <button onClick={handleLogin} disabled={loading}>
        {loading ? <Loading/> : "ورود به سامانه" }
      </button>

      <a href="https://www.google.com">رمز عبور خود را فراموش کردم!</a>
    </div>
  );
}
