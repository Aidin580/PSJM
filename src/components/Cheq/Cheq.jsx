import React from 'react'
import style from "./Cheq.module.css"
import Calenderinput from '../Calendar/calendarInput';
import { useFormData } from '../MeetingFrame/MeetingFrame';

export default function Cheq({ setShowcheq }) {

        const { formData, updateFormData } = useFormData();

        const handleDateSelect = (date) => {
        updateFormData({ cheqDate: date });
    };

   
    
  return (
    <div className={style.container}>
        <h1>صدور چک</h1>
    <div className={style.Cheq}>
      <div className={style.lineone}>
        <div className={style.makedate}>
         <p>تاریخ صدور:</p>
         <p>{formData.cheqDate || ''}</p>
      </div>
         <div className={style.calender}>
                        <Calenderinput onSelectDate={handleDateSelect} selectedDate={formData.cheqDate || ''} />
           </div>
           <div className={style.cheqprice}>
            <p>مبلغ:</p>
            <input type='text' value={formData.cheqprice || ''} onChange={(e) => updateFormData({ cheqprice: e.target.value })} />
           </div>
      </div>
    </div>
     <button className={style.nextButton} onClick={() => setShowcheq(false)}>بستن</button>
    </div>
  )
}
