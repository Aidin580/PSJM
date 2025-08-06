import React, { useState } from 'react';
import style from './AboutSchool.module.css';
import { useNavigate } from 'react-router-dom';

export default function AboutSchool() {

  const [isModalOpen, setIsModalOpen] = useState(false);

   
    const handleSaveConnections = (connections) => {
     
        console.log('Saved connections:', connections);
    
        setIsModalOpen(false);
    };
    

  const navigate = useNavigate();


  return (
    <div className={style.AboutSchool}>
      <p className={style.attention}>تغییرات به صورت خودکار ذخیره میشوند</p>
      <div className={style.container}>
        <div className={style.right}>
          <div className={style.row}>
            <p>نام آموزشگاه:</p>
            <input className={style.item} type="text" placeholder='نام آموزشگاه را وارد کنید' />
          </div>
          <div className={style.row}>
            <p>کد آموزشگاه:</p>
            <input className={style.item} type="text" placeholder='کد آموزشگاه را وارد کنید' />
          </div>
          <div className={style.row}>
            <p>شماره تماس1:</p>
            <input className={style.item} type="text" placeholder='شماره تماس1 را وارد کنید' />
          </div>
          <div className={style.row}>
            <p>شماره تماس2:</p>
            <input className={style.item} type="text" placeholder='شماره تماس2 را وارد کنید' />
          </div>
          <div className={style.row}>
            <p>شماره تماس3:</p>
            <input className={style.item} type="text" placeholder='شماره تماس3 را وارد کنید' />
          </div>
        </div>

        <div className={style.left}>
          <div className={style.leftrow}>
            <p>نشانی آموزشگاه:</p>
            <textarea className={style.leftitem} name="txt" id="1" placeholder='نشانی آموزشگاه را وارد کنید'></textarea>
          </div>
          <div className={style.dash}></div>
          <div className={style.row}>
            <p>افزودن دانش آموز:</p>
            <div className={style.flex}>

              <button className={style.button} onClick={() => setIsModalOpen(!isModalOpen)}>افزودن با فایل اکسل</button>
            
          
              <button onClick={()=>{navigate("/AddStudent")}}  className={style.button}>افزودن تکی</button>

            </div>
          </div>
          <div className={style.row}>
            <p>افزودن دبیر:</p>
            <div className={style.flex}>
              <button className={style.button}>افزودن با فایل اکسل</button>
              <button onClick={()=>{navigate("/AddTeacher")}} className={style.button}>افزودن تکی</button>
            </div>
          </div>
          <div className={style.row}>
            <p>افزودن معاون:</p>
            <div className={style.flex}>
              <button className={style.button}>افزودن با فایل اکسل</button>
              <button  onClick={()=>{navigate("/AddDeputy")}}  className={style.button}>افزودن تکی</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
