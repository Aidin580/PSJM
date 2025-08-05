import style from './DocumentPart4.module.css';
import Arrow from '../../assets/icons/arrow.svg';
import { useFormData } from '../DocumentFrame/DocumentFrame';
import React from 'react'; // No longer need useState

export default function DocumentPart4() {
  // formData is now the single source of truth
  const { formData, updateFormData, goToNextStep } = useFormData();

  // The description to be displayed, taken directly from formData
  const description = formData.documentDescription || '';

  const handleChange = (e) => {
    // Directly update the shared state on every change
    updateFormData({ documentDescription: e.target.value });
  };

  // The logic to hide the default text now also works off the shared state
  const hideDefault = description.length >= 50;

  return (
    <div className={style.DocumentPart4}>
      <h1>شرح پیوست و سند خود را وارد کنید</h1>
      <div className={style.list}>
        <div className={style.option}>
          <p>شرح سند:</p>
          <textarea
            className={style.title}
            value={description} // Set value from formData
            onChange={handleChange}
            placeholder="شرح سند را اینجا وارد کنید..."
          />
          {!hideDefault && (
            <div className={style.default}>شرح های پیش فرض</div>
          )}
        </div>
        <div className={style.option}>
          <p>پیوست:</p>
          {/* This part remains static for now */}
          <div className={style.title}>0</div>
        </div>
      </div>
      <button className={style.nextButton} onClick={goToNextStep}>
        مرحله بعدی
        <img src={Arrow} alt='' style={{ height: '20px' }} />
      </button>
    </div>
  );
}