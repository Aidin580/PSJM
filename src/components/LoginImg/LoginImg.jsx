import React, { useRef, useEffect } from 'react'
import style from './LoginImg.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function LoginImg() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className={style.container}>
      
      {/* دکمه‌های ناوبری سفارشی */}
      

      <Swiper
        direction="vertical"
        pagination={{ clickable: true }}
        mousewheel={true}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        modules={[Navigation, Pagination, Mousewheel]}
        className={style.swap}
      >
       
        <div ref={prevRef} className={style.customButton}>&gt;</div>
        <div ref={nextRef} className={style.customButtono}>&gt;</div>
      
        {[1, 2, 3, 4].map((i) => (
          <SwiperSlide key={i}>
            <div className="slide">
              <img src="/Rectangle.png" alt={`slide${i}`} className={style.frame} />
              <div className={style.caption}>روز جوان گرامی‌باد.</div>
            </div>
          </SwiperSlide>
        ))}
        <div className={style.bottom}/>
      </Swiper>

    </div>
  )
}
