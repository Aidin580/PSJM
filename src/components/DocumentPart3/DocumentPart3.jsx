import style from './DocumentPart3.module.css';
import Arrow from '../../assets/icons/arrow.svg';
import { useFormData } from '../DocumentFrame/DocumentFrame';
import React from 'react'; // No need for useState if we use formData directly
import Calenderinput from '../Calendar/calendarInput';

export default function DocumentPart3() {
    // Get formData and the update function from the context
    const { formData, updateFormData, goToNextStep } = useFormData();

    // When a date is selected, update the shared formData
    const handleDateSelect = (date) => {
        updateFormData({ documentDate: date });
    };

    // When the number input changes, update the shared formData
    const handleNumberChange = (e) => {
        updateFormData({ documentNumber: e.target.value });
    };

    return (
        <div className={style.DocumentPart3}>
            <h1>نوع سند خود را وارد کنید</h1>
            <div className={style.list}>
                <div className={style.firstoption}>
                    <div className={style.option}>
                        <p>تاریخ:</p>
                        {/* Display the date directly from the shared formData */}
                        <div className={style.title}>{formData.documentDate || ''}</div>
                    </div>
                    <div className={style.calender}>
                        <Calenderinput onSelectDate={handleDateSelect} selectedDate={formData.documentDate || ''} />
                    </div>
                </div>
                <div className={style.option}>
                    <p>شماره:</p>
                    {/* Add onChange handler and set value from shared formData */}
                    <input
                        type="text"
                        className={style.title}
                        value={formData.documentNumber || ''}
                        onChange={handleNumberChange}
                    />
                </div>
            </div>
            <button className={style.nextButton} onClick={goToNextStep}>
                مرحله بعدی <img src={Arrow} alt='' style={{ height: "20px" }} />
            </button>
        </div>
    );
}