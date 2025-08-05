import React, { useState, useEffect } from 'react';
import styles from "./AlertPanel.module.css";
import CloseIcon from '../../assets/icons/closee.svg';
import alertfill from '../../assets/icons/Alarm-set.svg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import TimeInput from '../../utils/TimeInput';
import api from '../../config/api';

const AlertPanel = ({ onClose, schoolId = 1 }) => {
    // State برای مدیریت خطا (شامل پیام و ID منبع خطا)
    const [error, setError] = useState({ message: null, sourceId: null });
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAutoAlertsOn, setIsAutoAlertsOn] = useState(false);

    useEffect(() => {
        const fetchAlerts = async () => {
            setLoading(true);
            setError({ message: null, sourceId: null }); // ریست کردن خطا
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError({ message: "شما وارد نشده‌اید. لطفاً ابتدا لاگین کنید.", sourceId: null });
                    setLoading(false);
                    return;
                }
                const response = await api.get(`schools/${schoolId}/time-slots`);
                const alertData = Array.isArray(response.data.data) ? response.data.data : (Array.isArray(response.data) ? response.data : []);
                setAlerts(alertData);
            } catch (err) {
                const serverMessage = err.response?.data?.message || "خطای ناشناخته در دریافت اطلاعات";
                setError({ message: serverMessage, sourceId: null });
            } finally {
                setLoading(false);
            }
        };

        fetchAlerts();
    }, [schoolId]);

    const handleTimeUpdate = async (newTime, alertId, field) => {
        setError({ message: null, sourceId: null }); // پاک کردن خطای قبلی
        const originalAlerts = [...alerts]; // ذخیره حالت اولیه برای بازگردانی

        // آپدیت خوش‌بینانه برای پاسخ‌دهی سریع UI
        const updatedAlerts = alerts.map(alert =>
            alert.id === alertId ? { ...alert, [field]: newTime } : alert
        );
        setAlerts(updatedAlerts);

        const alertToUpdate = updatedAlerts.find(a => a.id === alertId);

        try {
            const url = `schools/${schoolId}/time-slots/${alertId}`;
            // ساخت payload تمیز برای ارسال به سرور
            const payload = {
                name: alertToUpdate.name,
                start_time: alertToUpdate.start_time,
                end_time: alertToUpdate.end_time,
                type: alertToUpdate.type,
                isActive: alertToUpdate.isActive,
                academic_level_id: alertToUpdate.academic_level?.id
            };
            await api.put(url, payload);
        } catch (err) {
            setAlerts(originalAlerts); // بازگرداندن UI به حالت قبل در صورت خطا

            if (err.response?.data?.errors) {
                const errorMessages = Object.values(err.response.data.errors).flat();
                setError({
                    message: errorMessages.join(' '),
                    sourceId: alertId // ذخیره ID زنگی که خطا داده
                });
            } else {
                setError({ message: "خطا در ارتباط با سرور.", sourceId: null });
            }
        }
    };

    const handleToggleAutoAlerts = () => {
        setIsAutoAlertsOn(prevState => !prevState);
    };

    if (loading) {
        return (
            <div className={styles.settingsPanel}>
                <img className={styles.profilePanelIcon} src={CloseIcon} alt='بستن' onClick={onClose} />
                <img className={styles.toptitle} src={alertfill} alt='آیکون زنگ' />
                <h3>سیستم زنگ هوشمند</h3>
                <div className={`${styles.button} ${styles.green}`}>زنگ زدن به صورت دستی</div>
                <div className={`${styles.button}`}><Skeleton style={{ margin: "10px 10px", borderRadius: "25px" }} duration={2} height={34} width={80} /> زنگ اتوماتیک</div>
                <Skeleton duration={2} highlightColor="#69b0b2" count={5} style={{ margin: "10px 0" }} height={50} />
            </div>
        );
    }

    return (
        <div className={styles.settingsPanel}>
            <img className={styles.profilePanelIcon} src={CloseIcon} alt='بستن' onClick={onClose} />
            <img className={styles.toptitle} src={alertfill} alt='آیکون زنگ' />
            <h3>سیستم زنگ هوشمند</h3>
            
            {/* نمایش پیام خطا */}
            {error.message && <p className={styles.alerterror}>{error.message}</p>}
            
            <div className={`${styles.button} ${styles.green}`}>زنگ زدن به صورت دستی</div>
            <div className={`${styles.button}`} onClick={handleToggleAutoAlerts}>
                <div className={`${styles.togglebutton} ${isAutoAlertsOn ? styles.on : ''}`}>
                    <span className={styles.onText}>روشن</span>
                    <span className={styles.offText}>خاموش</span>
                    <div className={styles.circle}></div>
                </div> زنگ اتوماتیک
            </div>

            {alerts.map((alert) => {
                const isErrorSource = error.sourceId === alert.id;
                return (
                    <div
                        className={`${styles.alarms} ${isErrorSource ? styles.alarmError : ''} ${!alert.isActive ? styles.alarmoff : ''}`}
                        key={alert.id}
                    >
                        <p className={styles.name}>{alert.name}</p>
                        <div className={styles.alarmcont}>
                            <p>از</p>
                            <TimeInput
                                defaultValue={alert.start_time}
                                onTimeChange={(newTime) => handleTimeUpdate(newTime, alert.id, 'start_time')}
                            />
                            <p>تا</p>
                            <TimeInput
                                defaultValue={alert.end_time}
                                onTimeChange={(newTime) => handleTimeUpdate(newTime, alert.id, 'end_time')}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AlertPanel;