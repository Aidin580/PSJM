// فایل: CalendarInputPop.js

import React, { useEffect, useState } from 'react';
import moment from 'moment-jalaali';
import styles from './CalendarInputPop.module.css';

moment.loadPersian({ usePersianDigits: false });

export default function CalendarInputPop({ onSelectDate, selectedDate }) {
 const [year, setYear] = useState(() => selectedDate ? moment(selectedDate, 'jYYYY/jMM/jDD').jYear() : moment().jYear());
 const [month, setMonth] = useState(() => selectedDate ? moment(selectedDate, 'jYYYY/jMM/jDD').jMonth() + 1 : moment().jMonth() + 1);
 const [daysData, setDaysData] = useState([]);

 useEffect(() => {
  const generateMonthData = () => {
   const daysInMonth = moment.jDaysInMonth(year, month - 1);
   const monthData = [];
   for (let i = 1; i <= daysInMonth; i++) {
    const date = moment(`${year}/${month}/${i}`, 'jYYYY/jM/jD');
    monthData.push({
     day: i,
     isHoliday: date.day() === 5, // جمعه
    });
   }
   setDaysData(monthData);
  };
  generateMonthData();
 }, [year, month]);

 const persianMonths = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];

  const getStartDayOfWeek = () => {
  const date = moment(`${year}/${month}/1`, 'jYYYY/jM/jD');
    // شنبه=6, یکشنبه=0 ... جمعه=5
    // تبدیل به فرمت شنبه=0, یکشنبه=1
  const dayOfWeek = date.day(); 
  return dayOfWeek === 6 ? 0 : dayOfWeek + 1; 
 };

 const isToday = (day) => moment().format('jYYYY/jM/jD') === `${year}/${month}/${day}`;

 const isSelected = (day) => {
  if (!selectedDate) return false;
  const dateStr = moment(`${year}/${month}/${day}`, 'jYYYY/jM/jD').format('jYYYY/jMM/jDD');
  return dateStr === selectedDate;
 };

 const handleDayClick = (day) => {
  const selected = moment(`${year}/${month}/${day}`, 'jYYYY/jM/jD').format('jYYYY/MM/DD');
  if (onSelectDate) onSelectDate(selected);
 };

  const renderDays = () => {
    const startDay = getStartDayOfWeek(); // 0 = شنبه
    const rows = [];
    const daysInMonth = daysData.length;
    if (daysInMonth === 0) return rows;

    let day = 1;
    for (let i = 0; i < 6; i++) { // حداکثر ۶ سطر در ماه
      let cells = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startDay) {
          cells.push(<td key={`empty-${j}`}></td>);
        } else if (day > daysInMonth) {
          cells.push(<td key={`empty-end-${j}`}></td>);
        } else {
          const currentDay = daysData[day - 1];
          const dayClasses = [
            isSelected(day) ? styles.selected : '',
            isToday(day) ? styles.today : '',
            currentDay.isHoliday ? styles.holiday : '',
          ].join(' ');

          cells.push(
            <td key={day} className={dayClasses} onClick={() => handleDayClick(day)}>
              {day}
            </td>
          );
          day++;
        }
      }
      rows.push(<tr key={i}>{cells}</tr>);
      if (day > daysInMonth) break; // اگر روزها تمام شد، از حلقه خارج شو
    }
    return rows;
  };

 const nextMonth = () => {
  if (month === 12) { setMonth(1); setYear(y => y + 1); } 
    else { setMonth(m => m + 1); }
 };

 const prevMonth = () => {
  if (month === 1) { setMonth(12); setYear(y => y - 1); } 
    else { setMonth(m => m - 1); }
 };

 return (
  <div className={styles.calendar}>
      {/* ساختار هدر دقیقاً به حالت اولیه شما بازگردانده شد */}
   <div className={styles.header}>
    <div className={styles.headerr}>
            <button className={styles.navButton} onClick={prevMonth}>
                <svg width="20" height="20" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.30078 15.5225L1.80078 8.52246L8.30078 1.52246" stroke="#68B0AB" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>
            <button className={styles.navButton} onClick={nextMonth}>
                <svg width="20" height="20" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.80078 1.52246L8.30078 8.52246L1.80078 15.5225" stroke="#68B0AB" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>
        </div>
    <div className={styles.Yearname}>{persianMonths[month - 1]} {year}</div>
   </div>
   <div className={styles.popupWrapper}>
    <table className={styles.table}>
     <thead>
      <tr>
       <th>شنبه</th><th>یکشنبه</th><th>دوشنبه</th>
       <th>سه‌شنبه</th><th>چهارشنبه</th><th>پنجشنبه</th><th>جمعه</th>
      </tr>
     </thead>
     <tbody>
      {renderDays()}
     </tbody>
    </table>
   </div>
  </div>
 );
}