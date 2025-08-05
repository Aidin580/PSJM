import React from 'react'
import styles from './StudentInfoTile.module.css'
import DropdownLarge from "../DropDownLarge/DropDown";
import name from '../../assets/icons/name.svg';
import none from '../../assets/icons/none.svg';
import clocknone from '../../assets/icons/clocknone.svg';
import riseup from '../../assets/icons/riseup.svg';
import { useNavigate } from 'react-router-dom';


export default function StudentInfoTile() {
    const navigate = useNavigate();


    const options = [
        { value: "1", label: "سوابق غیبت" },
       { value: "2", label: "سوابق نمره" }
     ];

     const defaultOption = options[0];
     
      const handleSelect = (option) => {
  console.log("انتخاب شد:", option);
  if (option.value === "1") {
    navigate("");
  } else if (option.value === "2") {
    navigate("scorerow");
  }
};


  return (
    <div className={styles.container}>
        <img src="" alt="" />
      <div className={styles.item}>

        <div className={styles.header}>
         <p>نام و نام خانوادگی</p>
         <img src={name} alt=''/>
         
        </div>
           <div className={styles.content}>
        <h1>محمد امین درون پرور</h1>
   
     </div>
       </div>
       <div className={styles.item}>

          <div className={styles.header}>
          <p>تعداد غیبت های روزانه</p>
                 <img src={none} alt=''/>
          </div>
             <div className={styles.content}>
          <h1>15 روز</h1>
          </div>
    </div>
     <div className={styles.item}>
 
       <div className={styles.header}>
         <p>ساعت های غایب بودن</p>
         <img src={clocknone} alt=''/>
       </div>
         <div className={styles.content}>
       <h1>25ساعت</h1>
       </div>
      </div>
      <div className={styles.item}>

         <div className={styles.header}>
           <p>تنظیم نمودار بر اساس:</p>
           <img src={riseup} alt=''/>
         </div>
           <div className={styles.content}> <DropdownLarge
  options={options}
  defaultValue={defaultOption}
  onSelect={handleSelect}
/></div>
       </div>
    </div>
  )
}
