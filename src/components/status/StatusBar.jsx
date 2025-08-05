import styles from "./StatusBar.module.css";

import arcanix from '../../assets/icons/arcanix-team.svg';
import asma from '../../assets/icons/ASMAG.svg';
import { useEffect, useState } from "react";


export default function StatusBar() {

    const activity_status = useState('آنلاین', 'آفلاین');
    const [timeString, setTimeString] = useState("");

    const todayName = new Intl.DateTimeFormat('fa-IR', { weekday: 'long' }).format(new Date());
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const fullDate = new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date());

    useEffect(() => {
        function updateTime() {
        const date = new Date();

        let hour = date.getHours();
        const minute = date.getMinutes();

        const amPm = hour < 12 ? "ق.ظ" : "ب.ظ";

        // تبدیل ساعت 24 ساعته به 12 ساعته
        hour = hour % 12;
        if (hour === 0) hour = 12;

        // اضافه کردن صفر جلو اعداد دقیقه
        const minuteStr = minute < 10 ? "0" + minute : minute;

        const formattedTime = `${hour}:${minuteStr} ${amPm}`;

        setTimeString(formattedTime);
        }

        updateTime();
        const interval = setInterval(updateTime, 1000 * 60); // هر دقیقه آپدیت می‌کنه

        return () => clearInterval(interval);
    }, []);
    

    return (
        <div className={styles.status_element_keeper}>
            <div className={styles.logo_warn}>
                <img src={arcanix} alt="" />
                <img src={asma} alt="" />
                <p>تمامی حقوق برای تیم آرکانیکس و گروه اسما محفوظ است</p>
                <div className={styles.vertical_line} />
            </div>

            <div className={styles.on_off_status}>
                <p>وضعیت نرم افزار:{activity_status}</p>
                <div className={styles.vertical_line} />
            </div>

            <div className={styles.today}>
                <p>امروز:{todayName}</p>
                <div className={styles.vertical_line} />
            </div>

            <div className={styles.date}>
                <p>امروز:{fullDate}</p>
                <div className={styles.vertical_line} />
            </div>

            <div className={styles.time}>
                <p>ساعت:{timeString}</p>
            </div>
        </div>
    )
}