import style from './DocumentPart7.module.css';
import Arrow from '../../assets/icons/arrow.svg';
import { useFormData } from '../DocumentFrame/DocumentFrame';
import { useNavigate } from 'react-router-dom'; // <<< useNavigate را اضافه کنید
import React from 'react';
import Trash from "../../assets/icons/Trash.svg";
import Pan from "../../assets/icons/pan.svg"; // <<< آیکون ویرایش را برگردانید
import DynamicTooltip from "../../components/DynamicTooltip/DynamicTooltip"; 
import Tic from '../../assets/icons/Ticc.svg';

export default function DocumentPart7() {
  const { formData, updateFormData, goToNextStep } = useFormData();
  const navigate = useNavigate(); // <<< هوک برای جابجایی بین صفحات

  const records = formData.documentRecords || [];

  const handleDelete = (idToDelete) => {
    const updatedRecords = records.filter(record => record.id !== idToDelete);
    updateFormData({ documentRecords: updatedRecords });
  };

  // ✅ تابع جدید برای مدیریت ویرایش
  const handleEdit = (recordId) => {
    // 1. شناسه آیتمی که باید ویرایش شود را در formData ذخیره می کنیم
    updateFormData({ recordToEditId: recordId });
    // 2. کاربر را به صفحه 5 منتقل می کنیم
    navigate('/Accounting/Document/5'); 
  };

  return (
    <div className={style.DocumentPart7}>
      <h1>لیست هزینه ها را بررسی کنید</h1>
      <div className={style.all}>
        <div className={style.history}>
          <div className={style.title}>
            <div className={style.name}><p>ردیف</p></div>
            <div className={style.name}><p>نوع هزینه</p></div>
            <div className={style.name}><p>جزئیات</p></div>
            <div className={style.name}><p>مبلغ</p></div>
            <div className={style.name}><p>چک؟</p></div>
            <div className={style.name}><p>ویرایش</p></div> {/* ستون ویرایش اضافه شد */}
            <div className={style.name}><p>حذف</p></div>
          </div>
          <div className={style.table}>
            {records.length > 0 ? (
              records.map((record, index) => (
                <div key={record.id} className={style.row}>
                  <div className={style.item}><p>{index + 1}</p></div>
                  <div className={style.item}><p>{record.expenseType}</p></div>
                  <div className={style.item}>
                     <DynamicTooltip content={record.details}>
                        <p className={style.textShort}>{record.details}</p>
                      </DynamicTooltip>
                  </div>
                  <div className={style.item}><p>{record.price} ریال</p></div>
                  <div className={style.button}>
                    <div className={style.checkbox}>
                      {record.isChecked && <div className={style.innerSquare}></div>}
                    </div>
                  </div>
                  {/* دکمه ویرایش */}
                  <button
                    className={style.button}
                    onClick={() => handleEdit(record.id)}
                  >
                    <img src={Pan} alt="edit" />
                  </button>
                  {/* دکمه حذف */}
                  <button
                    className={style.button}
                    onClick={() => handleDelete(record.id)}
                  >
                    <img src={Trash} alt="delete" />
                  </button>
                </div>
              ))
            ) : (
              <p className={style.emptyMessage}>رکوردی برای نمایش وجود ندارد.</p>
            )}
          </div>
        </div>
      </div>
      <button onClick={goToNextStep} className={style.nextButton}>
        ثبت نهایی 
        <img src={Tic} alt='' style={{ height: '20px' }} />
      </button>
    </div>
  );
}