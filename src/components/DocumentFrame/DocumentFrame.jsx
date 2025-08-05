import React, { useState, createContext, useContext, useEffect } from 'react'; // <<-- useEffect را اضافه کنید
import { useNavigate, useLocation } from 'react-router-dom';
import style from "./DocumentFrame.module.css";
import Arrow from '../../assets/icons/arrow.svg';

const FormDataContext = createContext(null);

export const useFormData = () => useContext(FormDataContext);

// کلید برای ذخیره در localStorage
const LOCAL_STORAGE_KEY = 'accountingDocumentFormData'; 

export default function DocumentFrame({ children }) {
  const navigate = useNavigate();
  const location = useLocation();


  const [formData, setFormData] = useState(() => {
    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
   
      return storedData ? JSON.parse(storedData) : {};
    } catch (error) {
      console.error("Failed to parse stored form data from localStorage:", error);

      return {};
    }
  });

 
  useEffect(() => {
    const handler = setTimeout(() => {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
        console.log("Form data saved to localStorage:", formData);
      } catch (error) {
        console.error("Failed to save form data to localStorage:", error);
      }
    }, 500); 


    return () => {
      clearTimeout(handler);
    };
  }, [formData]); // این useEffect هر بار که 'formData' تغییر می‌کند، اجرا می‌شود.


  const stepPaths = [
    '/Accounting/Document',
    '/Accounting/Document/2',
    '/Accounting/Document/3',
    '/Accounting/Document/4',
    '/Accounting/Document/5',
    '/Accounting/Document/6',
    '/Accounting/Document/7',
  ];

  const currentPathIndex = stepPaths.indexOf(location.pathname);


  const totalSteps = stepPaths.length;
  const currentStepNumber = currentPathIndex + 1;

  const gotohome = () => {

    navigate("/Accounting");
  };

  const goToPreviousStep = () => {
    if (currentPathIndex > 0) {
      navigate(stepPaths[currentPathIndex - 1]);
    }
  };

  const updateFormData = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const goToNextStep = () => {
    if (currentPathIndex < stepPaths.length - 1) {
      navigate(stepPaths[currentPathIndex + 1]);
    } else {
      // این آخرین مرحله فرم است
      console.log('فرم نهایی شد! اطلاعات:', formData);
     
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        console.log("Form data cleared from localStorage after final submission.");
      } catch (error) {
        console.error("Failed to clear form data from localStorage:", error);
      }
    
    }
  };

  return (
    <FormDataContext.Provider value={{ formData, updateFormData, goToNextStep }}>
      <div>
        <div className={style.conbutton}>
          {currentPathIndex > 0 && (
            <button className={style.button} onClick={goToPreviousStep}>
              <img src={Arrow} alt='' style={{ rotate: "180deg", height: "30px" }} />
              مرحله قبلی
            </button>
          )}

          <button className={style.button} onClick={gotohome}>
            <img src={Arrow} alt='' style={{ rotate: "180deg", height: "30px" }} />
            بازگشت به صفحه اصلی
          </button>
        </div>
        <div className={style.content}>
          {children}
        </div>
        <div className={style.constep}>
          <div>
            <div className={style.step}>
              مرحله: <span style={{ fontSize: '33px', color: 'black', margin: '0 5px' }}>{currentStepNumber}</span>
              <span style={{ fontSize: '25px', color: '#ccc', margin: '0 5px' }}>/</span>
              <span style={{ fontSize: '25px', color: '#666' }}>{totalSteps}</span>
            </div>
          </div>
        </div>
      </div>
    </FormDataContext.Provider>
  );
}