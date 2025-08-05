import style from './DocumentPart6.module.css'; // Corrected CSS import if file name matches
import Arrow from '../../assets/icons/arrow.svg';
import { useFormData } from '../DocumentFrame/DocumentFrame';
import React, { useState } from 'react';

export default function DocumentPart6() {
  const { formData, updateFormData, goToNextStep } = useFormData();

  // 1. Initialize state from formData using a UNIQUE key 'accountType'
  const [selectedOption, setSelectedOption] = useState(formData.accountType || null);

  const options = [
    { id: 'school_account', title: 'حساب مدرسه' },
    { id: 'petty_cash', title: 'تنخواه' },
  ];

  const handleSelect = (option) => {
    setSelectedOption(option.id);
    // 2. Save data using the UNIQUE key 'accountType'
    updateFormData({ accountType: option.id });
  };

  return (
    // 3. Use the correct CSS class for this component
    <div className={style.DocumentPart6}>
      <h1>حساب برداشت را انتخاب کنید</h1>
      <div className={style.list}>
        {options.map((option) => (
          <div
            key={option.id}
            className={style.option}
            onClick={() => handleSelect(option)}
          >
            <div className={style.circle}>
              {/* This will now work correctly on refresh */}
              {selectedOption === option.id && <div className={style.dot}></div>}
            </div>
            <div className={style.title}>{option.title}</div>
            <div className={style.price}>
              <p>۱۲،۰۰۰،۰۰۰ ریال</p>
            </div>
          </div>
        ))}
      </div>
      <button className={style.nextButton} onClick={goToNextStep}>
        مرحله بعدی <img src={Arrow} alt='' style={{ height: "20px" }} />
      </button>
    </div>
  );
}