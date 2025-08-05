import React, { useState, useEffect, useRef } from 'react';
import styles from '../components/Header/Header.module.css';
import alertIcon from '../assets/icons/Alarm.svg';
import clockIcon from '../assets/icons/clock.svg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import api from '../config/api';
import { showInfoNotification } from '../services/notificationService';

export default function BellStatus({ schoolId }) {
    const [timeSlots, setTimeSlots] = useState([]);
    const [currentBell, setCurrentBell] = useState(null);
    const [remainingTime, setRemainingTime] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ message: null, sourceId: null });
    const previousBellName = useRef(null);

    // Effect برای دریافت داده از سرور
    useEffect(() => {
        const fetchTimeSlots = async () => {
            if (!schoolId) {
                setLoading(false);
                return;
            }
            setLoading(true);
            setError({ message: null, sourceId: null });
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError({ message: "شما وارد نشده‌اید.", sourceId: null });
                    setLoading(false);
                    return;
                }
                const response = await api.get(`schools/${schoolId}/time-slots`);
                const fetchedData = Array.isArray(response.data.data) ? response.data.data : (Array.isArray(response.data) ? response.data : []);
                const sortedData = [...fetchedData].sort((a, b) => a.start_time.localeCompare(b.start_time));
                setTimeSlots(sortedData);
            } catch (err) {
                const serverMessage = err.response?.data?.message || "خطا در دریافت اطلاعات زنگ‌ها";
                setError({ message: serverMessage, sourceId: null });
            } finally {
                setLoading(false);
            }
        };
        fetchTimeSlots();
    }, [schoolId]);

    // Effect برای محاسبه زمان و ارسال نوتیفیکیشن
    useEffect(() => {
        if (loading || error.message || timeSlots.length === 0) {
            if (!loading && !error.message && timeSlots.length === 0) {
                setCurrentBell({ name: "ساعت درسی تعریف نشده" });
                setRemainingTime('');
            }
            return;
        }

        const interval = setInterval(() => {
            const now = new Date();
            const currentTime = now.toTimeString().slice(0, 5);
            const activeBell = timeSlots.find(bell => currentTime >= bell.start_time && currentTime < bell.end_time);
            
            let newBellName = null;

            if (activeBell) {
                newBellName = activeBell.name;
                setCurrentBell(activeBell);
                const currentIndex = timeSlots.findIndex(bell => bell.id === activeBell.id);
                const nextBell = timeSlots[currentIndex + 1];

                if (nextBell) {
                    const nextBellTime = new Date();
                    const [hours, minutes] = nextBell.start_time.split(':').map(Number);
                    nextBellTime.setHours(hours, minutes, 0, 0);
                    const diffInMinutes = Math.ceil((nextBellTime - now) / (1000 * 60));
                    setRemainingTime(`${diffInMinutes} دقیقه تا زنگ بعد`);
                } else {
                    setRemainingTime('این زنگ ،زنگ آخر است');
                }
            } else {
                const upcomingBell = timeSlots.find(bell => currentTime < bell.start_time);
                if (upcomingBell) {
                    newBellName = "زنگ تفریح";
                    setCurrentBell({ name: "زنگ تفریح" });
                    const nextBellTime = new Date();
                    const [hours, minutes] = upcomingBell.start_time.split(':').map(Number);
                    nextBellTime.setHours(hours, minutes, 0, 0);
                    const diffInMinutes = Math.ceil((nextBellTime - now) / (1000 * 60));
                    setRemainingTime(`${diffInMinutes} دقیقه تا زنگ بعد`);
                } else {
                    newBellName = "پایان ساعت کاری";
                    setCurrentBell({ name: "پایان ساعت کاری" });
                    setRemainingTime('');
                }
            }

            // منطق هوشمند ارسال نوتیفیکیشن فقط در زمان تغییر وضعیت
            if (previousBellName.current && previousBellName.current !== newBellName && newBellName !== null) {
                showInfoNotification(`🔔 ${newBellName} شروع شد.`);
            }

            // ذخیره وضعیت فعلی برای مقایسه در تیک بعدی اینتروال
            previousBellName.current = newBellName;

        }, 1000);

        return () => clearInterval(interval);
    }, [timeSlots, loading, error.message]);

    // منطق رندر کامپوننت
    if (loading) {
        return (
            <>

<Skeleton count={1} width={100} height={40} style={{ marginBottom: '4px', borderRadius: "9px" }} duration={2} highlightColor="#69b0b2" />

<Skeleton count={1} width={140} height={40} style={{ marginBottom: '4px', marginLeft: "5px", borderRadius: "9px" }} duration={2} highlightColor="#69b0b2" />

 </>
        );
    }

    if (error.message) {
        return <div className={styles.leftbox} style={{ color: 'red' }}>{error.message}</div>;
    }

    return (
        <>
            {currentBell?.name && (
                <div className={styles.leftbox}>
                    <img src={alertIcon} alt='زنگ' />
                    {currentBell.name}
                </div>
            )}
            {remainingTime && (
                <div className={styles.leftbox}>
                    <img src={clockIcon} alt='زمان باقیمانده' />
                    {remainingTime}
                </div>
            )}
                {!currentBell && (

    <Skeleton count={1} width={100} height={40} style={{ marginBottom: '4px',borderRadius:"9px" }} duration={2} highlightColor="#69b0b2" />

   )}
   {!remainingTime && (

    <Skeleton count={1} width={140} height={40} style={{ marginBottom: '4px',marginLeft:"5px",borderRadius:"9px" }} duration={2} highlightColor="#69b0b2" />

   )}
        </>
    );
}