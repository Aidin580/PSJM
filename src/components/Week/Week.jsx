import React from 'react'
import styles from './Week.module.css'
import Dropdown from "../DropDown/DropDown";

export default function Week() {

  const options = [
   { value: "mango", label: "دهم شبکه" },
   { value: "banana", label: "دهم حسابداری" },
   { value: "orange", label: "یازدهم شبکه" },
   { value: "kiwi", label: "یازدهم حسابداری" },
   { value: "lemon", label: "دوازدهم شبکه" },
   { value: "melon", label: "دوازدهم حسابداری" },
   { value: "melon", label: "دوازدهم حسابداری" },
   { value: "melon", label: "دوازدهم حسابداری" },

 ];

 const weeklySchedule = [
  {
    day: "شنبه",
    isHoliday: false,
    classes: [
      ["ریاضی", "قرآن"], 
      ["علوم"],
      ["فارسی"],
      ["ورزش"]
    ]
  },
  {
    day: "یکشنبه",
    isHoliday: false,
    classes: [
      ["اجتماعی"],
      ["هنر", "مطالعات"], 
      ["ریاضی"],
      ["فارسی"]
    ]
  },
  {
    day: "دوشنبه",
    isHoliday: true,
    classes: [
      ["قرآن"],
      ["زبان"],
      ["علوم"],
      ["ریاضی", "هنر"]
    ]
  },
  {
    day: "سه‌شنبه",
    isHoliday: true,
    classes: [
      ["فارسی"],
      ["دینی"],
      ["کار و فناوری"],
      ["ورزش"]
    ]
  },
  {
    day: "چهارشنبه",
    isHoliday: false,
    classes: [
      ["ریاضی"],
      ["زبان", "قرآن"], 
      ["علوم"],
      ["هنر"]
    ]
  }
];


 const handleSelect = (option) => {
  console.log("انتخاب شد:", option);
};

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>برنامه ی هفتگی</h1>
         <div className={styles.filter}>   
        <Dropdown options={options} defualt={"تمامی کلاس ها"} onSelect={handleSelect} />
        </div>
      </div>
      <div className={styles.days}>

      {weeklySchedule.map((day, index) => (

    <div className={`${styles.day} ${day.isHoliday ? styles.holiday : ""}`} key={index}>
    <p>{day.day}{day.isHoliday && <p className={styles.holi}>تعطیل است×</p>}</p>
   
    {day.classes.length > 0 ? (
  day.classes.map((session, idx) => (
    <div
      key={idx}
      className={
        `${styles.class} ${session.length === 2 ? styles.double : ""}`
      }
    >
      {session.length === 2 ? (
        // اگر نیم‌کلاس بود، هر کلاس داخل div جدا
        session.map((cls, innerIdx) => (
          <div key={innerIdx} className={styles.half}>
            <p>{cls}</p>
          </div>
        ))
      ) : (
        // اگر فقط یک کلاس بود
        <p>{session[0]}</p>
      )}
    </div>
  ))
) : (
  <li>کلاسی ندارد</li>
)}
   
  </div>
))}

      </div>
    </div>
  )
}
