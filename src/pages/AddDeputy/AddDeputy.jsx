import React, { useEffect, useRef, useState } from 'react';
import style from './AddDeputy.module.css';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Calenderinput from '../../components/Calendar/calendarInput';

import back from '../../assets/icons/back.svg';
import image_preview from '../../assets/icons/image-preview.svg';

export default function AddDeputy() {
  const [imagePreview, setImagePreview] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");
  const [showLayer, setShowLayer] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const wrapperRef = useRef();
  const navigate = useNavigate();

  const fields = [
    { name: 'firstName', label: 'نام' },
    { name: 'lastName', label: 'نام خانوادگی' },
    { name: 'personalCode', label: 'کد پرسنلی' },
    { name: 'nationalID', label: 'کد ملی' },
  ];
  const fields2 = [
    { name: 'userName', label: 'نام کاربری' },
    { name: 'password', label: 'رمز عبور' },
    { name: 'passwordAgain', label: 'تکرار رمز عبور' },
  ];

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      personalCode: '',
      nationalID: '',
      userName: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string(),
      lastName: Yup.string(),
      personalCode: Yup.string(),
      nationalID: Yup.string(),
      userName: Yup.string(),
      password: Yup.string(),
      passwordAgain: Yup.string(),
    }),
    onSubmit: ({ resetForm }) => {
      resetForm();
      setImagePreview(null);
    }
  });

  const onClose = () => {
    navigate('/EditSchool');
  };

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
    const timer = setTimeout(() => {}, 50);
    return () => clearTimeout(timer);
  }, [imagePreview]);

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    formik.setFieldValue('birthDate', date);
    setShowCalendar(false);
  };

  return (
    <div className='Dashboard'>
      <Header />
      <div className='App-Container'>
        <Sidebar />
        <div className='Main-Content' id='main'>
          <div className={style.container}>
            <div className={style.back_container} onClick={() => onClose()}>
              <img className={style.back_img} src={back} alt='back' />
              <p className={style.back_txt}>بازگشت</p>
            </div>

            <div className={style.inputs_container}>
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
                  <div className={style.dropdown_expect_txt}>
                    <div
                      className={style.displayBox}
                      onClick={() => {
                        setVisible(!visible);
                        setVisible2(false);
                        setVisible3(false);
                      }}
                    >
                      {selectedOption || "انتخاب کنید"}
                    </div>

                    <div
                      className={style.arrowBox}
                      onClick={() => {
                        setVisible(!visible);
                        setVisible2(false);
                        setVisible3(false);
                      }}
                    >
                      <svg
                        className={`${style.arrow} ${visible ? style.rotate : ''}`}
                        width="30"
                        height="30"
                        viewBox="0 0 26 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M13.1299 9.96316L4.53266 1.36591C3.60116 0.434414 2.08916 0.434414 1.15766 1.36591C0.226158 2.29741 0.226158 3.80941 1.15766 4.74091L11.5392 15.1224C12.4189 16.0022 13.8432 16.0022 14.7207 15.1224L25.1022 4.74091C26.0337 3.80941 26.0337 2.29741 25.1022 1.36591C24.1707 0.434414 22.6587 0.434414 21.7272 1.36591L13.1299 9.96316Z" fill="#69b0b2" />
                      </svg>
                    </div>
                  </div>

                  <div className={style.dropdown_txt}>
                    <p className={style.dropdown_title}>:جنسیت</p>
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

                <div className={style.birthDateWrapper} ref={wrapperRef}>
                  <label className={style.label}>تاریخ تولد:</label>
                  
                  <div className={style.inputWithIcon}>
                    <input
                      type="text"
                      readOnly
                      value={formik.values.birthDate}
                      placeholder="انتخاب کنید"
                      className={style.date_inp}
                    />
                  </div>

                    
                  <div className={style.calendarPopup} onClick={() => setShowCalendar(prev => !prev)}>
                    <Calenderinput
                      onSelectDate={handleSelectDate}
                      selectedDate={selectedDate}
                    />
                  </div>
                </div>

                <div className={style.dropdown_container}>
                  <div className={style.dropdown_expect_txt}>
                    <div
                      className={style.displayBox}
                      onClick={() => {
                        setVisible3(!visible3);
                        setVisible2(false);
                        setVisible(false);
                      }}
                    >
                      {selectedOption3 || "انتخاب کنید"}
                    </div>

                    <div
                      className={style.arrowBox}
                      onClick={() => {
                        setVisible3(!visible3);
                        setVisible2(false);
                        setVisible(false);
                      }}
                    >
                      <svg
                        className={`${style.arrow} ${visible3 ? style.rotate : ''}`}
                        width="30"
                        height="30"
                        viewBox="0 0 26 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M13.1299 9.96316L4.53266 1.36591C3.60116 0.434414 2.08916 0.434414 1.15766 1.36591C0.226158 2.29741 0.226158 3.80941 1.15766 4.74091L11.5392 15.1224C12.4189 16.0022 13.8432 16.0022 14.7207 15.1224L25.1022 4.74091C26.0337 3.80941 26.0337 2.29741 25.1022 1.36591C24.1707 0.434414 22.6587 0.434414 21.7272 1.36591L13.1299 9.96316Z" fill="#69b0b2" />
                      </svg>
                    </div>
                  </div>

                  <div className={style.dropdown_txt}>
                    <p className={style.dropdown_title}>:معاونت</p>
                  </div>

                  <div className={`${style.dropdownMenu} ${visible3 ? style.show : style.hide}`}>
                    <div
                      className={style.dropdownItem}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOption3("پرورشی");
                        setVisible3(false);
                        setVisible2(true);
                      }}
                    >
                      پرورشی
                    </div>
                    <div
                      className={style.dropdownItem}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOption3("فنی");
                        setVisible3(false);
                        setVisible2(true);
                      }}
                    >
                      فنی
                    </div>
                    <div
                      className={style.dropdownItem}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOption3("آموزشی");
                        setVisible3(false);
                      }}
                    >
                      آموزشی
                    </div>
                  </div>
                </div>

                <div className={style.dropdown_container}>
                  <div className={style.dropdown_expect_txt}>
                    <div
                      className={style.displayBox}
                      onClick={() => {
                        setVisible3(false);
                        setVisible2(!visible2);
                        setVisible(false);
                      }}
                    >
                      {selectedOption2 || "انتخاب کنید"}
                    </div>

                    <div
                      className={style.arrowBox}
                      onClick={() => {
                        setVisible3(false);
                        setVisible2(!visible2);
                        setVisible(false);
                      }}
                    >
                      <svg
                        className={`${style.arrow} ${visible2 ? style.rotate : ''}`}
                        width="30"
                        height="30"
                        viewBox="0 0 26 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M13.1299 9.96316L4.53266 1.36591C3.60116 0.434414 2.08916 0.434414 1.15766 1.36591C0.226158 2.29741 0.226158 3.80941 1.15766 4.74091L11.5392 15.1224C12.4189 16.0022 13.8432 16.0022 14.7207 15.1224L25.1022 4.74091C26.0337 3.80941 26.0337 2.29741 25.1022 1.36591C24.1707 0.434414 22.6587 0.434414 21.7272 1.36591L13.1299 9.96316Z" fill="#69b0b2" />
                      </svg>
                    </div>
                  </div>

                  <div className={style.dropdown_txt}>
                    <p className={style.dropdown_title}>:تخصص</p>
                  </div>

                  <div className={`${style.dropdownMenu} ${visible2 ? style.show : style.hide}`}>
                    <div
                      className={style.dropdownItem}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOption2("ریاضی");
                        setVisible2(false);
                      }}
                    >
                      ریاضی
                    </div>
                    <div
                      className={style.dropdownItem}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOption2("شبکه و نرم افزار");
                        setVisible2(false);
                      }}
                    >
                      شبکه و نرم افزار
                    </div>
                    <div
                      className={style.dropdownItem}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOption2("زبان انگلیسی");
                        setVisible2(false);
                      }}
                    >
                      زبان انگلیسی
                    </div>
                    <div
                      className={style.dropdownItem}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOption2("برق");
                        setVisible2(false);
                      }}
                    >
                      برق
                    </div>
                  </div>
                </div>

                {fields2.map((fields2, index) => (
                  <React.Fragment key={index}>
                    <div className={style.inputs}>
                      <input
                        className={style.txt_inp}
                        id={fields2.name}
                        name={fields2.name}
                        type="text"
                        value={formik.values[fields2.name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label htmlFor={fields2.name} className={style.txt_lbl}>
                        {fields2.label}:
                      </label>
                      {formik.touched[fields2.name] && formik.errors[fields2.name] && (
                        <div className={style.error}>{formik.errors[fields2.name]}</div>
                      )}
                    </div>
                    {index !== fields2.length - 1 && <div className={style.spacer}></div>}
                  </React.Fragment>
                ))}
              </form>
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
                  formik.setFieldValue('birthDate', '');
                  setImagePreview(null);
                  setSelectedOption3('');
                  setSelectedOption2('');
                  setSelectedOption('');
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
  );
}
