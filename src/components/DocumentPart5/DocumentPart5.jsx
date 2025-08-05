import style from './DocumentPart5.module.css';
import Arrow from '../../assets/icons/arrow.svg';
import { useFormData } from '../DocumentFrame/DocumentFrame';
import React, { useState, useEffect } from 'react';
import Pan from "../../assets/icons/pan.svg";
import Trash from "../../assets/icons/Trash.svg";
import DynamicTooltip from "../../components/DynamicTooltip/DynamicTooltip"; 

export default function DocumentPart5() {
  const { formData, updateFormData, goToNextStep } = useFormData();
  const [expenseType, setExpenseType] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [records, setRecords] = useState(formData.documentRecords || []);
  const [details, setDetails] = useState('');
  const [price, setPrice] = useState('');
  const [isedit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    updateFormData({ documentRecords: records });
  }, [records]);

  useEffect(() => {
    if (formData.recordToEditId) {
      const recordToEdit = (formData.documentRecords || []).find(r => r.id === formData.recordToEditId);
      
      if (recordToEdit) {
        setExpenseType(recordToEdit.expenseType);
        setDetails(recordToEdit.details);
        setPrice(recordToEdit.price);
        setIsChecked(recordToEdit.isChecked);
        setEditId(recordToEdit.id);
        setIsEdit(true);
        updateFormData({ recordToEditId: null });
      }
    }
  }, [formData.recordToEditId]);

  const handleAddRecord = () => {
    if (!expenseType || !details || !price) return;
    if (editId !== null) {
      const updatedRecords = records.map((record) =>
        record.id === editId ? { ...record, expenseType, details, price, isChecked } : record
      );
      setRecords(updatedRecords);
      setEditId(null); 
    } else {
      const newRecord = {
        id: Date.now(), expenseType, details, price, isChecked, isedit:false,
      };
      setRecords(prev => [...prev, newRecord]);
    }
    setExpenseType(''); setDetails(''); setPrice(''); setIsChecked(false); setIsEdit(false);
  };

  const handleDelete = (id) => {
    setRecords(prev => prev.filter(record => record.id !== id));
  };
  
  // این تابع اکنون به درستی فراخوانی خواهد شد
  const handleCheckToggle = () => {
    const newCheckState = !isChecked;
    setIsChecked(newCheckState);
    setRecords(prev =>
      prev.map(record => ({
        ...record,
        isChecked: newCheckState,
      }))
    );
  };

  const payment = ["حمل و نقل", "مواد مصرفی", "دستمزد", "سایر"];
  const income = ["فروش کالا", "خدمات ارائه شده", "بودجه"];
  const tankhah = ["ششش", "ccccc", "ccccca"];

  return (
    <div className={style.DocumentPart5}>
        <h1>نوع هزینه ها، شرح جزئیات و مبلغ را انتخاب و وارد کنید</h1>
      <div className={style.all}>
      <div className={style.list}>
          <div className={style.header}>
            <div className={style.right}>
              <p>نوع هزینه:</p>
            </div>
            <div className={style.left} style={{ position: 'relative' }}>
              <div
                className={style.arrowBox}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <svg width="16" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.1299 9.96316L4.53266 1.36591C3.60116 0.434414 2.08916 0.434414 1.15766 1.36591C0.226158 2.29741 0.226158 3.80941 1.15766 4.74091L11.5392 15.1224C12.4189 16.0022 13.8432 16.0022 14.7207 15.1224L25.1022 4.74091C26.0337 3.80941 26.0337 2.29741 25.1022 1.36591C24.1707 0.434414 22.6587 0.434414 21.7272 1.36591L13.1299 9.96316Z" fill="#69b0b2"/>
                </svg>
              </div>
              <div
                className={style.displayBox}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {expenseType ? expenseType : "انتخاب کنید"}
              </div>
              
              {dropdownOpen && (
                <div className={style.dropdownMenu}>
                  {formData.documentType ==="type1" && payment.map((item) => (
                    <div key={item} className={style.dropdownItem} onClick={(e) => { e.stopPropagation(); setExpenseType(item); setDropdownOpen(false); }}>{item}</div>
                  ))}
                  {formData.documentType ==="type2" && income.map((item) => (
                    <div key={item} className={style.dropdownItem} onClick={(e) => { e.stopPropagation(); setExpenseType(item); setDropdownOpen(false); }}>{item}</div>
                  ))}
                  {formData.documentType ==="type3" && tankhah.map((item) => (
                    <div key={item} className={style.dropdownItem} onClick={(e) => { e.stopPropagation(); setExpenseType(item); setDropdownOpen(false); }}>{item}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={style.center}>
            <div className={style.right}>
                <p>شرح جزئیات:</p>
            </div>
            <div className={style.left}>
              <textarea className={style.detail} value={details} onChange={(e) => setDetails(e.target.value)} />
            </div>
          </div>
          <div className={style.footer}>
              <div className={style.right}>
                <p>مبلغ:</p>
            </div>
            <div className={style.left}>
              <input className={style.price} value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
          <div className={style.footercontainer}>
            {/* <<< مشکل اینجا بود و onClick اضافه شد >>> */}
            <div className={style.check} onClick={handleCheckToggle}>
              <div className={style.checkbox}>
                {isChecked && <div className={style.innerSquare}></div>}
              </div>
              <p>چک استفاده شده</p>
            </div>
            <button className={style.button} onClick={()=>{handleAddRecord(); setIsEdit(false);}}>
              {editId !== null ? 'به‌روزرسانی' : 'ثبت هزینه'}
            </button>
          </div>
      </div>
      <div className={style.history}>
                  <div className={style.title}>
                    <div className={style.name}><p>ردیف</p></div>
                    <div className={style.name}><p>نوع هزینه</p></div>
                    <div className={style.name}><p>جزئیات</p></div>
                    <div className={style.name}><p>مبلغ</p></div>
                    <div className={style.name}><p>چک؟</p></div>
                    <div className={style.name}><p>ویرایش</p></div>
                    <div className={style.name}><p>حذف</p></div>
                  </div>
                  <div className={style.table}>
        {records.map((record, index) => (
          <div key={record.id} className={`${style.row} ${editId === record.id ? style.editingRow : ''}`}>
            <div className={style.item}><p>{index + 1}</p></div>
            <div className={style.item}><p>{record.expenseType}</p></div>
            <div className={style.item}>
              <div className={style.text}>
                <DynamicTooltip content={record.details}>
                  <p className={style.textShort}>{record.details}</p>
                </DynamicTooltip>
              </div>
            </div>
            <div className={style.item}><p>{record.price} ریال</p></div>
            <div className={style.button}>
              <div className={style.checkbox}>
                {record.isChecked && <div className={style.innerSquare}></div>}
              </div>
            </div>  
            <button className={style.button} onClick={() => { setEditId(record.id); setExpenseType(record.expenseType); setDetails(record.details); setPrice(record.price); setIsChecked(record.isChecked); setIsEdit(true); }}>
              <img src={Pan} alt="edit" />
            </button>
            <button className={style.button} onClick={() => { if (editId === null) { handleDelete(record.id); } }}>
              <img src={Trash} alt="delete" />
            </button>
          </div>
        ))}
        </div>
      </div>
      </div>
      <button onClick={goToNextStep} className={style.nextButton}>
        مرحله بعدی
        <img src={Arrow} alt='' style={{ height: '20px' }} />
      </button>
    </div>
  );
}