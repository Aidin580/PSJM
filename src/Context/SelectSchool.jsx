import React, { useState, useEffect } from 'react';
import api,{ endpoints , setAuthToken} from "../config/api.js";
import { useAuth } from './AuthContext.jsx';
import ProfilePanel from "../components/ProfilePanel/ProfilePanel.jsx"

function SchoolSelector({ onSchoolSelected }) {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSchoolId, setSelectedSchoolId] = useState(null);
  const { user, } = useAuth();
  useEffect(() => {
    async function fetchSchools() {
      if (!user?.token) return; // اگر توکن نیست، درخواست نده
  
      try {
        // ست کردن توکن قبل از درخواست (مطمئن شو اینجا حتما انجام میشه)
        setAuthToken(user.token);
  
        const response = await api.get(endpoints.schools);
        const schoolsData = response.data.data;
        setSchools(schoolsData);
        setLoading(false);
  
        if (schoolsData.length === 1) {
          onSchoolSelected(schoolsData[0].id);
        }
      } catch (error) {
        console.error('خطا در دریافت مدارس:', error);
        setLoading(false);
      }
    }
  
    fetchSchools();
  }, [user?.token, onSchoolSelected]); // وابسته به توکن و تابع انتخاب مدرسه
  

  const handleChange = (e) => {
    setSelectedSchoolId(e.target.value);
  };

  const handleEnter = () => {
    if (selectedSchoolId) {
      onSchoolSelected(selectedSchoolId);
    }
  };

  if (loading) return <div>در حال بارگذاری مدارس...</div>;

  if (schools.length === 0) return <div>شما مدرسه‌ای ندارید.</div>;

  // اگر فقط یک مدرسه داشتیم، فقط پیام می‌تونیم بزنیم چون مستقیم رفتیم جلو
  if (schools.length === 1) {
    return <div>شما به مدرسه "{schools[0].name}" وارد شدید.</div>;
  }

  return (
    <div>
      <label>مدرسه مورد نظر را انتخاب کنید:</label>
      <select value={selectedSchoolId || ''} onChange={handleChange}>
        <option value="" disabled>انتخاب کنید</option>
        {schools.map(school => (
          <option key={school.id} value={school.id}>
            {school.name}
          </option>
        ))}
      </select>
      <button onClick={handleEnter} disabled={!selectedSchoolId}>ورود</button>
    </div>
  );
}

export default SchoolSelector;
