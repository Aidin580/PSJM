import React, { useState, useEffect, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import style from "./Teacher.module.css";
import Dropdown from "../DropDown/DropDown";
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import searchIcon from "../../assets/icons/search.svg"; // فرض می‌کنم این آیکون را در بخش جستجو استفاده می‌کنی
import api, { endpoints } from "../../config/api";

export default function Teacher() {
    
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("last_name"); // مقدار پیش‌فرض برای مرتب‌سازی

    // --- Fetch Data ---
    useEffect(() => {
        const fetchTeachers = async () => {
            setLoading(true);
            setError(null);
            try {
                // تغییر ۱: درخواست API حالا پارامتر مرتب‌سازی را ارسال می‌کند
                const response = await api.get(`${endpoints.teachers}?sort_by=${sortBy}`);
                
                const teacherdata = Array.isArray(response.data.data) ? response.data.data : [];
                setTeachers(teacherdata);

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

        fetchTeachers();
    }, [sortBy]); // تغییر ۲: useEffect به sortBy وابسته است

    const handleDelete = (teacherId) => {
        console.log("Deleting teacher:", teacherId);
        // اینجا باید درخواست DELETE به API ارسال شود
        setTeachers(prev => prev.filter(t => t.id !== teacherId));
    };

    // --- Filtering and Memoization (Sorting is now done by backend) ---
    const filteredTeachers = useMemo(() => {
        let result = [...teachers]; // دیتا از قبل مرتب شده است
        
        // فقط فیلتر جستجو سمت کلاینت باقی می‌ماند
        if (searchTerm) {
            result = result.filter(teacher =>
                `${teacher.profile.first_name} ${teacher.profile.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                teacher.profile.national_code.includes(searchTerm)
            );
        }

        return result;
    }, [teachers, searchTerm]); // تغییر ۳: وابستگی‌ها ساده‌تر شدند
    
    const absentCount = useMemo(() => teachers.filter(t => t.is_absent).length, [teachers]);

    // --- Dropdown Options ---
    const sortOptions = [
        { value: "last_name", label: "بر اساس نام خانوادگی" },
        { value: "personnel_code", label: "بر اساس کد ملی" },
         { value: "created_at", label: "زمان ساخت" },
    ];

    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.right}>
                    {/* SVG and Title */}
                    <h1>لیست دبیران</h1>
                    <p>{absentCount > 0 ? `${absentCount} نفر غایب هستند.` : 'غایب وجود ندارد.'}</p>
                </div>
                <div className={style.left}>
                    {/* تغییر ۴: Dropdown برای مرتب‌سازی */}
                    <Dropdown 
                        options={sortOptions} 
                        defualt={"مرتب‌سازی"} 
                        onSelect={(option) => setSortBy(option.value)} 
                    />
                </div>
            </div>

            <div className={style.table}>
                {loading ? (
                    // ... Skeleton loading بدون تغییر ...
                    [...Array(5)].map((_, index) => (
                        <div className={style.row} key={index}>
                            <div className={style.item}><p><Skeleton width={80} /></p></div>
                            <div className={`${style.item} ${style.display}`}><p><Skeleton width={110} /></p></div>
                            <div className={style.item}><p><Skeleton width={100} /></p></div>
                            <div className={style.item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Skeleton circle width={18} height={18} /> <Skeleton width={40} />
                            </div>
                            <div className={style.delete}><p><Skeleton width={50} /></p></div>
                            <div className={`${style.edit} ${style.display}`}><p><Skeleton width={60} /></p></div>
                        </div>
                    ))
                ) : error ? (
                    <p className={style.errorText}>خطا: {error}</p>
                ) : filteredTeachers.length > 0 ? (
              
                    filteredTeachers.map((teacher) => (
                        <div className={style.row} key={teacher.id}>
                            <div className={style.item}><p>{teacher.profile.first_name}</p></div>
                            <div className={`${style.item} ${style.display}`}><p>{teacher.profile.last_name}</p></div>
                            <div className={style.item}><p>{teacher.profile.national_code}</p></div>
                            <div className={style.item}>
                                <div className={`${style.checkbox} ${teacher.is_absent ? style.checked : ''}`}></div>
                                <p>{teacher.is_absent ? "غایب" : "حاضر"}</p>
                            </div>
                            <div className={style.delete} onClick={() => handleDelete(teacher.id)}>
                                <img src={deleteIcon} alt="حذف" /> <p>حذف</p>
                            </div>
                            <div className={`${style.edit} ${style.display}`}>
                                <img src={editIcon} alt="ویرایش" /> <p>ویرایش</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={style.emptyText}>دبیری با این مشخصات یافت نشد.</p>
                )}
            </div>
        </div>
    );
}