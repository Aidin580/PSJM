import style from "./Class.module.css";
import delete1 from "../../assets/icons/delete.svg";
import edit from "../../assets/icons/edit.svg";
import Laptop from "../../assets/icons/Laptop.svg";
import drop from "../../assets/icons/Drop.svg";
import React, { useState, useEffect, useRef } from "react";
import api, { endpoints } from "../../config/api";

export default function Class() {
  const [classes, setClasses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [majors, setMajors] = useState([]);
  const [grades, setGrades] = useState([]);
  const dropdownRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [majorRes, gradeRes, classRes] = await Promise.all([
          api.get(endpoints.getmajor),
          api.get(endpoints.getgrade),
          api.get(endpoints.classes),
        ]);
        console.log("paye2", gradeRes)
        console.log("p2", majorRes)
        setMajors(majorRes.data.data);
        setGrades(gradeRes.data.data);
        console.log("paye", grades)
        console.log("p", majors)

        const mapped = classRes.data.data.map((cls) => ({
          ...cls,
          grade: gradeRes.data.data.find((g) => g.name === cls.grade_level_id),
          major: majorRes.data.data.find((m) => m.name === cls.field_of_study_id),
          number: cls.capacity,
          openGrade: false,
          openMajor: false,
        }));

        setClasses(mapped);
      } catch (err) {
        console.error("خطا:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      dropdownRefs.current.forEach((ref, i) => {
        if (ref && !ref.contains(e.target)) {
          setClasses((prev) => {
            const updated = [...prev];
            updated[i].openGrade = false;
            updated[i].openMajor = false;
            return updated;
          });
        }
      });
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [classes]);

  const handleChange = (i, field, value) => {
    const updated = [...classes];
    updated[i][field] = value;
    setClasses(updated);
  };

  const handleAddClass = () => {
    if (editIndex !== null) return alert("ابتدا ویرایش را تکمیل کنید.");
    if (!grades.length || !majors.length) return alert("در حال بارگذاری اطلاعات...");
    const newClass = {
      name: "", grade: grades[0], major: majors[0], number: "",
      isNew: true, openGrade: false, openMajor: false,
    };
    setClasses([newClass, ...classes]);
    setEditIndex(0);
  };
  console.log("کلاس", classes)

  const handleDelete = async (i) => {
    const cls = classes[i];
    if (!cls.isNew && cls.id) {
      try {
        await api.delete(`${endpoints.classes}/${cls.id}`);
      } catch {
        return alert("خطا در حذف.");
      }
    }
    setClasses((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleEditToggle = async (i) => {
    const cls = classes[i];
    if (editIndex === i) {
      if (!cls.name.trim() || !cls.number.trim()) return alert("نام و ظرفیت الزامی‌ست.");
      try {
        if (cls.isNew) {
          const payload = {
            name: cls.name,
            grade_level_id: cls.grade.id,
            field_of_study_id: cls.major.id,
            capacity: parseInt(cls.number),
          };
          const res = await api.post(endpoints.classes, payload);
          const updated = [...classes];
          updated[i] = { ...res.data, isNew: false, openGrade: false, openMajor: false };
          setClasses(updated);
        } else {
          const res = await api.put(`${endpoints.classes}/${cls.id}`, {
            name: cls.name,
            grade: cls.grade,
            major: cls.major,
            number: parseInt(cls.number),
          });
          const updated = [...classes];
          updated[i] = res.data;
          setClasses(updated);
        }
        setEditIndex(null);
      } catch (err) {
        console.error("خطا در ذخیره:", err);
        alert("ذخیره‌سازی با خطا مواجه شد.");
      }
    } else {
      setEditIndex(i);
    }
  };

  const Dropdown = ({ items, selected, isOpen, onToggle, onSelect }) => (
    <div className={style.customSelectWrapper} onClick={onToggle}>
      <div className={style.selectToggle}>
        <img src={drop} alt="arrow" className={`${style.selectArrow} ${isOpen ? style.open : ""}`} />
      </div>
      <div className={style.customSelectBox}>{selected?.data.name}</div>
      {isOpen && (
        <div className={style.selectDropdown}>
          {items.map((item) => (
            <div key={item.id} onClick={(e) => {
              e.stopPropagation();
              onSelect(item);
            }}>{item.name}</div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.right}>
          <img src={Laptop} alt="" />
          <h1>لیست کلاس‌های مدرسه شما</h1>
        </div>
        <button className={style.button} onClick={handleAddClass}>افزودن کلاس جدید</button>
      </div>

      <div className={style.title}>
        <div className={style.itemcontainer}>
          <div className={style.item1}><p>نام کلاس</p></div>
          <div className={style.item1}><p>پایه</p></div>
          <div className={style.item1}><p className={style.textShort}>رشته</p></div>
          <div className={style.item1}><p>ظرفیت</p></div>
        </div>
      </div>

      <div className={style.table}>
        {classes.map((cls, i) => (
          <div className={style.row} key={i} ref={(el) => dropdownRefs.current[i] = el}>
            <div className={style.item}>
              {editIndex === i
                ? <input placeholder="نام کلاس رو وارد کنید" value={cls.name} onChange={(e) => handleChange(i, "name", e.target.value)} />
                : <p>{cls.name}</p>}
            </div>

            <div className={`${style.item} ${style.display}`}>
              {editIndex === i
                ? <Dropdown
                  items={grades}
                  selected={cls.grade}
                  isOpen={cls.openGrade}
                  onToggle={() => handleChange(i, "openGrade", !cls.openGrade)}
                  onSelect={(val) => handleChange(i, "grade", val)}
                />
                : <div className={style.customSelectWrapper}><div className={style.customSelectBox}>{cls.grade_level?.name}</div></div>}
            </div>

            <div className={style.item}>
              {editIndex === i
                ? <Dropdown
                  items={majors}
                  selected={cls.major}
                  isOpen={cls.openMajor}
                  onToggle={() => handleChange(i, "openMajor", !cls.openMajor)}
                  onSelect={(val) => handleChange(i, "major", val)}
                />
                : <div className={style.customSelectWrapper}><div className={style.customSelectBox}>{cls.field_of_study?.name}</div></div>}
            </div>

            <div className={style.item}>
              {editIndex === i
                ? <input
                  type="number"
                  value={cls.number}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || parseInt(val) <= 100) handleChange(i, "number", val);
                  }}
                  placeholder="ظرفیت کلاس را وارد کنید"
                />
                : <p>{cls.number}</p>}
            </div>

            <div className={`${style.delete} ${editIndex === i ? style.disabled : ""}`} onClick={() => editIndex !== i && handleDelete(i)}>
              <img src={delete1} alt="delete" /><p>حذف</p>
            </div>

            <div className={`${style.edit} ${style.display}`} onClick={() => handleEditToggle(i)}>
              <img src={edit} alt="edit" />
              <p>{editIndex === i ? "تایید" : "ویرایش"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
