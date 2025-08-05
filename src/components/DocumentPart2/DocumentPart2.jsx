import style from './DocumentPart2.module.css';
import Arrow from '../../assets/icons/arrow.svg';
import { useFormData } from '../DocumentFrame/DocumentFrame';
import React, { useState } from 'react';

export default function DocumentPart2() {
    const { formData, updateFormData, goToNextStep } = useFormData();

    // *** تغییر در این خط ***
    // مقدار اولیه را از formData بخوان
    const [selectedOption, setSelectedOption] = useState(formData.documentType || null);

    const options = [
        { id: 'type1', title: 'هزینه دریافتی' },
        { id: 'type2', title: 'هزینه پرداختی' },
        { id: 'type3', title: 'سایر(تنخواه)' },
    ];

    const handleSelect = (option) => {
        setSelectedOption(option.id);
        updateFormData({ documentType: option.id });
    };

    return (
        <div className={style.DocumentPart2}>
            <h1>نوع سند خود را وارد کنید</h1>
            <div className={style.list}>
                {options.map((option) => (
                    <div
                        key={option.id}
                        className={style.option}
                        onClick={() => handleSelect(option)}
                    >
                        <div className={style.circle}>
                            {/* این بخش اکنون به درستی کار خواهد کرد */}
                            {selectedOption === option.id && <div className={style.dot}></div>}
                        </div>
                        <div className={style.title}>{option.title}</div>
                    </div>
                ))}
            </div>
            <button className={style.nextButton} onClick={goToNextStep}>
                مرحله بعدی <img src={Arrow} alt='' style={{ height: "20px" }} />
            </button>
        </div>
    );
}