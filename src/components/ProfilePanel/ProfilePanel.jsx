import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import styles from "./ProfilePanel.module.css";
import api,{ endpoints } from "../../config/api";

// Import your icons and images
import CloseIcon from '../../assets/icons/closee.svg';
import ChangeSchoolIcon from '../../assets/icons/change_school_icon.svg';
import DropdownArrowUpIcon from '../../assets/icons/Drop.svg';

import BuildingIcon from '../../assets/icons/building_icon.svg';
import LocationIcon from '../../assets/icons/location_icon.svg';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SchoolIcon1 from '../../assets/icons/school_icon_1.png'; // Example school icon 1
import { useEffect } from 'react';
import { setAuthToken } from '../../config/api.js';







const ProfilePanel = ({ onClose }) => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleLogout = (e) => {
        e.stopPropagation();
        e.preventDefault();
        logout();
    };



    const getRoleName = (role) => {
        switch (role) {
            case 'admin':
                return 'مدیر کل';
            case 'deputy':
                return 'معاون';
            case 'principal':
                return 'مدیر مدرسه';
            case 'teacher':
                return 'معلم';
            case 'parents':
                return 'والدین';
            default:
                return 'نقش نامشخص';
        }
    };

    const [isSchoolListOpen, setIsSchoolListOpen] = useState(false); // State to manage dropdown visibility

    const toggleSchoolList = () => {
        setIsSchoolListOpen(!isSchoolListOpen);
    };


    useEffect(() => {
        async function fetchSchools() {
            if (!user?.token) return;
            try {
                setAuthToken(user.token);
                const response = await api.get(endpoints.schools);
                const schoolsData = response.data.data;
                setSchools(schoolsData);
            } catch (error) {
                console.error('خطا در دریافت مدارس:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchSchools();
    }, [user?.token]);



    return (
        <div className={styles.profilePanel}>
            {/* Close Icon */}
            <img className={styles.profilePanelIcon} src={CloseIcon} alt='بستن پنل' onClick={onClose} />

            {/* User Profile Info */}
            <div className={styles.profilePanelcont}>
                <img src='./' alt='عکس پروفایل' className={styles.profilePanelRight} /> {/* Placeholder for user profile image */}
                <div className={styles.profilePanelLeft}>
                    <h2>{user?.profile?.first_name} {user?.profile?.last_name}</h2>
                    <p>{user?.profile?.phone_number}</p>
                    <p>{user?.profile?.national_code}</p>
                    <p>{getRoleName(user?.roles?.[0]?.name)}</p>
                </div>
            </div>

            {/* Change School Section */}
            <div className={`${styles.profiledrop} `}>
                <div className={`${styles.changeSchoolButton} ${isSchoolListOpen ? styles.open : ''}`} onClick={toggleSchoolList}>
                    {/* Right-side icon for Change School */}

                    <p>تغییر آموزشگاه</p>
                    {/* Dynamic dropdown arrow based on state */}
                    <div className={styles.schoolDropdownArrowContainer}>
                        <img
                            src={DropdownArrowUpIcon}
                            alt={isSchoolListOpen ? "بستن لیست آموزشگاه" : "باز کردن لیست آموزشگاه"}
                            className={isSchoolListOpen ? styles.schoolDropdownArroww : styles.schoolDropdownArrow}
                        />
                    </div>
                    <img src={ChangeSchoolIcon} alt="تغییر آموزشگاه" className={styles.changeSchoolIconRight} />
                </div>


                {isSchoolListOpen && (
                    <div className={styles.schoolListContainer}>
                        {loading ? (
                          <Skeleton duration={3}  highlightColor="#69b0b2" count={3} style={{margin: "1px 0",borderRadius:"6px"}} height={50} />
                        ) : schools.length === 0 ? (
                            <p>مدرسه‌ای یافت نشد.</p>
                        ) : (
                            schools.map(school => (
                                <div
                                    key={school.id}
                                    className={styles.schoolListItem}
                                >
                                    <img src={SchoolIcon1} alt={school.name} className={styles.schoolItemIcon} />
                                    <div className={styles.schoolItemInfo}>
                                        <h3>{school.name}</h3>
                                        <div className={styles.schoolItemDetails}>
                                            <p className={styles.schoolType}>
                                                <img src={BuildingIcon} alt='نوع آموزشگاه' /> {school.school_type || "نوع نامشخص"}
                                            </p>
                                            <p className={styles.schoolLocation}>
                                                 {getRoleName(school.current_user_role) || "سمت نامشخص"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

            </div>

            <div className={styles.profilePaneloptionline} />
            <div className={styles.profilePaneloption} onClick={() => navigate('/EditUser')}><p>ویرایش اطلاعات کاربری</p></div>
            {(user?.role !== 'teacher' || user?.role === 'deputy') && (<div className={styles.profilePaneloption} onClick={() => navigate('/EditSchool')}><p>ویرایش اطلاعات مدرسه</p></div>)}
            {(user?.role !== 'teacher' || user?.role === 'deputy') && (<div className={styles.profilePaneloption}><p>ورود به بخش بایگانی</p></div>)}
            <div className={styles.profilePaneloption} onClick={handleLogout}><p>خروج از حساب کاربری</p></div>
        </div>
    );
};

export default ProfilePanel;