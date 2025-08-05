import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment-jalaali';
import CalendarInputPopup from './CalendarInputPop';
import styles from './calendarInput.module.css';
import calender from '../../assets/icons/Calender.svg'


moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: false });

export default function Calendarinput({ onSelectDate, selectedDate }) {
  const [today, setToday] = useState({ date: '', weekday: '' });
  const [showPopup, setShowPopup] = useState(false);
  const ref = useRef();

  
 

  useEffect(() => {
    const now = moment();
    setToday({
      date: now.format('jYYYY/jMM/jDD'),
      weekday: now.format('dddd')
    });

    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={ref}>
      <div
        onClick={() => setShowPopup(prev => !prev)}
       className={styles.headerBox}
      >
       <img src={calender} className="calender_icon_open_close calender_icon_open_close2" alt=''></img>
       </div>
      {showPopup && (
        <div className={styles.popup}>
          <CalendarInputPopup  onSelectDate={onSelectDate} selectedDate={selectedDate}/>
        </div>
      )}
    </div>
  );
}
