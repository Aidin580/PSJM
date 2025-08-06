import React, { useState } from 'react';
import style from './UserEdit.module.css';
import { useNavigate } from 'react-router-dom';

export default function UserEdit() {
  return (
    <div className={style.UserEdit}>
      <p className={style.attention}>تغییرات به صورت خودکار ذخیره میشوند</p>
      <div className={style.container}>
        <div className={style.right}>
          <div className={` ${style.row} ${style.firstrow}`}>
            <p>نام:</p>
            <input className={style.item} type="text" placeholder='نام خود را وارد کنید' />
          </div>
          <div className={style.row}>
            <p>نام خانوادگی:</p>
            <input className={style.item} type="text" placeholder='نام خانوادگی خود را وارد کنید' />
          </div>
          <div className={style.row}>
            <p>نام کاربری:</p>
            <input className={style.item} type="text" placeholder='نام کاربری خود را وارد کنید' />
          </div>
          <div className={style.row}>
            <p>کدملی:</p>
            <input className={style.item} type="text" placeholder='کدملی خود را وارد کنید' />
          </div>
          <div className={style.row}>
            <p>شماره تماس:</p>
            <input className={style.item} type="text" placeholder='شماره تماس خود را وارد کنید' />
          </div>
        </div>

        <div className={style.left}>
            <div className={` ${style.row} ${style.firstrow}`}>
            <p>نام پدر:</p>
            <input className={style.item} type="text" placeholder='  نام پدر خود را وارد کنید' />
          </div>
            <div className={style.row}>
            <p>رمز عبور فعلی:</p>
            <input className={style.item} type="password" placeholder='رمز عبور فعلی خود را وارد کنید' />
          </div>
            <div className={style.row}>
            <p>رمز عبور جدید:</p>
            <input className={style.item} type="password" placeholder='رمز عبود جدید خود را وارد کنید' />
          </div>
            <div className={style.row}>
            <p>تکرار رمز عبور جدید:</p>
            <input className={style.item} type="password" placeholder=' رمز عبور جدید خود را وارد کنید' />
          </div>
          <div className={style.dash}></div>
          <button className={style.button}>ثبت تغییرات</button>
        </div>
      </div>

    </div>
  );
}

