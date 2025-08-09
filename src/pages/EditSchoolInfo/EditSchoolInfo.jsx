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
                            
                            <div className={styles.back_container} onClick={() => onClose()}>
                                <img className={styles.back_img} src={back} alt='back' />
                                <p className={styles.back_txt}>بازگشت</p>
                            </div>

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

                                    {/*{imagePreview && (
                                    <div className={`${styles.preview_keeper} ${showLayer ? styles.show : ''}`}>
                                        <img src={imagePreview} alt="Preview" className={`${styles.img_preview} ${showLayer ? styles.show : ''}`} />
                                    </div>
                                    )}*/}
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
    )
}