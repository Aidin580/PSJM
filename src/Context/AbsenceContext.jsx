import { createContext, useContext, useState } from 'react';

// ساخت کانتکست
const AbsenceContext = createContext();

// هوک سفارشی برای دسترسی راحت‌تر
export const useAbsence = () => useContext(AbsenceContext);

// پراوایدر کانتکست
export const AbsenceProvider = ({ children }) => {
  const [absentList, setAbsentList] = useState([]);

  // بررسی وجود دانش‌آموز در لیست غایبین
  const isAbsent = (id) => absentList.some((s) => s.id === id);

  // افزودن دانش‌آموز
  const addAbsent = (student) => {
    if (!isAbsent(student.id)) {
      setAbsentList((prev) => [...prev, {
        id: student.id,
        name: student.name,
        lastname: student.lastname,
      }]);
    }
  };

  // حذف دانش‌آموز
  const removeAbsent = (id) => {
    setAbsentList((prev) => prev.filter((student) => student.id !== id));
  };

  // تغییر وضعیت
  const toggleAbsent = (student) => {
    setAbsentList((prev) => {
      const exists = isAbsent(student.id);
      if (exists) {
        return prev.filter((s) => s.id !== student.id);
      } else {
        return [...prev, {
          id: student.id,
          name: student.name,
          lastname: student.lastname,
        }];
      }
    });
  };

  return (
    <AbsenceContext.Provider
      value={{ absentList, addAbsent, removeAbsent, isAbsent, toggleAbsent }}
    >
      {children}
    </AbsenceContext.Provider>
  );
};