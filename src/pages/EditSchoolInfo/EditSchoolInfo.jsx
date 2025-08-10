import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './EditSchoolInfo.module.css';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import drop from '../../assets/icons/Drop.svg';
import image_preview from '../../assets/icons/image-preview2.svg';
import back from '../../assets/icons/back.svg';
import remove from '../../assets/icons/remove.svg';
import add from '../../assets/icons/add.svg';


export default function EditSchoolInfo() {

    const fields = [
        { name: 'firstName', label: 'نام' },
        { name: 'schoolID', label: 'کد مدرسه' },
    ];
    const fields2 = [
        { name: 'approximateCap', label: 'ظرفیت تقریبی' },
        { name: 'classNumber', label: 'تعداد کلاس ها' },
    ]
    const fields3 = [
        { name: 'firstCallNum', label: 'شماره تماس ۱' },
        { name: 'secondCallNum', label: 'شماره تماس ۲' },
        { name: 'thirdCallNum', label: 'شماره تماس ۳' },
        { name: 'email', label: 'ایمیل' },
    ]
    const fields4 = [
        { name: 'adminName', label: 'نام مدیریت' },
        { name: 'firstDeputy', label: 'سمت معاون۱' },
        { name: 'secondDeputy', label: 'سمت معاون۲' },
        { name: 'thirdDeputy', label: 'سمت معاون۳' },
        { name: 'fourthDeputy', label: 'سمت معاون۴' },
        { name: 'fifthDeputy', label: 'سمت معاون۵' },
    ]
    const formik = useFormik({
        initialValues: {
            firstName: '',
            swchoolID: '',
            approximateCap: '',
            classNumber: '',
            firstCallNum: '',
            secondCallNum: '',
            thirdCallNum: '',
            email: '',
            adminName: '',
            firstDeputy: '',
            secondDeputy: '',
            thirdDeputy: '',
            fourthDeputy: '',
            fifthDeputy: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('ضروری'),
            schoolID: Yup.string().required('ضروری'),
            approximateCap: Yup.number().required('ضروری'),
            classNumber: Yup.number().required('ضروری'),
            firstCallNum: Yup.number().required('ضروری'),
            secondCallNum: Yup.number().nullable(),
            thirdCallNum: Yup.number().nullable(),
            email: Yup.number().nullable(),
            adminName: Yup.string().required('ضروری'),
            firstDeputy: Yup.string().required('ضروری'),
            secondDeputy: Yup.string().nullable(),
            thirdDeputy: Yup.string().nullable(),
            fourthDeputy: Yup.string().nullable(),
            fifthDeputy: Yup.string().nullable(),
        }),
        onSubmit: ({ resetForm }) => {
            resetForm();
            setProvince('');
            setCounty('');
            setDistrict('');
            setVillage('');
            setImagePreview(null);
            setShowLayer(false);
        }
    });
    const data = {
        "تهران": {
        "تهران": {
            "منطقه 1": ["نیاوران", "فرمانیه"],
            "منطقه 2": ["صادقیه", "گیشا"]
        },
        "ری": {
            "شهرری": ["کهریزک", "قلعه نو"]
        }
        },
        "اصفهان": {
        "اصفهان": {
            "ناحیه 1": ["جلفا", "چهارباغ"],
            "ناحیه 2": ["کوی امام", "احمدآباد"]
        }
        }
    };

    const [province, setProvince] = useState("");
    const [county, setCounty] = useState("");
    const [district, setDistrict] = useState("");
    const [village, setVillage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [showLayer, setShowLayer] = useState(false);
    const [visible, setVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [visible2, setVisible2] = useState(false);
    const [selectedOption2, setSelectedOption2] = useState("");
    const [visible3, setVisible3] = useState(false);
    const [selectedOption3, setSelectedOption3] = useState("");
    const [visible4, setVisible4] = useState(false);
    const [selectedOption4, setSelectedOption4] = useState("");
    const [tags, setTags] = useState([]);
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    
    const options = ['شبکه و نرم افزار', 'حسابداری', 'پزشکی', 'نظری'];

    const toggle = () => setVisible4(v => !v);
    const handleAdd = () => {
        if (!selectedOption4) return;
        if (tags.includes(selectedOption4)) return;
        setTags(prev => [...prev, selectedOption4]);
    };
    const handleRemove = (tag) => {
        setTags(prev => prev.filter(t => t !== tag));
    };

    const [openDropdown, setOpenDropdown] = useState({
        province: false,
        county: false,
        district: false,
        village: false,
    });

    const toggleDropdown = (key) => {
        setOpenDropdown((prev) => {
        const newState = { province: false, county: false, district: false, village: false };
        newState[key] = !prev[key];
        return newState;
        });
    };
    const closeDropdown = (key) => {
        setOpenDropdown((prev) => ({ ...prev, [key]: false }));
    };
    const handleSelectOption = (key, option) => {
        if (key === 'province') {
        setProvince(option);
        setCounty('');
        setDistrict('');
        setVillage('');
        } else if (key === 'county') {
        setCounty(option);
        setDistrict('');
        setVillage('');
        } else if (key === 'district') {
        setDistrict(option);
        setVillage('');
        } else if (key === 'village') {
        setVillage(option);
        }
        closeDropdown(key);
    };

    const provinces = Object.keys(data);
    const counties = province ? Object.keys(data[province]) : [];
    const districts = province && county ? Object.keys(data[province][county]) : [];
    const villages = province && county && district ? data[province][county][district] : [];

    

    useEffect(() => {
    if (!imagePreview) return;
    setShowLayer(false);
    const timer = setTimeout(() => setShowLayer(true), 50);
    return () => clearTimeout(timer);
    }, [imagePreview]);

    const onClose = () => {
    navigate('/schools');
    };

    return (
        <div>
            <Header/>
                <div className='App-Container'>
                    <Sidebar />
                    <div className='Main-Content' id='main'>
                        <div className={styles.container}>
                            
                            <div className={styles.headers_container}>
                                <div className={styles.back_container} onClick={() => onClose()}>
                                        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.57935 12.0483L1.02378 20.7829C0.642324 21.1722 0.646215 21.795 1.03157 22.1842L2.56129 23.7139C2.95443 24.1032 3.585 24.1032 3.97425 23.71L14.8614 12.7528C15.056 12.5582 15.1533 12.3052 15.1533 12.0483C15.1533 11.7914 15.056 11.5384 14.8614 11.3438L3.97425 0.386562C3.585 -0.00657463 2.95443 -0.00657463 2.56129 0.382669L1.03157 1.9124C0.646215 2.30164 0.642324 2.92443 1.02378 3.31367L9.57935 12.0483Z" fill="white"/>
                                        </svg>
                                    <p className={styles.back_txt}>بازگشت</p>
                                </div>
    
                                <div className={styles.header}>
                                    <div className={styles.right}>
                                        <svg width="33" height="31" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.48242 20.968C3.61344 20.968 0.476562 24.1049 0.476562 27.9739C0.476562 31.8428 3.61344 34.9797 7.48242 34.9797C11.3514 34.9797 14.4883 31.8428 14.4883 27.9739C14.4883 24.1049 11.3514 20.968 7.48242 20.968ZM10.4015 28.5577H8.06624V30.893C8.06624 31.2158 7.80469 31.4768 7.48242 31.4768C7.16015 31.4768 6.8986 31.2158 6.8986 30.893V28.5577H4.56331C4.24104 28.5577 3.97949 28.2967 3.97949 27.9739C3.97949 27.651 4.24104 27.39 4.56331 27.39H6.8986V25.0547C6.8986 24.7319 7.16015 24.4709 7.48242 24.4709C7.80469 24.4709 8.06624 24.7319 8.06624 25.0547V27.39H10.4015C10.7238 27.39 10.9854 27.651 10.9854 27.9739C10.9854 28.2967 10.7238 28.5577 10.4015 28.5577Z" fill="#fff"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9561 18.1905C20.2143 18.1907 22.0615 20.0387 22.0615 22.297V29.0167C22.0613 29.6346 21.5603 30.1357 20.9424 30.1358H16.2256C16.3963 29.4431 16.4883 28.7191 16.4883 27.9737C16.4882 23.6373 13.4228 20.0167 9.34082 19.1603C10.0562 18.5561 10.9794 18.1905 11.9834 18.1905H17.9561ZM16.8359 22.67C16.4238 22.67 16.0889 23.005 16.0889 23.4171V24.9103C16.089 25.3223 16.4239 25.6564 16.8359 25.6564H18.3291C18.7411 25.6563 19.0751 25.3223 19.0752 24.9103V23.4171C19.0752 23.005 18.7412 22.6701 18.3291 22.67H16.8359Z" fill="#fff"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.1992 0.275492C19.4837 0.284393 19.769 0.326065 20.0469 0.401469L29.752 3.01475C31.3787 3.45224 32.5137 4.93496 32.5137 6.61924V29.0167C32.5134 29.6345 32.0124 30.1356 31.3945 30.1358H23.293C23.4556 29.7956 23.5546 29.4188 23.5547 29.0167V22.297C23.5546 19.21 21.043 16.6975 17.9561 16.6974H15.3428V4.00596C15.3428 2.85254 15.8899 1.74486 16.8066 1.04307C17.4925 0.516246 18.3459 0.248875 19.1992 0.275492ZM25.7949 22.669C25.3829 22.669 25.048 23.0032 25.0479 23.4151V24.9083C25.0479 25.3204 25.3828 25.6554 25.7949 25.6554H27.2881C27.5284 25.6553 27.7335 25.5344 27.8701 25.3575H27.8857V25.3341C27.973 25.2124 28.0342 25.0695 28.0342 24.9083V23.4151C28.0341 23.2541 27.973 23.1136 27.8857 22.9913V22.9679H27.8701C27.7335 22.791 27.5292 22.6691 27.2881 22.669H25.7949ZM25.7949 17.4425C25.3828 17.4425 25.0479 17.7774 25.0479 18.1896V19.6827C25.0479 20.0948 25.3829 20.4288 25.7949 20.4288H27.2881C27.7001 20.4287 28.0341 20.0947 28.0342 19.6827V18.1896C28.0342 17.7775 27.7001 17.4426 27.2881 17.4425H25.7949ZM20.5684 12.2169C20.1566 12.2171 19.8225 12.5512 19.8223 12.963V14.4562C19.8223 14.8681 20.1564 15.203 20.5684 15.2032H22.0615C22.4736 15.2032 22.8086 14.8683 22.8086 14.4562V12.963C22.8084 12.5511 22.4735 12.2169 22.0615 12.2169H20.5684ZM25.7949 12.2169C25.3829 12.2169 25.0481 12.5511 25.0479 12.963V14.4562C25.0479 14.8683 25.3828 15.2032 25.7949 15.2032H27.2881C27.7001 15.2032 28.0342 14.8682 28.0342 14.4562V12.963C28.034 12.5511 27.7 12.217 27.2881 12.2169H25.7949ZM20.5684 6.99034C20.1564 6.99056 19.8223 7.32543 19.8223 7.73741V9.23057C19.8223 9.64252 20.1565 9.97644 20.5684 9.97666H22.0615C22.4736 9.97666 22.8086 9.64266 22.8086 9.23057V7.73741C22.8086 7.3253 22.4736 6.99034 22.0615 6.99034H20.5684ZM25.7949 6.99034C25.3828 6.99034 25.0479 7.3253 25.0479 7.73741V9.23057C25.0479 9.64266 25.3828 9.97666 25.7949 9.97666H27.2881C27.7001 9.9766 28.0341 9.64262 28.0342 9.23057V7.73741C28.0342 7.32534 27.7001 6.9904 27.2881 6.99034H25.7949Z" fill="#fff"/>
                                            <path d="M35.127 12.2179C37.3853 12.2179 39.2333 14.066 39.2334 16.3243V29.0167C39.2332 29.6347 38.7313 30.1358 38.1133 30.1358H34.0068V25.6564H35.5C35.9121 25.6564 36.247 25.3223 36.2471 24.9103V23.4171C36.2471 23.005 35.9121 22.67 35.5 22.67H34.0068V20.4308H35.5C35.9121 20.4308 36.2471 20.0958 36.2471 19.6837V18.1905C36.2469 17.7786 35.912 17.4444 35.5 17.4444H34.0068V12.2179H35.127Z" fill="#fff"/>
                                            <path d="M8.08984 20.9952C9.60115 21.1251 10.9754 21.7335 12.0596 22.67H11.6094C11.1975 22.6703 10.8633 23.0051 10.8633 23.4171V24.9103C10.8634 25.3221 11.1975 25.6561 11.6094 25.6564H13.1025C13.4753 25.6564 13.7832 25.3827 13.8389 25.0255C14.2553 25.9217 14.4883 26.9206 14.4883 27.9739L14.4795 28.3341C14.4478 28.96 14.332 29.5638 14.1465 30.1358H8.99707C8.6093 30.1358 8.26743 29.9385 8.06641 29.6388L8.06624 28.5577H10.4015L10.5195 28.546C10.7472 28.4993 10.9269 28.3198 10.9736 28.0919L10.9854 27.9739C10.9854 27.651 10.7238 27.39 10.4015 27.39H8.06624V25.0547C8.06621 24.8847 7.99283 24.7327 7.87695 24.6261V22.297C7.87696 21.8425 7.95189 21.4047 8.08984 20.9952Z" fill="#fff"/>
                                        </svg>
                                        <h1>مدیریت اطلاعات آموزشگاه</h1>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.rest}>
                                <div className={styles.both_container}>
                                    <div className={styles.scroll_both}>

                                    <div className={styles.right_inputs}>

                                        <div className={styles.sec_header}>
                                            <div className={styles.left_line} />
                                                <p className={styles.sec_name}>مشخصات آموزشگاه</p>
                                            <div className={styles.right_line} />
                                        </div>

                                        <form onSubmit={formik.handleSubmit} className={styles.form_styles}>
                                        {fields.map((fields, index) => (
                                            <React.Fragment key={index}>
                                            <div className={styles.inputs}>
                                                <input
                                                className={styles.txt_inp}
                                                id={fields.name}
                                                name={fields.name}
                                                type="text"
                                                value={formik.values[fields.name]}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                />
                                                <label htmlFor={fields.name} className={styles.txt_lbl}>
                                                {fields.label}:
                                                </label>
                                                {formik.touched[fields.name] && formik.errors[fields.name] && (
                                                <div className={styles.error}>{formik.errors[fields.name]}</div>
                                                )}
                                            </div>
                                            {index !== fields.length - 1 && <div className={styles.spacer}></div>}
                                            </React.Fragment>
                                        ))}
                                        <div className={styles.dropdown_container}>
                                            <div className={styles.dropdown_exept_txt}>
                                            <div
                                                className={styles.displayBox}
                                                onClick={() => {
                                                setVisible(!visible);
                                                }}
                                            >
                                                {selectedOption || "انتخاب کنید"}
                                            </div>

                                            <div
                                                className={styles.arrowBox}
                                                onClick={() => {
                                                setVisible(!visible);
                                                }}
                                            >
                                                <svg
                                                className={`${styles.arrow} ${visible ? styles.rotate : ''}`}
                                                viewBox="0 0 26 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M13.1299 9.96316L4.53266 1.36591C3.60116 0.434414 2.08916 0.434414 1.15766 1.36591C0.226158 2.29741 0.226158 3.80941 1.15766 4.74091L11.5392 15.1224C12.4189 16.0022 13.8432 16.0022 14.7207 15.1224L25.1022 4.74091C26.0337 3.80941 26.0337 2.29741 25.1022 1.36591C24.1707 0.434414 22.6587 0.434414 21.7272 1.36591L13.1299 9.96316Z" fill="#6B69B2" />
                                                </svg>
                                            </div>
                                            </div>

                                            <div className={styles.dropdown_txt}>
                                            <p className={styles.gender_lbl}>:نوع مدرسه</p>
                                            </div>

                                            <div className={`${styles.dropdownMenu} ${visible ? styles.show : styles.hide}`}>
                                            <div
                                                className={styles.dropdownItem}
                                                onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedOption("هنرستان فنی حرفه ای");
                                                setVisible(false);
                                                }}
                                            >
                                                هنرستان فنی حرفه ای
                                            </div>
                                            <div
                                                className={styles.dropdownItem}
                                                onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedOption("تربیت بدنی");
                                                setVisible(false);
                                                }}
                                            >
                                                تربیت بدنی
                                            </div>
                                            <div
                                                className={styles.dropdownItem}
                                                onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedOption("کارودانش");
                                                setVisible(false);
                                                }}
                                            >
                                                کارودانش
                                            </div>
                                            </div>
                                        </div>
                                        <div className={styles.dropdown_container}>
                                            <div className={styles.dropdown_exept_txt}>
                                            <div
                                                className={styles.displayBox}
                                                onClick={() => {
                                                setVisible3(!visible3);
                                                }}
                                            >
                                                {selectedOption3 || "انتخاب کنید"}
                                            </div>

                                            <div
                                                className={styles.arrowBox}
                                                onClick={() => {
                                                setVisible3(!visible3);
                                                }}
                                            >
                                                <svg
                                                className={`${styles.arrow} ${visible3 ? styles.rotate : ''}`}
                                                viewBox="0 0 26 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M13.1299 9.96316L4.53266 1.36591C3.60116 0.434414 2.08916 0.434414 1.15766 1.36591C0.226158 2.29741 0.226158 3.80941 1.15766 4.74091L11.5392 15.1224C12.4189 16.0022 13.8432 16.0022 14.7207 15.1224L25.1022 4.74091C26.0337 3.80941 26.0337 2.29741 25.1022 1.36591C24.1707 0.434414 22.6587 0.434414 21.7272 1.36591L13.1299 9.96316Z" fill="#6B69B2" />
                                                </svg>
                                            </div>
                                            </div>

                                            <div className={styles.dropdown_txt}>
                                            <p className={styles.gender_lbl}>:مقطع</p>
                                            </div>

                                            <div className={`${styles.dropdownMenu} ${visible3 ? styles.show : styles.hide}`}>
                                            <div
                                                className={styles.dropdownItem}
                                                onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedOption3("ابتدایی");
                                                setVisible3(false);
                                                }}
                                            >
                                                ابتدایی
                                            </div>
                                            <div
                                                className={styles.dropdownItem}
                                                onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedOption3("متوسطه اول");
                                                setVisible3(false);
                                                }}
                                            >
                                                متوسطه اول
                                            </div>
                                            <div
                                                className={styles.dropdownItem}
                                                onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedOption3("متوسطه دوم");
                                                setVisible3(false);
                                                }}
                                            >
                                                متوسطه دوم
                                            </div>
                                            <div
                                                className={styles.dropdownItem}
                                                onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedOption3("کارودانش");
                                                setVisible3(false);
                                                }}
                                            >
                                                کارودانش
                                            </div>
                                            </div>
                                        </div>
                                        <div className={styles.dropdown_container2}>
                                            <div className={styles.all_dropdown}>

                                                <div className={styles.dropdown_exept_txt2}>

                                                    <button
                                                        type="button"
                                                        className={styles.addBtn}
                                                        onClick={(e) => { e.stopPropagation(); handleAdd(); }}
                                                        aria-label="افزودن"
                                                    >
                                                        <img src={add} alt="add" />
                                                    </button>

                                                    <div
                                                    className={styles.displayBox2}
                                                    onClick={toggle}
                                                    >
                                                    {selectedOption4 || 'انتخاب کنید'}
                                                    </div>

                                                    <div
                                                    className={styles.arrowBox2}
                                                    onClick={toggle}
                                                    >
                                                        <svg
                                                            className={`${styles.arrow} ${visible4 ? styles.rotate : ''}`}
                                                            viewBox="0 0 26 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M13.1299 9.96316L4.53266 1.36591C3.60116 0.434414 2.08916 0.434414 1.15766 1.36591C0.226158 2.29741 0.226158 3.80941 1.15766 4.74091L11.5392 15.1224C12.4189 16.0022 13.8432 16.0022 14.7207 15.1224L25.1022 4.74091C26.0337 3.80941 26.0337 2.29741 25.1022 1.36591C24.1707 0.434414 22.6587 0.434414 21.7272 1.36591L13.1299 9.96316Z" fill="#6B69B2" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                <div className={styles.dropdown_txt}>
                                                    <p className={styles.gender_lbl}>:رشته های موجود</p>
                                                </div>

                                            </div>

                                            <div className={`${styles.dropdownMenu2} ${visible4 ? styles.show : styles.hide}`}>
                                                {options.map(opt => (
                                                <div
                                                    key={opt}
                                                    className={styles.dropdownItem}
                                                    onClick={(e) => { e.stopPropagation(); setSelectedOption4(opt); setVisible4(false); }}
                                                >
                                                    {opt}
                                                </div>
                                                ))}
                                            </div>

                                            <div className={styles.tags_container}>
                                                {tags.length === 0 ? (
                                                <div className={styles.tags_empty}>هیچ موردی انتخاب نشده</div>
                                                ) : (
                                                tags.map(tag => (
                                                    <div key={tag} className={styles.tag}>
                                                    <span className={styles.tagText}>{tag}</span>
                                                    <img
                                                        src={remove}
                                                        alt="remove"
                                                        className={styles.tagRemove}
                                                        onClick={(e) => { e.stopPropagation(); handleRemove(tag); }}
                                                    />
                                                    </div>
                                                ))
                                                )}
                                            </div>
                                        </div>
                                        {fields2.map((fields, index) => (
                                            <React.Fragment key={index}>
                                            <div className={styles.inputs}>
                                                <input
                                                className={styles.txt_inp}
                                                id={fields.name}
                                                name={fields.name}
                                                type="text"
                                                value={formik.values[fields.name]}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                />
                                                <label htmlFor={fields.name} className={styles.txt_lbl}>
                                                {fields.label}:
                                                </label>
                                                {formik.touched[fields.name] && formik.errors[fields.name] && (
                                                <div className={styles.error}>{formik.errors[fields.name]}</div>
                                                )}
                                            </div>
                                            {index !== fields.length - 1 && <div className={styles.spacer}></div>}
                                            </React.Fragment>
                                        ))}
                                        <div className={styles.dropdown_container}>
                                            <div className={styles.dropdown_exept_txt}>
                                            <div
                                                className={styles.displayBox}
                                                onClick={() => {
                                                setVisible2(!visible2);
                                                }}
                                            >
                                                {selectedOption2 || "انتخاب کنید"}
                                            </div>

                                            <div
                                                className={styles.arrowBox}
                                                onClick={() => {
                                                setVisible2(!visible2);
                                                }}
                                            >
                                                <svg
                                                className={`${styles.arrow} ${visible2 ? styles.rotate : ''}`}
                                                viewBox="0 0 26 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                >
                                                <path d="M13.1299 9.96316L4.53266 1.36591C3.60116 0.434414 2.08916 0.434414 1.15766 1.36591C0.226158 2.29741 0.226158 3.80941 1.15766 4.74091L11.5392 15.1224C12.4189 16.0022 13.8432 16.0022 14.7207 15.1224L25.1022 4.74091C26.0337 3.80941 26.0337 2.29741 25.1022 1.36591C24.1707 0.434414 22.6587 0.434414 21.7272 1.36591L13.1299 9.96316Z" fill="#6B69B2" />
                                                </svg>
                                            </div>
                                            </div>

                                            <div className={styles.dropdown_txt}>
                                            <p className={styles.mremover}>:جنسیت</p>
                                            </div>

                                            <div className={`${styles.dropdownMenu} ${visible2 ? styles.show : styles.hide}`}>
                                            <div
                                                className={styles.dropdownItem}
                                                onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedOption2("پسران");
                                                setVisible2(false);
                                                }}
                                            >
                                                پسران
                                            </div>
                                            <div
                                                className={styles.dropdownItem}
                                                onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedOption2("دختران");
                                                setVisible2(false);
                                                }}
                                            >
                                                دختران
                                            </div>
                                            </div>
                                        </div>

                                        </form>


                                        <div className={`${styles.sec_header2} ${styles.sec_header3}`}>
                                            <div className={styles.left_line} />
                                                <p className={styles.sec_name}>اطلاعات تماس آموزشگاه</p>
                                            <div className={styles.right_line} />
                                        </div>

                                        <form onSubmit={formik.handleSubmit} className={styles.form_styles}>
                                        
                                        {fields3.map((fields, index) => (
                                            <React.Fragment key={index}>
                                            <div className={styles.inputs}>
                                                <input
                                                    className={styles.txt_inp}
                                                    id={fields.name}
                                                    name={fields.name}
                                                    type="text"
                                                    value={formik.values[fields.name]}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder={
                                                        ['secondCallNum', 'thirdCallNum', 'email'].includes(fields.name)
                                                        ? 'در صورت وجود نداشتن خالی بگذارید'
                                                        : ''
                                                    }
                                                />
                                                <label htmlFor={fields.name} className={styles.txt_lbl}>
                                                {fields.label}:
                                                </label>
                                                {formik.touched[fields.name] && formik.errors[fields.name] && (
                                                <div className={styles.error}>{formik.errors[fields.name]}</div>
                                                )}
                                            </div>
                                            {index !== fields.length - 1 && <div className={styles.spacer}></div>}
                                            </React.Fragment>
                                        ))}

                                        </form>
                                    </div>

                                    <div className={styles.left_inputs}>
                                        <form onSubmit={formik.handleSubmit} className={styles.form_styles}>
                                        
                                        <div className={styles.sec_header}>
                                            <div className={styles.left_line} />
                                                <p className={styles.sec_name}>اطلاعات کادر</p>
                                            <div className={styles.right_line} />
                                        </div>

                                        {fields4.map((fields, index) => (
                                            <React.Fragment key={index}>
                                            <div className={styles.inputs}>
                                                <input
                                                    className={styles.txt_inp}
                                                    id={fields.name}
                                                    name={fields.name}
                                                    type="text"
                                                    value={formik.values[fields.name]}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder={
                                                        ['secondDeputy', 'thirdDeputy', 'fourthDeputy', 'fifthDeputy'].includes(fields.name)
                                                        ? 'در صورت وجود نداشتن خالی بگذارید'
                                                        : ''
                                                    }
                                                />
                                                <label htmlFor={fields.name} className={styles.txt_lbl}>
                                                {fields.label}:
                                                </label>
                                                {formik.touched[fields.name] && formik.errors[fields.name] && (
                                                <div className={styles.error}>{formik.errors[fields.name]}</div>
                                                )}
                                            </div>
                                            {index !== fields.length - 1 && <div className={styles.spacer}></div>}
                                            </React.Fragment>
                                        ))}
                                        
                                        <div className={styles.sec_header2}>
                                            <div className={styles.left_line} />
                                                <p className={styles.sec_name}>آدرس آموزشگاه</p>
                                            <div className={styles.right_line} />
                                        </div>

                                        {[
                                            {
                                                key: 'province',
                                                label: 'استان',
                                                value: province,
                                                options: provinces,
                                                disabled: false,
                                            },
                                            {
                                                key: 'county',
                                                label: 'شهرستان',
                                                value: county,
                                                options: counties,
                                                disabled: !province,
                                            },
                                            {
                                                key: 'district',
                                                label: 'بخش/شهر',
                                                value: district,
                                                options: districts,
                                                disabled: !county,
                                            },
                                            {
                                                key: 'village',
                                                label: 'روستا/منطقه',
                                                value: village,
                                                options: villages,
                                                disabled: !district,
                                            },
                                            ].map(({ key, label, value, options, disabled }, index, arr) => (
                                            <React.Fragment key={key}>
                                                <div className={styles.lists}>
                                                <label className={styles.txt_list}>
                                                    {label}:
                                                </label>
                                                <div className={styles.dropdown_exept_txt4}>
                                                    <div className={`${styles.select_icon} ${disabled ? styles.disabled : ''}`}
                                                    onClick={() => !disabled && toggleDropdown(key)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        !disabled && toggleDropdown(key);
                                                        }
                                                    }}
                                                    >
                                                        <img className={`${styles.arrow} ${openDropdown[key] ? styles.rotate : ''}`} src={drop} alt="arrow" />
                                                    </div>
                                                    <div
                                                    className={`${styles.select_wrapper} ${disabled ? styles.disabled : ''}`}
                                                    tabIndex={0}
                                                    role="button"
                                                    onClick={() => !disabled && toggleDropdown(key)}
                                                    onBlur={() => closeDropdown(key)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        !disabled && toggleDropdown(key);
                                                        }
                                                    }}
                                                    >
                                                    <div className={styles.selected_value}>{value || 'انتخاب کنید'}</div>
                                                    </div>
                                                </div>
                                                    <ul
                                                    className={`${styles.dropdown_list2} ${openDropdown[key] ? styles.show : ''}`}
                                                    >
                                                    {options.map((opt) => (
                                                        <li
                                                        key={opt}
                                                        className={`${styles.dropdown_item} ${opt === value ? styles.selected : ''}`}
                                                        tabIndex={0}
                                                        role="option"
                                                        aria-selected={opt === value}
                                                        onMouseDown={() => handleSelectOption(key, opt)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter' || e.key === ' ') {
                                                            e.preventDefault();
                                                            handleSelectOption(key, opt);
                                                            }
                                                        }}
                                                        >
                                                        {opt}
                                                        </li>
                                                    ))}
                                                    </ul>
                                                </div>
                                                {index !== arr.length - 1 && <div className={styles.spacer}></div>}
                                            </React.Fragment>
                                            ))}

                                        <div className={styles.address}>
                                            <label htmlFor="address" className={styles.txt_lbl2}>آدرس دقیق:</label>
                                            <textarea id='address' className={styles.txt_area} value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                                            {formik.errors.address && formik.errors.address.address_line_1 && <div className={styles.error}>{formik.errors.address.address_line_1}</div>}
                                        </div>

                                        </form>
                                    </div>
                                    </div>
                                </div>

                                <div className={styles.image_picker}>
                                    <label className={styles.the_picker} dir="rtl">
                                    <div className={styles.picker_content}>
                                        <img src={image_preview} alt="pin" className={styles.picker_icon} />
                                        <p className={styles.picker_text}>افزودن تصویر</p>
                                    </div>
                                        <input type="file" accept="image/*" hidden />
                                    </label>

                                    <button
                                    type="submit"
                                    className={styles.submit_btn}
                                    onClick={() => {
                                        formik.resetForm();
                                        setProvince('');
                                        setCounty('');
                                        setDistrict('');
                                        setVillage('');
                                        setSelectedOption4('');
                                        setSelectedOption3('');
                                        setSelectedOption2('');
                                        setSelectedOption('');
                                        setAddress('');
                                        setImagePreview(null);
                                        setShowLayer(false);
                                    }}
                                    >
                                    تایید و ثبت نام دانش آموز
                                    </button>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
        </div>
    )
}