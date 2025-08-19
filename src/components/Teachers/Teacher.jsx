import React, { useState, useEffect, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import style from "./Teacher.module.css";
import Dropdown from "../DropDown/DropDown";
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import searchIcon from "../../assets/icons/search.svg"; // فرض می‌کنم این آیکون را در بخش جستجو استفاده می‌کنی
import delete1 from "../../assets/icons/delete.svg"
import edit from "../../assets/icons/edit.svg"
import api, { endpoints } from "../../config/api";

export default function Teacher() {
    
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("last_name");

    const studentsData = [
        { name: "صدرا", lastName: "شعبان نژاد", nationalCode: "----------", school: "هنرستان حاج سید محمد نظام فصیحی", absent: false },
        { name: "صدرا", lastName: "شعبان نژاد", nationalCode: "----------", school: "دبیرستان غیر انطفاعی دین و دانش", absent: true },
        { name: "صدرا", lastName: "شعبان نژاد", nationalCode: "----------", school: "دبستان شهید یاسر اکبری لنگرود", absent: true },
        { name: "صدرا", lastName: "شعبان نژاد", nationalCode: "----------", school: "دبستان شهید منصور ستاری", absent: true },
        { name: "صدرا", lastName: "شعبان نژاد", nationalCode: "----------", school: "دبیرستان شهید جعفر بازیار", absent: false },
        { name: "صدرا", lastName: "شعبان نژاد", nationalCode: "----------", school: "هنرستان حاج سید محمد نظام فصیحی", absent: true },
        { name: "صدرا", lastName: "شعبان نژاد", nationalCode: "----------", school: "هنرستان حاج سید محمد نظام فصیحی", absent: false },
        { name: "صدرا", lastName: "شعبان نژاد", nationalCode: "----------", school: "دبیرستان غیر انطفاعی دین و دانش", absent: true },
        { name: "صدرا", lastName: "شعبان نژاد", nationalCode: "----------", school: "دبستان شهید یاسر اکبری لنگرود", absent: false },
        { name: "صدرا", lastName: "شعبان نژاد", nationalCode: "----------", school: "دبستان شهید منصور ستاری", absent: true },
        { name: "صدرا", lastName: "شعبان نژاد", nationalCode: "----------", school: "دبیرستان شهید جعفر بازیار", absent: false },
        { name: "صدرا", lastName: "شعبان نژاد", nationalCode: "----------", school: "هنرستان حاج سید محمد نظام فصیحی", absent: true },
    ];

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

    


    // --- Filtering and Memoization (Sorting is now done by backend) ---
    const sourceStudents = teachers.length > 0 ? teachers : studentsData;
    // بعد فیلتر و سرچ رو روی sourceStudents بزن
    const filteredAndSortedteachers = useMemo(() => {
    return sourceStudents.filter(student =>
        (student.full_name || student.name || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    }, [sourceStudents, searchTerm]);
    // شمارش درست
    const absentteachers = filteredAndSortedteachers.filter(s => s.absent === true);
    const presentteachers = filteredAndSortedteachers.filter(s => s.absent === false);



    // --- Dropdown Options ---
    const sortOptions = [
        { value: "last_name", label: "بر اساس نام خانوادگی" },
        { value: "personnel_code", label: "بر اساس کد ملی" },
        { value: "created_at", label: "زمان ساخت" },
    ];

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.right}>
                    <svg width="33" height="31" viewBox="0 0 33 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.26494 0.964844C3.38088 0.964844 2.53303 1.31603 1.90791 1.94115C1.28279 2.56628 0.931603 3.41412 0.931603 4.29818C0.931603 5.18223 1.28279 6.03008 1.90791 6.6552C2.53303 7.28032 3.38088 7.63151 4.26494 7.63151C5.14899 7.63151 5.99684 7.28032 6.62196 6.6552C7.24708 6.03008 7.59827 5.18223 7.59827 4.29818C7.59827 3.41412 7.24708 2.56628 6.62196 1.94115C5.99684 1.31603 5.14899 0.964844 4.26494 0.964844ZM7.98401 0.964844C7.98734 0.968177 7.98639 0.976159 7.98889 0.979492C8.77889 1.86449 9.26494 3.02568 9.26494 4.29818C9.26494 5.80984 8.58363 7.16811 7.51363 8.08561L11.1904 9.13704L14.431 7.83984C15.1543 7.55151 15.9482 7.56005 16.664 7.86589C17.3799 8.17255 17.9325 8.74086 18.2216 9.46419C18.5108 10.1875 18.5023 10.9806 18.1956 11.6973C17.8889 12.4139 17.3206 12.9665 16.5973 13.2565L12.4306 14.9232C11.8348 15.1607 11.1716 15.1958 10.5507 15.0208L9.26494 14.653V14.7148V21.7982H31.3483C32.0383 21.7982 32.5983 21.239 32.5983 20.5482C32.5983 19.8573 32.0383 19.2982 31.3483 19.2982H30.9316V2.21484C30.9316 1.52401 30.3716 0.964844 29.6816 0.964844H7.98401ZM5.49052 9.28516C5.40087 9.28424 5.31138 9.29297 5.2236 9.3112C5.18124 9.30906 5.14116 9.29818 5.09827 9.29818H2.59827C1.21744 9.29818 0.0982695 10.4173 0.0982695 11.7982V21.7982V29.7148C0.095927 29.8805 0.126528 30.0449 0.188296 30.1986C0.250063 30.3524 0.341764 30.4923 0.458069 30.6102C0.574375 30.7282 0.712966 30.8219 0.865787 30.8858C1.01861 30.9497 1.18261 30.9826 1.34827 30.9826C1.51393 30.9826 1.67793 30.9497 1.83075 30.8858C1.98357 30.8219 2.12216 30.7282 2.23847 30.6102C2.35478 30.4923 2.44648 30.3524 2.50824 30.1986C2.57001 30.0449 2.60061 29.8805 2.59827 29.7148V21.7982H5.09827V29.7148C5.09593 29.8805 5.12653 30.0449 5.1883 30.1986C5.25006 30.3524 5.34176 30.4923 5.45807 30.6102C5.57438 30.7282 5.71297 30.8219 5.86579 30.8858C6.01861 30.9497 6.18261 30.9826 6.34827 30.9826C6.51393 30.9826 6.67793 30.9497 6.83075 30.8858C6.98357 30.8219 7.12216 30.7282 7.23847 30.6102C7.35477 30.4923 7.44648 30.3524 7.50824 30.1986C7.57001 30.0449 7.60061 29.8805 7.59827 29.7148V18.8815V12.4427L11.0048 13.416C11.271 13.4922 11.555 13.4779 11.8121 13.3753L15.9788 11.7087C16.254 11.6031 16.483 11.4038 16.6255 11.1458C16.768 10.8878 16.8148 10.5877 16.7575 10.2986C16.7003 10.0095 16.5427 9.74991 16.3127 9.56567C16.0827 9.38142 15.7949 9.28438 15.5003 9.29167C15.3459 9.29565 15.1936 9.32821 15.0511 9.3877L11.2815 10.8949L5.85836 9.34701C5.73953 9.30811 5.61554 9.28726 5.49052 9.28516Z" fill="#fff"/>
                    </svg>
                    <h1>لیست کل دبیران</h1>
                    <div className={style.p_dad}>
                        <p>{!loading && `${absentteachers.length} دبیر غایب هستند`}</p>
                        <p>{!loading && `${presentteachers.length} دبیر حاضر هستند`}</p>
                    </div>
                </div>
                <div className={style.left}>
                    {/* تغییر ۴: Dropdown برای مرتب‌سازی */}
                    <Dropdown 
                        options={sortOptions} 
                        defualt={"مرتب‌سازی"} 
                        onSelect={(option) => setSortBy(option.value)} 
                    />
                    <div className={style.search}>
                    <input 
                        type="text" 
                        placeholder="جستجو میان دانش آموزان..." 
                        value={searchTerm}
                        onChange={handleSearchChange}
                        />
                        <img src={searchIcon} alt="جستجو" />
                    </div>
                </div>
            </div>

            <div className={style.table}>
                {filteredAndSortedteachers.map((s, index) => (
                <div key={index} className={style.row}>
                    <div className={style.item}><p>{s.name}</p></div>
                    <div className={`${style.item} ${style.display}`}><p>{s.lastName}</p></div>
                    <div className={style.item}><p><span className={style.display}>کد ملی:</span>{s.nationalCode}</p></div>
                    <div className={style.item}><p className={style.truncate}>{s.school}</p></div>
                    <div className={style.item}>
                    <div className={s.absent ? style.absent : style.present}></div>
                    <p>{s.absent ? 'غایب' : 'حاضر'} <span className={style.display}>است</span></p>
                    </div>
                    <div className={style.delete}><img src={delete1} alt="" /><p>حذف</p></div>
                    <div className={`${style.edit} ${style.display}`}><img src={edit} alt="" /><p>ویرایش</p></div>
                </div>
                ))}
            </div>
        </div>
    );
}