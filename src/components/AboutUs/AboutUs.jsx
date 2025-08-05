import React from 'react'
import style from "./AboutUs.module.css";
import Emza from '../../assets/icons/Emza.svg';
import SJM from '../../assets/icons/SJM.svg';
import ASMAG from '../../assets/icons/ASMAG.svg';
import buttonlink from '../../assets/icons/ButtonLink.svg';
import Asma from '../../assets/icons/ASMAGROUP.IR.svg';
import insta from '../../assets/icons/instagram.svg';

export default function AboutUs() {
  return (
    <div className={style.AboutUs}>
      <div className={style.top}>
        <div className={style.right}>
          <h1>سامانه ای برای</h1>
          <img src={Emza} alt="" />
        </div>
        <div className={style.left}>
          <div className={style.leftcontainer}>
        <div className={style.logos}>
          <img src={SJM} alt="" />
          <img src={ASMAG} alt="" />
        </div>
        <div className={style.links}>
          <a className={style.button}>
            <p>وبسایت رسمی</p>
            <img src={buttonlink} alt="" />
          </a>
          <a className={style.button}>
            <img src={Asma} alt="" />
            <img src={insta} alt="" />
          </a>
        </div>
        </div>
        </div>
      </div>
      <div className={style.center}>
        <p>درباره نرم افزار</p>
        <p>نسخه:V3 ReDesign</p>
        <p>
          سامانه جامع مدیریت امضا (SJM) یک پلتفرم پیشرفته است که به منظور تسهیل فرآیندهای امضای دیجیتال و مدیریت اسناد طراحی شده است. این سامانه با هدف افزایش امنیت، سرعت و کارایی در تبادل اسناد الکترونیکی ایجاد شده است.
        </p>
        </div>
          <div className={style.center}>
        <p>توسعه داده شده توسط: تیم آرکانیکس از گروه اسما</p>
        <p>
          تمامی حقوق این نرم افزار متعلق به گروه اسما می باشد و هرگونه استفاده تجاری از آن بدون مجوز کتبی ممنوع است. این نرم افزار تحت مجوز GPL-3.0 منتشر شده است که به شما اجازه می دهد تا آن را مطالعه، تغییر و توزیع کنید، اما باید شرایط مجوز را رعایت کنید.
        </p>
          <p>دارای مجوز افتا به کد:</p>
          <p>دارای مجوز افتا به کد:</p>
        </div>
        <div className={style.bottom}>
          <div className={style.item}>
            <p>ایمیل پشتیبانی: sjm@asma-view.ir</p>
          </div>
          <div className={style.item}>
            <p>شماره تماس پشتیبانی (فقط روز های کاری، ساعت 8 تا 12): </p>
          </div>
        </div>
    </div>
    
  )
}

