import React, { useEffect, useRef, useState } from 'react'
import style from './AddStudent.module.css';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Calenderinput from '../../components/Calendar/calendarInput';

import drop_blue from '../../assets/icons/Drop.svg';
import image_preview from '../../assets/icons/image-preview.svg';
import back from '../../assets/icons/back.svg';

export default function AddStudent() {

  const fields = [
    { name: 'firstName', label: 'نام', required: true },
    { name: 'lastName', label: 'نام خانوادگی', required: true },
  ];
  const fields2 = [
    { name: 'studentPhone', label: 'شماره تماس دانش آموز', required: true },
  ]
  const fields3 = [
    { name: 'studentNationalId', label: 'کد ملی دانش آموز', required: true },
    { name: 'studentBirthCertificate', label: 'سریال شناسنامه دانش آموز' },
    { name: 'placeOfIssue', label: 'محل صدور' },
    { name: 'birthOfPlace', label: 'محل تولد' },
  ]
  const fields4 = [
    { name: 'fatherName', label: 'نام پدر', required: true },
    { name: 'motherName', label: 'نام مادر' },
    { name: 'fatherPhone', label: 'شماره تماس پدر', required: true },
    { name: 'motherPhone', label: 'شماره تماس مادر' },
    { name: 'fatherNationalId', label: 'کد ملی پدر (ولی قانونی)' },
    { name: 'motherNationalId', label: 'کد ملی مادر (ولی قانونی)' },
    { name: 'fatherJob', label: 'شغل پدر (ولی قانونی)'},
    { name: 'motherJob', label: 'شغل  مادر (ولی قانونی)'},
    { name: 'fatherEducation', label: 'تحصیلات پدر (ولی قانونی)'},
    { name: 'motherEducation', label: 'تحصیلات مادر (ولی قانونی)'},
  ]
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      fatherName: '',
      motherName: '',
      studentPhone: '',
      fatherPhone: '',
      motherPhone: '',
      studentNationalId: '',
      fatherNationalId: '',
      motherNationalId: '',
      studentBirthCertificate: '',
      motherJob: '',
      motherEducation: '',
      fatherEducation: '',
      fatherJob: '',
      birthDate: '',
      placeOfIssue: '',
      birthOfPlace: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('ضروری'),
      lastName: Yup.string().required('ضروری'),
      fatherName: Yup.string().required('ضروری'),
      motherName: Yup.string(),
      studentPhone: Yup.string().required('ضروری'),
      fatherPhone: Yup.string().required('ضروری'),
      motherPhone: Yup.string(),
      studentNationalId: Yup.string().required('ضروری'),
      fatherNationalId: Yup.string(),
      motherNationalId: Yup.string(),
      studentBirthCertificate: Yup.string(),
      motherJob: Yup.string(),
      motherEducation: Yup.string(),
      fatherEducation: Yup.string(),
      fatherJob: Yup.string(),
      birthDate: Yup.string(),
      placeOfIssue: Yup.string(),
      birthOfPlace: Yup.string(),
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
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [address, setAddress] = useState('');
  const [major, setMajor] = useState('');
  const [grade, setGrade] = useState('');
  const [className, setClassName] = useState('');
  const majors = ['ریاضی', 'تجربی', 'انسانی'];
  const grades = ['دهم', 'یازدهم', 'دوازدهم'];
  const classes = ['الف', 'ب', 'ج'];
  const [religion, setReligion] = useState('');
  const [denomination, setDenomation] = useState('');
  const religions = ['زرتشتی', 'اسلام', 'مسیحیت'];
  const denominations = ['شیعه', 'سنی'];
  const wrapperRef = useRef();
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState({
    province: false,
    county: false,
    district: false,
    village: false,
  });
  const [openDropdown2, setOpenDropdown2] = useState({
    province: false,
    county: false,
    district: false,
    village: false,
  });
  const [openDropdown3, setOpenDropdown3] = useState({
    religion: false,
    denomination: false,
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

  const toggleDropdown2 = (key) => {
    setOpenDropdown2((prev) => {
      const newState = { province: false, county: false, district: false, village: false };
      newState[key] = !prev[key];
      return newState;
    });
  };
  const closeDropdown2 = (key) => {
    setOpenDropdown2((prev) => ({ ...prev, [key]: false }));
  };
  const handleSelectOption2 = (key, option) => {
    if (key === 'province') {
      setMajor(option);
      setGrade('');
      setClassName('');
    } else if (key === 'county') {
      setGrade(option);
      setClassName('');
    } else if (key === 'district') {
      setClassName(option);
    }
    closeDropdown2(key);
  };

  const toggleDropdown3 = (key) => {
    setOpenDropdown3((prev) => {
      const newState = { religion: false, denomination: false };
      newState[key] = !prev[key];
      return newState;
    });
  };
  const closeDropdown3 = (key) => {
    setOpenDropdown3((prev) => ({ ...prev, [key]: false }));
  };
  const handleSelectOption3 = (key, option) => {
    if (key === 'religion') {
      setReligion(option);
      setDenomation('');
    } else if (key === 'denomination') {
      setDenomation(option);
    }
    closeDropdown3(key);
  };


  const onClose = () => {
    navigate('/EditSchool');
  };

  const provinces = Object.keys(data);
  const counties = province ? Object.keys(data[province]) : [];
  const districts = province && county ? Object.keys(data[province][county]) : [];
  const villages = province && county && district ? data[province][county][district] : [];

  const handleImageChange = (e) => {
  const file = e.target.files[0];

    if (file) {
      const maxSizeInKB = 500;
      const fileSizeInKB = file.size / 1024;

      if (fileSizeInKB > maxSizeInKB) {
        alert("حجم تصویر نباید بیشتر از ۵۰۰ کیلوبایت باشد."); // use the customized alertttttttt
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setShowLayer(true);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!imagePreview) return;
    setShowLayer(false);
    const timer = setTimeout(() => setShowLayer(true), 50);
    return () => clearTimeout(timer);
  }, [imagePreview]);

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    formik.setFieldValue('birthDate', date);
    setShowCalendar(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='Dashboard'>
      <Header/>
      <div className='App-Container'>
        <Sidebar/>
        <div className='Main-Content' id='main'>
          <div className={style.container}>

            <div className={style.back_container} onClick={() => onClose()}>
              <img className={style.back_img} src={back} alt='back' />
              <p className={style.back_txt}>بازگشت</p>
            </div>

            <div className={style.both_container}>
                <div className={style.scroll_both}>

                  <div className={style.right_inputs}>

                    <div className={style.sec_header}>
                      <div className={style.left_line} />
                      <p className={style.sec_name}>مشخصات فردی</p>
                      <div className={style.right_line} />
                    </div>

                    <form onSubmit={formik.handleSubmit} className={style.form_style}>
                      {fields.map((fields, index) => (
                        <React.Fragment key={index}>
                          <div className={style.inputs}>
                            <input
                              className={style.txt_inp}
                              id={fields.name}
                              name={fields.name}
                              type="text"
                              value={formik.values[fields.name]}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            <label htmlFor={fields.name} className={style.txt_lbl}>
                              {fields.required && <span className={style.required}>*</span>}
                              {fields.label}:
                            </label>
                            {formik.touched[fields.name] && formik.errors[fields.name] && (
                              <div className={style.error}>{formik.errors[fields.name]}</div>
                            )}
                          </div>
                          {index !== fields.length - 1 && <div className={style.spacer}></div>}
                        </React.Fragment>
                      ))}
                      <div className={style.dropdown_container}>
                        <div className={style.dropdown_exept_txt}>
                          <div
                            className={style.displayBox}
                            onClick={() => {
                              setVisible(!visible);
                            }}
                          >
                            {selectedOption || "انتخاب کنید"}
                          </div>

                          <div
                            className={style.arrowBox}
                            onClick={() => {
                              setVisible(!visible);
                            }}
                          >
                            <svg
                              className={`${style.arrow} ${visible ? style.rotate : ''}`}
                              viewBox="0 0 26 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M13.1299 9.96316L4.53266 1.36591C3.60116 0.434414 2.08916 0.434414 1.15766 1.36591C0.226158 2.29741 0.226158 3.80941 1.15766 4.74091L11.5392 15.1224C12.4189 16.0022 13.8432 16.0022 14.7207 15.1224L25.1022 4.74091C26.0337 3.80941 26.0337 2.29741 25.1022 1.36591C24.1707 0.434414 22.6587 0.434414 21.7272 1.36591L13.1299 9.96316Z" fill="#69b0b2" />
                            </svg>
                          </div>
                        </div>

                        <div className={style.dropdown_txt}>
                          <p className={style.gender_lbl}>:جنسیت</p>
                        </div>

                        <div className={`${style.dropdownMenu} ${visible ? style.show : style.hide}`}>
                          <div
                            className={style.dropdownItem}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOption("خانم");
                              setVisible(false);
                            }}
                          >
                            خانم
                          </div>
                          <div
                            className={style.dropdownItem}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOption("آقا");
                              setVisible(false);
                            }}
                          >
                            آقا
                          </div>
                        </div>
                      </div>
                      {fields2.map((fields, index) => (
                        <React.Fragment key={index}>
                          <div className={style.inputs}>
                            <input
                              className={style.txt_inp}
                              id={fields.name}
                              name={fields.name}
                              type="text"
                              value={formik.values[fields.name]}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            <label htmlFor={fields.name} className={style.txt_lbl}>
                              {fields.required && <span className={style.required}>*</span>}
                              {fields.label}:
                            </label>
                            {formik.touched[fields.name] && formik.errors[fields.name] && (
                              <div className={style.error}>{formik.errors[fields.name]}</div>
                            )}
                          </div>
                          {index !== fields.length - 1 && <div className={style.spacer}></div>}
                        </React.Fragment>
                      ))}
                      <div className={style.birthDateWrapper} ref={wrapperRef}>
                        <label className={style.label}>تاریخ تولد:</label>
                        
                          <input
                            type="text"
                            readOnly
                            value={formik.values.birthDate}
                            placeholder="انتخاب کنید"
                            className={style.date_inp}
                          />
                          
                        <div className={style.calendarPopup} onClick={() => setShowCalendar(prev => !prev)}>
                          <Calenderinput
                            onSelectDate={handleSelectDate}
                            selectedDate={selectedDate}
                          />
                        </div>

                      </div>
                      {fields3.map((fields, index) => (
                        <React.Fragment key={index}>
                          <div className={style.inputs}>
                            <input
                              className={style.txt_inp}
                              id={fields.name}
                              name={fields.name}
                              type="text"
                              value={formik.values[fields.name]}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            <label htmlFor={fields.name} className={style.txt_lbl}>
                              {fields.required && <span className={style.required}>*</span>}
                              {fields.label}:
                            </label>
                            {formik.touched[fields.name] && formik.errors[fields.name] && (
                              <div className={style.error}>{formik.errors[fields.name]}</div>
                            )}
                          </div>
                          {index !== fields.length - 1 && <div className={style.spacer}></div>}
                        </React.Fragment>
                      ))}

                      <div className={style.dropdown_container}>
                        <div className={style.dropdown_exept_txt}>
                          <div
                            className={style.displayBox}
                            onClick={() => {
                              setVisible2(!visible2);
                            }}
                          >
                            {selectedOption2 || "انتخاب کنید"}
                          </div>

                          <div
                            className={style.arrowBox}
                            onClick={() => {
                              setVisible2(!visible2);
                            }}
                          >
                            <svg
                              className={`${style.arrow} ${visible2 ? style.rotate : ''}`}
                              viewBox="0 0 26 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M13.1299 9.96316L4.53266 1.36591C3.60116 0.434414 2.08916 0.434414 1.15766 1.36591C0.226158 2.29741 0.226158 3.80941 1.15766 4.74091L11.5392 15.1224C12.4189 16.0022 13.8432 16.0022 14.7207 15.1224L25.1022 4.74091C26.0337 3.80941 26.0337 2.29741 25.1022 1.36591C24.1707 0.434414 22.6587 0.434414 21.7272 1.36591L13.1299 9.96316Z" fill="#69b0b2" />
                            </svg>
                          </div>
                        </div>

                        <div className={style.dropdown_txt}>
                          <span className={style.required}>*</span>
                          <p className={style.mremover}>:ملیت</p>
                        </div>

                        <div className={`${style.dropdownMenu} ${visible2 ? style.show : style.hide}`}>
                          <div
                            className={style.dropdownItem}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOption2("ایرانی");
                              setVisible2(false);
                            }}
                          >
                            ایرانی
                          </div>
                          <div
                            className={style.dropdownItem}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOption2("اتباع");
                              setVisible2(false);
                            }}
                          >
                            اتباع
                          </div>
                        </div>
                      </div>
                      {[
                          {
                            key: 'religion',
                            label: 'دین',
                            value: religion,
                            options: religions,
                            disabled: false,
                          },
                          {
                            key: 'denomination',
                            label: 'مذهب',
                            value: denomination,
                            options: denominations,
                            disabled: religion !== 'اسلام',
                          },
                        ].map(({ key, label, value, options, disabled }, index, arr) => (
                          <React.Fragment key={key}>
                            <div className={style.lists}>
                              <label className={style.txt_list}>
                                <span className={style.red_star}>*</span>
                                {label}:
                              </label>

                              <div className={style.dropdown_exept_txt}>
                                <div className={style.select_icon}
                                  onClick={() => !disabled && toggleDropdown3(key)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      !disabled && toggleDropdown3(key);
                                    }
                                  }}
                                >
                                    <img className={`${style.arrow} ${openDropdown3[key] ? style.rotate : ''}`} src={drop_blue} alt="arrow" />
                                </div>
                                <div
                                  className={`${style.select_wrapper} ${disabled ? style.disabled : ''}`}
                                  tabIndex={0}
                                  role="button"
                                  onClick={() => !disabled && toggleDropdown3(key)}
                                  onBlur={() => closeDropdown3(key)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      !disabled && toggleDropdown3(key);
                                    }
                                  }}
                                >
                                  <div className={style.selected_value}>{value || 'انتخاب کنید'}</div>
                                </div>
                              </div>
                                <ul
                                  className={`${style.dropdown_list} ${openDropdown3[key] ? style.show : ''}`}
                                >
                                  {options.map((opt) => (
                                    <li
                                      key={opt}
                                      className={`${style.dropdown_item} ${opt === value ? style.selected : ''}`}
                                      tabIndex={0}
                                      role="option"
                                      aria-selected={opt === value}
                                      onMouseDown={() => handleSelectOption3(key, opt)}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                          e.preventDefault();
                                          handleSelectOption3(key, opt);
                                        }
                                      }}
                                    >
                                      {opt}
                                    </li>
                                  ))}
                                </ul>
                            </div>
                            {index !== arr.length - 1 && <div className={style.spacer}></div>}
                          </React.Fragment>
                        ))}

                    </form>


                    <div className={`${style.sec_header2} ${style.sec_header3}`}>
                      <div className={style.left_line} />
                      <p className={style.sec_name}>مشخصات محل سکونت</p>
                      <div className={style.right_line} />
                    </div>

                    <form onSubmit={formik.handleSubmit} className={style.form_style}>
                      
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
                            <div className={style.lists}>
                              <label className={style.txt_list}>
                                <span className={style.red_star}>*</span>
                                {label}:
                              </label>
                              <div className={style.dropdown_exept_txt}>
                                <div className={style.select_icon}
                                  onClick={() => !disabled && toggleDropdown(key)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      !disabled && toggleDropdown(key);
                                    }
                                  }}
                                >
                                    <img className={`${style.arrow} ${openDropdown[key] ? style.rotate : ''}`} src={drop_blue} alt="arrow" />
                                </div>
                                <div
                                  className={`${style.select_wrapper} ${disabled ? style.disabled : ''}`}
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
                                  <div className={style.selected_value}>{value || 'انتخاب کنید'}</div>
                                </div>
                              </div>
                                <ul
                                  className={`${style.dropdown_list2} ${openDropdown[key] ? style.show : ''}`}
                                >
                                  {options.map((opt) => (
                                    <li
                                      key={opt}
                                      className={`${style.dropdown_item} ${opt === value ? style.selected : ''}`}
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
                            {index !== arr.length - 1 && <div className={style.spacer}></div>}
                          </React.Fragment>
                        ))}

                      <div className={style.address}>
                        <label htmlFor="address" className={style.txt_lbl2} style={{ marginTop: "1vw" }}>
                          <span className={style.red_star}>*</span>آدرس دقیق:
                        </label>
                        <textarea
                          id='address'
                          className={style.txt_area}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        >
                        </textarea>
                      </div>

                    </form>
                  </div>

                  <div className={style.left_inputs}>
                    <form onSubmit={formik.handleSubmit} className={style.form_style}>
                      
                    <div className={style.sec_header}>
                      <div className={style.left_line} />
                      <p className={style.sec_name}>مشخصات تحصیلی</p>
                      <div className={style.right_line} />
                    </div>

                    {[
                          {
                            key: 'province',
                            label: 'رشته',
                            value: major,
                            options: majors,
                            disabled: false,
                          },
                          {
                            key: 'county',
                            label: 'پایه',
                            value: grade,
                            options: grades,
                            disabled: !major,
                          },
                          {
                            key: 'district',
                            label: 'کلاس',
                            value: className,
                            options: classes,
                            disabled: !grade,
                          },
                        ].map(({ key, label, value, options, disabled }, index, arr) => (
                          <React.Fragment key={key}>
                            <div className={style.lists2}>
                              <label className={style.txt_list}>
                                <span className={style.red_star}>*</span>
                                {label}:
                              </label>
                              <div className={style.dropdown_exept_txt}>
                                <div className={style.select_icon}
                                  onClick={() => !disabled && toggleDropdown2(key)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      !disabled && toggleDropdown2(key);
                                    }
                                  }}
                                >
                                    <img className={`${style.arrow} ${openDropdown2[key] ? style.rotate : ''}`} src={drop_blue} alt="arrow" />
                                </div>
                                <div
                                  className={`${style.select_wrapper} ${disabled ? style.disabled : ''}`}
                                  tabIndex={0}
                                  role="button"
                                  onClick={() => !disabled && toggleDropdown2(key)}
                                  onBlur={() => closeDropdown2(key)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      !disabled && toggleDropdown2(key);
                                    }
                                  }}
                                >
                                  <div className={style.selected_value}>{value || 'انتخاب کنید'}</div>
                                </div>
                              </div>
                                <ul
                                  className={`${style.dropdown_list3} ${openDropdown2[key] ? style.show : ''}`}
                                >
                                  {options.map((opt) => (
                                    <li
                                      key={opt}
                                      className={`${style.dropdown_item} ${opt === value ? style.selected : ''}`}
                                      tabIndex={0}
                                      role="option"
                                      aria-selected={opt === value}
                                      onMouseDown={() => handleSelectOption2(key, opt)}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                          e.preventDefault();
                                          handleSelectOption2(key, opt);
                                        }
                                      }}
                                    >
                                      {opt}
                                    </li>
                                  ))}
                                </ul>
                            </div>
                            {index !== arr.length - 1 && <div className={style.spacer}></div>}
                          </React.Fragment>
                        ))}

                    
                    <div className={style.sec_header2}>
                      <div className={style.left_line} />
                      <p className={style.sec_name}>مشخصات والدین</p>
                      <div className={style.right_line} />
                    </div>

                    {fields4.map((fields, index) => (
                        <React.Fragment key={index}>
                          <div className={style.inputs}>
                            <input
                              className={style.txt_inp}
                              id={fields.name}
                              name={fields.name}
                              type="text"
                              value={formik.values[fields.name]}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            <label htmlFor={fields.name} className={style.txt_lbl}>
                              {fields.required && <span className={style.required}>*</span>}
                              {fields.label}:
                            </label>
                            {formik.touched[fields.name] && formik.errors[fields.name] && (
                              <div className={style.error}>{formik.errors[fields.name]}</div>
                            )}
                          </div>
                          {index !== fields.length - 1 && <div className={style.spacer}></div>}
                        </React.Fragment>
                    ))}

                    </form>
                  </div>

                </div>
            </div>

            <div className={style.image_picker}>
                <label className={style.the_picker} dir="rtl">
                  <div className={`${style.picker_content} ${imagePreview ? style.hide : ''}`}>
                    <img src={image_preview} alt="pin" className={style.picker_icon} />
                    <p className={style.picker_text}>افزودن تصویر</p>
                  </div>

                    <input type="file" accept="image/*" onChange={handleImageChange} hidden />

                    {imagePreview && (
                      <div className={`${style.preview_keeper} ${showLayer ? style.show : ''}`}>
                        <img src={imagePreview} alt="Preview" className={`${style.img_preview} ${showLayer ? style.show : ''}`} />
                      </div>
                    )}
                </label>

                <button
                  type="submit"
                  className={style.submit_btn}
                  onClick={() => {
                    formik.resetForm();
                    setProvince('');
                    setCounty('');
                    setDistrict('');
                    setVillage('');
                    setSelectedOption2('');
                    setSelectedOption('');
                    setMajor('');
                    setGrade('');
                    setClassName('');
                    setReligion('');
                    setDenomation('');
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