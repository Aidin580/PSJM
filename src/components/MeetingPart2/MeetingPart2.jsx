import style from './MeetingPart2.module.css';
import Arrow from '../../assets/icons/arrow.svg';
import { useFormData } from '../MeetingFrame/MeetingFrame';
import React from 'react';
import Calenderinput from '../Calendar/calendarInput';

export default function MeetingPart2() {
    const { formData, updateFormData, goToNextStep } = useFormData();

    // Handler for the custom calendar component
    const handleDateSelect = (date) => {
        updateFormData({ documentDate: date });
    };

    // CORRECT: A single, generic handler for all standard inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    return (
        <div className={style.DocumentPart3}>
            <h1>زمان برگزاری جلسات خود را وارد کنید</h1>
            <div className={style.container}>
                <div className={style.list}>
                    <div className={style.firstoption}>
                        <div className={style.option}>
                            <p>تاریخ:</p>
                            <div className={style.title}>{formData.documentDate || ''}</div>
                        </div>
                        <div className={style.calender}>
                            <Calenderinput onSelectDate={handleDateSelect} selectedDate={formData.documentDate || ''} />
                        </div>
                    </div>
                    <div className={style.option}>
                        <p>شماره:</p>
                        <input
                            type="text"
                            name="documentNumber" // Add name attribute
                            className={style.title}
                            value={formData.documentNumber || ''}
                            onChange={handleChange} // Use generic handler
                        />
                    </div>
                </div>
                <div className={style.list}>
                    <div className={style.optionn}>
                        <p>شروع:</p>
                        <input
                            type="text"
                            name="meetingStart" // Add name attribute
                            className={style.title}
                            value={formData.meetingStart || ''}
                            onChange={handleChange} // Use generic handler
                        />
                    </div>
                    <div className={style.optionn}>
                        <p>پایان:</p>
                        <input
                            type="text"
                            name="meetingEnd" // Add name attribute
                            className={style.title}
                            value={formData.meetingEnd || ''}
                            onChange={handleChange} // Use generic handler
                        />
                    </div>
                </div>
            </div>
            <button className={style.nextButton} onClick={goToNextStep}>
                مرحله بعدی <img src={Arrow} alt='' style={{ height: "20px" }} />
            </button>
        </div>
    );
}