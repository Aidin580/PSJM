import React, { useState } from 'react';
import styles from './Absence.module.css';
import add from '../../assets/icons/add.svg';
import ghayeb from '../../assets/icons/ghayeb.svg';
import deleted from '../../assets/icons/deleted.svg';
import { useAbsence } from '../../Context/AbsenceContext';

// لیست کامل دانش‌آموزان برای جست‌وجو و افزودن از اینجا
const allStudents = [
  { id: 1, lastname: "شعبان نژاد", name: "صدرا" },
  { id: 2, lastname: "کریمی", name: "محمد" },
  { id: 3, lastname: "حسینی", name: "علی" },
  { id: 4, lastname: "رضایی", name: "زهرا" },
  { id: 5, lastname: "جعفری", name: "مهدی" },
  { id: 6, lastname: "موسوی", name: "سارا" },
  { id: 7, lastname: "احمدی", name: "امیر" },
  { id: 8, lastname: "قاسمی", name: "فاطمه" },
  { id: 9, lastname: "نوری", name: "حسین" },
  { id: 10, lastname: "صادقی", name: "نگار" },
  { id: 11, lastname: "عباسی", name: "رضا" },
];

export default function Absence() {
  const [name, setName] = useState('');
  const { absentList, addAbsent, removeAbsent } = useAbsence();

  const handleAddAbsent = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    // تطبیق با نام و نام خانوادگی
    const found = allStudents.find(
      (s) => `${s.name} ${s.lastname}` === trimmed
    );

    if (found) {
      addAbsent(found);
      setName('');
    } else {
      alert("دانش‌آموزی با این نام پیدا نشد.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddAbsent();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="مثال: علی حسینی"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAddAbsent}>
          <img src={add} alt="" />
          ثبت غیبت
        </button>
      </div>

      <h3><img src={ghayeb} alt="" />اسامی غایبین:</h3>

      <div className={styles.row}>
        {absentList.length === 0 ? (
          <p style={{ marginRight: '10px' }}>هیچ دانش‌آموزی غایب نیست.</p>
        ) : (
          absentList.map((student) => (
            <div
              key={student.id}
              className={styles.box}
              onClick={() => removeAbsent(student.id)}
              title="برای حذف کلیک کنید"
            >
              <img src={deleted} alt="حذف" />
              <p>{student.name} {student.lastname}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}