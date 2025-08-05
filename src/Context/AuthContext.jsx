import { createContext, useContext, useState, useEffect } from 'react';
import api,{ endpoints, setAuthToken } from "../config/api.js";
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ⬅️ اول true باشه چون داریم auth رو چک می‌کنیم

  // ⬅️ هنگام شروع، داده از localStorage خونده میشه
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // ⬅️ حتما بعد از چک، loading باید false بشه
  }, []);

  const login = (data) => {
    const { token, roles = [],schools = [], ...rest } = data;

    const fullUser = {
      ...rest,
      token,
      roles,
      role: roles?.[0]?.name || null, // ⬅️ نقش اول برای راحتی
      schools, // ⬅️ ذخیره مدارس
      selectedSchool: schools.length === 1 ? schools[0] : null, // ⬅️ اگر فقط یکی بود، همون رو ذخیره کن
    };

    setUser(fullUser);
    localStorage.setItem('user', JSON.stringify(fullUser));
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    api.post(endpoints.logout);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const refresh = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  };
  

  const selectSchool = (school) => {
    if (!user) return; // اگر user هنوز لود نشده، کاری نکن
    const updatedUser = {
      ...user,
      selectedSchool: school,
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };
  


  return (
    <AuthContext.Provider value={{ user, login, logout, loading, setUser, refresh, selectSchool}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
