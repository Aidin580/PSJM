import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './EditSchoolInfo.module.css';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';

import drop from '../../assets/icons/Drop.svg';
import image_preview from '../../assets/icons/image-preview2.svg';
import remove from '../../assets/icons/remove.svg';
import api, { endpoints } from "../../config/api";


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

    // Location states
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [zones, setZones] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedSector, setSelectedSector] = useState(null);
    const [selectedZone, setSelectedZone] = useState(null);

    const [provincesLoading, setProvincesLoading] = useState(false);
    const [citiesLoading, setCitiesLoading] = useState(false);
    const [sectorsLoading, setSectorsLoading] = useState(false);
    const [zonesLoading, setZonesLoading] = useState(false);


    const [province, setProvince] = useState("");
    const [county, setCounty] = useState("");
    const [district, setDistrict] = useState("");
    const [village, setVillage] = useState("");


    const pendingInitialLocation = useRef(null);


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
    const location = useLocation();
    const mode = location.state?.mode || "add";
    const schoolData = location.state?.school || {};
    const from = location.state?.from || "schoolList";
    
    // ---------- existing edit-mode effect: keep form values, but DO NOT directly set province/county/district/village here ----------
    useEffect(() => {
        if (mode === "edit" && schoolData) {
            formik.setValues({
                firstName: schoolData.name || '',
                schoolID: schoolData.code || '',
                approximateCap: schoolData.approximateCap || '',
                classNumber: schoolData.classNumber || '',
                firstCallNum: schoolData.contacts?.firstCallNum || '',
                secondCallNum: schoolData.contacts?.secondCallNum || '',
                thirdCallNum: schoolData.contacts?.thirdCallNum || '',
                email: schoolData.contacts?.email || '',
                adminName: schoolData.adminName || '',
                firstDeputy: schoolData?.firstDeputy || '',
                secondDeputy: schoolData.secondDeputy || '',
                thirdDeputy: schoolData.thirdDeputy || '',
                fourthDeputy: schoolData.fourthDeputy || '',
                fifthDeputy: schoolData.fifthDeputy || '',
            });
            setSelectedOption(schoolData.schoolType || "");
            setSelectedOption3(schoolData.grade || "");
            setTags(schoolData.majors || []);
            setSelectedOption2(schoolData?.gender === 'male' ? 'پسران' : schoolData?.gender === 'female' ? 'دختران' : schoolData?.gender || '');
            pendingInitialLocation.current = {
                province: schoolData.province ?? schoolData.provinceId ?? null,
                city: schoolData.city ?? schoolData.cityId ?? null,
                district: schoolData.district ?? schoolData.districtId ?? null,
                village: schoolData.village ?? schoolData.villageId ?? null,
            };
            setAddress(schoolData.address || "");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, schoolData]);
    useEffect(() => {
        const fetchProvinces = async () => {
            setProvincesLoading(true);
            try {
                const response = await api.get(endpoints.locations.getProvinces);
                setProvinces(response.data.data || response.data || []);
            } catch (error) {
                console.error("Error fetching provinces:", error);
            } finally {
                setProvincesLoading(false);
            }
        };
        fetchProvinces();
    }, []);
    useEffect(() => {
        setCities([]); setSelectedCity(null);
        setSectors([]); setSelectedSector(null);
        setZones([]); setSelectedZone(null);
        if (!selectedProvince) return;
        const fetchCities = async () => {
            setCitiesLoading(true);
            try {
                const response = await api.get(endpoints.locations.getCities(selectedProvince.id));
                setCities(response.data.data || response.data || []);
            } catch (error) { console.error("Error fetching cities:", error); } 
            finally { setCitiesLoading(false); }
        };
        fetchCities();
    }, [selectedProvince]);
    useEffect(() => {
        setSectors([]); setSelectedSector(null);
        setZones([]); setSelectedZone(null);
        if (!selectedCity) return;
        const fetchSectors = async () => {
            setSectorsLoading(true);
            try {
                const response = await api.get(endpoints.locations.getSectors(selectedCity.id));
                setSectors(response.data.data || response.data || []);
            } catch (error) { console.error("Error fetching sectors:", error); } 
            finally { setSectorsLoading(false); }
        };
        fetchSectors();
    }, [selectedCity]);
    useEffect(() => {
        setZones([]); setSelectedZone(null);
        if (!selectedSector) return;
        const fetchZones = async () => {
            setZonesLoading(true);
            try {
                const response = await api.get(endpoints.locations.getZones(selectedSector.id));
                setZones(response.data.data || response.data || []);
            } catch (error) { console.error("Error fetching zones:", error); } 
            finally { setZonesLoading(false); }
        };
        fetchZones();
    }, [selectedSector]);

    
    const toggleDropdown = (key, type = 'location') => {
      const setDropdownState = type === 'location' ? setOpenDropdown : '';
      setDropdownState(prev => ({ ...prev, [key]: !prev[key] }));
    };
    const handleSelect = (handler, option, dropdownKey, type = 'location') => {
        handler(option);
        toggleDropdown(dropdownKey, type);
    };
    const locationDropdowns = [
        { key: 'province', label: 'استان', value: selectedProvince, options: provinces, loading: provincesLoading, handler: setSelectedProvince },
        { key: 'city', label: 'شهرستان', value: selectedCity, options: cities, loading: citiesLoading, handler: setSelectedCity, disabled: !selectedProvince },
        { key: 'sector', label: 'بخش/شهر', value: selectedSector, options: sectors, loading: sectorsLoading, handler: setSelectedSector, disabled: !selectedCity },
        { key: 'zone', label: 'روستا/منطقه', value: selectedZone, options: zones, loading: zonesLoading, handler: setSelectedZone, disabled: !selectedSector },
    ];


    // ---------- formik (unchanged except initial values kept) ----------
    const formik = useFormik({
        initialValues: {
            firstName: schoolData.firstName || '',
            schoolID: schoolData.code || '',
            approximateCap: schoolData.approximateCap || '',
            classNumber: schoolData.classNumber || '',
            firstCallNum: schoolData.contacts?.firstCallNum || '',
                                                                                                                                                                                                                                  secondCallNum: schoolData.contacts?.secondCallNum || '',
            thirdCallNum: schoolData.contacts?.thirdCallNum || '',
            email: schoolData.contacts?.email || '',
            adminName: schoolData.adminName || '',
            firstDeputy: schoolData.firstDeputy || '',
            secondDeputy: schoolData.secondDeputy || '',
            thirdDeputy: schoolData.thirdDeputy || '',
            fourthDeputy: schoolData.fourthDeputy || '',
            fifthDeputy: schoolData.fifthDeputy || '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('ضروری'),
            schoolID: Yup.string().required('ضروری'),
            approximateCap: Yup.number().required('ضروری'),
            classNumber: Yup.number().required('ضروری'),
            firstCallNum: Yup.number().required('ضروری'),
            secondCallNum: Yup.number().nullable(),
            thirdCallNum: Yup.number().nullable(),
            email: Yup.string().email().nullable(),
            adminName: Yup.string().required('ضروری'),
            firstDeputy: Yup.string().required('ضروری'),
            secondDeputy: Yup.string().nullable(),
            thirdDeputy: Yup.string().nullable(),
            fourthDeputy: Yup.string().nullable(),
            fifthDeputy: Yup.string().nullable(),
        }),
        onSubmit: (values) => {
           const newSchool = {
                id: mode === "add" ? Date.now() : schoolData.id,
                name: values.firstName,
                code: values.schoolID,
                schoolType: selectedOption,
                grade: selectedOption3,
                majors: tags,
                gender: selectedOption2,
                province: province || schoolData.province || "",
                city: county || schoolData.city || "",
                district,
                village,
                address,
                status: "باز",
                present: "۲۴۱",
                absent: "۱۸",
                ...values
            };
            
            if (from === "schools") {
                navigate("/schools", { state: { updatedSchool: newSchool, mode, from } });
            } else if (from === "schoolList") {
                navigate("/schoolList", { state: { updatedSchool: newSchool, mode, from } });
            } else {
                navigate("/schoolList", { state: { updatedSchool: newSchool, mode, from } });
            }
        }
    });
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

    return (
        <div>
            <Header/>
                <div className='App-Container'>
                    <Sidebar />
                    <div className='Main-Content' id='main'>
                        <div className={styles.container}>
                            
                            <div className={styles.headers_container}>
                                <div className={styles.back_container} onClick={() => navigate(-1)}>
                                        <svg viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.57935 12.0483L1.02378 20.7829C0.642324 21.1722 0.646215 21.795 1.03157 22.1842L2.56129 23.7139C2.95443 24.1032 3.585 24.1032 3.97425 23.71L14.8614 12.7528C15.056 12.5582 15.1533 12.3052 15.1533 12.0483C15.1533 11.7914 15.056 11.5384 14.8614 11.3438L3.97425 0.386562C3.585 -0.00657463 2.95443 -0.00657463 2.56129 0.382669L1.03157 1.9124C0.646215 2.30164 0.642324 2.92443 1.02378 3.31367L9.57935 12.0483Z" fill="white"/>
                                        </svg>
                                    <p className={styles.back_txt}>بازگشت</p>
                                </div>
    
                                <div className={styles.header}>
                                    <div className={styles.right}>
                                        <svg viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.51295 0.603027C3.61581 0.603027 2.07921 2.13963 2.07921 4.03677V29.7898H26.1154V26.3561H35.4006L36.4166 28.0729L35.4006 29.7898H43.2841V4.03677C43.2841 2.13963 41.7475 0.603027 39.8503 0.603027H5.51295ZM32.9829 7.47051C33.422 7.47051 33.8611 7.63785 34.1967 7.97349C34.868 8.64479 34.868 9.72996 34.1967 10.4013L25.6124 18.9856C24.9411 19.6569 23.8559 19.6569 23.1846 18.9856L19.2479 15.0489L11.8774 22.4193C11.5427 22.7541 11.1031 22.9223 10.6636 22.9223C10.224 22.9223 9.78447 22.7541 9.44968 22.4193C8.77838 21.748 8.77838 20.6629 9.44968 19.9916L18.034 11.4072C18.7053 10.7359 19.7905 10.7359 20.4618 11.4072L24.3985 15.344L31.769 7.97349C32.1046 7.63785 32.5438 7.47051 32.9829 7.47051ZM2.07921 33.2235C1.85171 33.2203 1.62583 33.2624 1.41471 33.3472C1.20359 33.432 1.01144 33.558 0.849415 33.7177C0.687395 33.8775 0.558739 34.0678 0.470925 34.2777C0.383112 34.4876 0.337891 34.7129 0.337891 34.9404C0.337891 35.1679 0.383112 35.3932 0.470925 35.6031C0.558739 35.813 0.687395 36.0034 0.849415 36.1631C1.01144 36.3228 1.20359 36.4488 1.41471 36.5336C1.62583 36.6185 1.85171 36.6605 2.07921 36.6573H43.2841C43.5116 36.6605 43.7375 36.6185 43.9486 36.5336C44.1597 36.4488 44.3519 36.3228 44.5139 36.1631C44.6759 36.0034 44.8046 35.813 44.8924 35.6031C44.9802 35.3932 45.0254 35.1679 45.0254 34.9404C45.0254 34.7129 44.9802 34.4876 44.8924 34.2777C44.8046 34.0678 44.6759 33.8775 44.5139 33.7177C44.3519 33.558 44.1597 33.432 43.9486 33.3472C43.7375 33.2624 43.5116 33.2203 43.2841 33.2235H2.07921Z" fill="white"/>
                                        </svg>
                                        <h1>مدیریت اطلاعات آموزشگاه</h1>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.rest}>
                                <div className={styles.both_container}>
                                    <div className={styles.scroll_both}>
                                        <form onSubmit={formik.handleSubmit} className={styles.form_styles}>

                                            <div className={styles.sec_header}>
                                                <div className={styles.left_line} />
                                                    <p className={styles.sec_name}>مشخصات آموزشگاه</p>
                                                <div className={styles.right_line} />
                                            </div>
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
                                            {/* نوع مدرسه */}
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
                                                    <label className={styles.txt_lbl}>:نوع مدرسه</label>
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
                                            {/* مقطع */}
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
                                                    <label className={styles.txt_lbl}>:مقطع</label>
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
                                            {/* رشته ها */}
                                            <div className={styles.tag_adder}>
                                                <div className={styles.all_dropdown}>

                                                    <div className={styles.dropdown_exept_txt2}>

                                                        <button
                                                            type="button"
                                                            className={styles.addBtn}
                                                            onClick={(e) => { e.stopPropagation(); handleAdd(); }}
                                                            aria-label="افزودن"
                                                        >
                                                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M16.8242 3.50488C9.23009 3.50488 3.07422 9.66076 3.07422 17.2549C3.07422 24.849 9.23009 31.0049 16.8242 31.0049C24.4183 31.0049 30.5742 24.849 30.5742 17.2549C30.5742 9.66076 24.4183 3.50488 16.8242 3.50488ZM22.3242 18.6299H18.1992V22.7549H15.4492V18.6299H11.3242V15.8799H15.4492V11.7549H18.1992V15.8799H22.3242V18.6299Z" fill="#fff"/>
                                                            </svg>
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
                                                        <label className={styles.txt_lbl}>:رشته های موجود</label>
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
                                            {/* جنسیت */}
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
                                                    <label className={styles.txt_lbl}>:جنسیت</label>
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
                                            
                                            <div className={`${styles.sec_header} ${styles.sec_header3}`}>
                                                <div className={styles.left_line} />
                                                    <p className={styles.sec_name}>اطلاعات تماس آموزشگاه</p>
                                                <div className={styles.right_line} />
                                            </div>
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

                                            <div className={styles.sec_header}>
                                                <div className={styles.left_line} />
                                                    <p className={styles.sec_name}>آدرس آموزشگاه</p>
                                                <div className={styles.right_line} />
                                            </div>
                                            {/* ---------- ADDRESS DROPDOWNS: provinces, counties, districts, villages ---------- */}
                                            {locationDropdowns.map(({ key, label, value, options, loading, handler, disabled = false }) => (
                                            <div className={styles.dropdown_container} key={key}>
                                                <div className={styles.dropdown_exept_txt}>
                                                    <div className={`${styles.displayBox} ${disabled ? styles.disabled : ''}`} onClick={() => !disabled && toggleDropdown(key, 'location')}>
                                                        <span>{loading ? 'در حال بارگذاری...' : (value?.name || 'انتخاب کنید')}</span>
                                                    </div>
                                                    <div className={`${styles.arrowBox} ${disabled ? styles.disabled : ''}`} onClick={() => !disabled && toggleDropdown(key, 'location')}><img className={`${styles.arrow} ${openDropdown[key] ? styles.rotate : ''}`} src={drop} alt="arrow" /></div>
                                                </div>
                                                <label className={styles.txt_lbl}>:{label}</label>
                                                {openDropdown[key] && (
                                                    <ul className={`${styles.dropdownMenu} ${openDropdown[key] ? styles.show : ''}`} style={{ top: "70%" }}>
                                                    {options?.length > 0 ? options.map((opt) => (
                                                        <li className={styles.dropdown_item} key={opt.id} onMouseDown={() => handleSelect(handler, opt, key, 'location')}>{opt.name}</li>
                                                    )) : <li className={styles.dropdown_item_disabled}>موردی یافت نشد</li>}
                                                    </ul>
                                                )}
                                            </div>
                                            ))}
                                            <div className={styles.address}>
                                                <label htmlFor="address" className={styles.txt_lbl}>آدرس دقیق:</label>
                                                <textarea id='address' className={styles.txt_area} value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                                                {formik.errors.address && formik.errors.address.address_line_1 && <div className={styles.error}>{formik.errors.address.address_line_1}</div>}
                                            </div>

                                        </form>
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
                                        onClick={(e) => {
                                            e.preventDefault();
                                            formik.handleSubmit();
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