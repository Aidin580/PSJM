import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';

import icon from '../../assets/icons/sjm-logo-white.svg';
import x_panel from '../../assets/icons/x-panel.svg';
import amin_pic from '../../assets/images/amin_pic.svg';
import styles from "./Header.module.css";
import Headerdown from '../Headerdown/Headerdown';

import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../Context/AuthContext";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import StatusBar from '../status/StatusBar';


 
const LazyProfilePanel = lazy(() => import('../ProfilePanel/ProfilePanel'));
const LazySettingsPanel = lazy(() => import('../SettingsPanel/SettingsPanel'));
const LazyAlertPanel = lazy(() => import('../AlertPanel/AlertPanel'));


const DefaultPanelContent = ({ children }) => (
    <div className={styles.defaultPanel}>

        {children}

    </div>
);



export default function Header() {
   
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [activePanelContent, setActivePanelContent] = useState(null);
    const [cpos, setcPos] = useState();
    const [headerdown, setheaderdown] = useState(false);
    const { logout, user } = useAuth();
    const role = useState('وارد شده به عنوان ادمین اصلی');
    const username = useState('محمد امین درون پرور');

    const handleClosePanel = () => {
        setActivePanelContent(null);
    };
    const handleheaderdown = () => {
        setheaderdown(!headerdown);
        
    };

    useEffect(() => {
        const handleClickOutside = (event) => {

            if (activePanelContent && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                handleClosePanel();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [activePanelContent]);


    const renderActivePanel = () => {
        switch (activePanelContent) {
            case 'profile':
                return (
                    <Suspense fallback={ <LoadingSpinner />}>
                        <LazyProfilePanel onClose={handleClosePanel} />     
                    </Suspense>
                );
            case 'alert':
                return (
                    <Suspense fallback={ <LoadingSpinner />}>
                        <DefaultPanelContent>
                            <LazyAlertPanel onClose={handleClosePanel} />
                        </DefaultPanelContent>
                    </Suspense>
                );
            case 'setting':
                return (
                    <Suspense fallback={ <LoadingSpinner />}>
                        <DefaultPanelContent>
                            <LazySettingsPanel onClose={handleClosePanel} />
                        </DefaultPanelContent>
                    </Suspense>
                );
            default:
                return null;
        }
    };

    const [isMobile, setIsMobile] = useState();
    
  useEffect(() => {
    // تابعی برای چک کردن سایز صفحه
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 500);
    };

    checkMobile(); // موقع لود اول صفحه اجرا میشه

    window.addEventListener('resize', checkMobile); // هر بار سایز صفحه تغییر کرد اجرا میشه

    // تمیزکاری (وقتی کامپوننت از بین رفت این رو حذف میکنه)
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    
    return (
        <>
            <div onClick={handleheaderdown} className={`${styles.Header} ignore-close`} ref={dropdownRef}>
                <div className={styles.left}>
                    <StatusBar />
                </div>
                <div className={styles.right}>

                    <div className={styles.right_logo}>
                        <div className={styles.logo_dad}><img className={styles.logo} src={icon} alt='sjm'></img></div>
                        <div className={styles.gs}>
                            <p className={styles.admin_txt}>پنل ادمین</p>
                            <img className={styles.admin_logo} src={x_panel} alt='' />
                        </div>
                    </div>

                    <div className={styles.vertical_line} />

                    <div className={styles.user_profile}>
                        <div className={styles.user_pic}><img className={styles.amin} src={amin_pic} alt='' /></div>

                        <div className={styles.user_info}>
                            <p className={styles.user_role}>{role}</p>
                            <p className={styles.username}>{username}</p>
                        </div>
                    </div>
                   
                </div>


                {activePanelContent && (
                    <div className={styles.rightSidePanelContainer} style={{ right: cpos }}>
                        {renderActivePanel()}
                    </div>
                )}
            </div>
            {isMobile && headerdown && <Headerdown headerdown={handleheaderdown} />}
        </>
    );
}