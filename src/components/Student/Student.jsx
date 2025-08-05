import style from "./Student.module.css";
import React from "react";
import Dropdown from "../DropDown/DropDown";
import Graph from "../../assets/icons/Graph.svg";
import Tic from "../../assets/icons/Tic.svg";
import { Link } from "react-router-dom";
import ScoreFormat from '../../utils/ScoreFormat';
import { useAbsence } from '../../Context/AbsenceContext';


export default function StudentList() {
  const { absentList, toggleAbsent } = useAbsence();

  // فرض اینکه لیست کامل دانش‌آموزان در اینجا هنوز به صورت استاتیک تعریف شده
  const students = [
    { id: 1, lastname: "شعبان نژاد", name: "صدرا" },
    { id: 2, lastname: "کریمی", name: "محمد" },
    { id: 3, lastname: "حسینی", name: "علی" },
    { id: 4, lastname: "رضایی", name: "زهرا" },
    { id: 5, lastname: "جعفری", name: "مهدی" },
    { id: 6, lastname: "موسوی", name: "سارا" },
    { id: 7, lastname: "احمدی", name: "امیر" },
    { id: 8, lastname: "قاسمی", name: "فاطمه" },
    { id: 9, lastname: "نوری", name: "حسین" },
    { id: 10, lastname: "صادقی", name: "نگار" },
    { id: 11, lastname: "عباسی", name: "رضا" },
  ];

  const isStudentAbsent = (studentId) => absentList.some((s) => s.id === studentId);

  const handleToggle = (student) => {
    toggleAbsent(student); // student باید شامل id و name باشه
  };

  const options1 = [
    { value: "apple", label: "تمامی کلاس ها" },
    { value: "mango", label: "دهم شبکه" },
    { value: "banana", label: "دهم حسابداری" },
    { value: "orange", label: "یازدهم شبکه" },
    { value: "kiwi", label: "یازدهم حسابداری" },
    { value: "lemon", label: "دوازدهم شبکه" },
    { value: "melon", label: "دوازدهم حسابداری" },
  ];

  const handleSelect = (option) => {
    console.log("انتخاب شد:", option);
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.right}>
          <svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.3387 0.441406C11.3137 0.441406 9.66729 2.05421 9.66729 4.0379C9.66729 6.02159 11.3137 7.63439 13.3387 7.63439C15.3637 7.63439 17.0101 6.02159 17.0101 4.0379C17.0101 2.05421 15.3637 0.441406 13.3387 0.441406ZM4.66498 8.30874C4.24048 8.36493 3.87334 8.66838 3.65534 9.20786L0.993564 17.7046C0.700998 18.57 1.13124 19.4466 1.86553 19.5927L3.65534 19.9973C4.38963 20.1434 5.11244 19.7388 5.26159 18.8734L7.32676 10.2419C7.47592 9.52255 7.00552 8.76954 6.27123 8.62343L5.12391 8.35369C4.97476 8.31997 4.8084 8.29188 4.66498 8.30874ZM9.94265 9.07299C9.20837 9.07299 8.93301 9.92716 8.93301 9.92716C8.34788 12.3716 6.87931 18.8622 6.73016 19.7276C6.43759 21.1662 7.15467 22.3182 7.7398 23.3241C8.32493 24.1895 15.3867 35.1138 16.4135 36.4063C17.297 37.5583 18.1689 38.1147 19.4883 37.3954C20.5152 36.8222 20.3947 35.3892 19.8096 34.3833C19.2245 33.3774 12.0078 21.8855 12.0078 21.8855L13.4764 16.8504C13.4764 16.8504 14.3656 17.9743 14.8073 18.6936C14.9564 18.9802 15.2318 19.1263 15.8169 19.4129C16.5512 19.6995 18.1919 20.7335 19.0753 21.1662C19.9587 21.5989 20.9741 21.7169 21.4158 20.8515C21.8576 20.1322 21.2782 19.2949 20.5439 19.0083C19.8096 18.7217 16.7348 16.8504 16.7348 16.8504C16.7348 16.8504 15.0941 13.3775 14.2107 11.3658C13.3272 9.64056 12.7708 9.07299 11.5948 9.07299H9.94265ZM31.6958 10.5116C30.0724 10.5116 28.7587 11.7985 28.7587 13.3888C28.7587 14.9791 30.0724 16.266 31.6958 16.266C33.3193 16.266 34.633 14.9791 34.633 13.3888C34.633 11.7985 33.3193 10.5116 31.6958 10.5116ZM25.9592 16.4008C25.5175 16.4008 25.0987 16.6874 24.9496 17.1201L23.0221 23.3241C22.7295 23.8973 23.0336 24.4817 23.6187 24.6278L25.0873 24.8976C25.529 25.0437 26.1313 24.611 26.2805 24.1783L27.749 17.8394C27.8982 17.2663 27.4565 16.8616 27.0148 16.7155L25.9592 16.4008ZM29.2176 17.7046C28.6325 17.7046 28.4833 18.289 28.4833 18.289C28.0416 20.0142 27.1639 23.9085 27.0148 24.6278C26.8656 25.7798 27.3073 26.471 27.749 27.1903C28.1908 27.7635 33.3021 35.8107 34.0363 36.6761C34.7706 37.5415 35.3558 37.9686 36.2392 37.3954C36.9735 36.9627 37.0022 35.9568 36.5604 35.2375C36.1187 34.5182 30.8239 26.2013 30.8239 26.2013L31.6958 23.3241L32.5678 24.6278C32.7169 24.9144 32.8603 24.8807 33.3021 25.1673C33.7438 25.4539 35.6426 26.3193 36.3769 26.6059C36.962 26.8925 37.8741 27.0442 38.1667 26.471C38.6084 25.8978 38.2929 25.319 37.7078 25.0324L34.174 23.3241C34.174 23.3241 33.0267 20.7054 32.2924 19.4129C31.7073 18.1204 31.2484 17.7046 30.3649 17.7046H29.2176ZM6.59248 25.1673L5.39927 29.2134C5.39927 29.2134 2.33593 33.546 1.45249 34.698C0.867359 35.5634 0.276491 36.7098 1.45249 37.5752C2.62849 38.4406 3.66682 37.2605 4.25195 36.5412C4.83708 35.968 7.18909 32.6862 7.92337 31.8208C8.36509 31.2476 8.64618 30.8149 8.79533 30.3822C8.94448 30.0956 9.09937 29.7978 9.39194 29.0785L6.59248 25.1673ZM27.1524 28.3592L26.2805 31.3712C26.2805 31.3712 24.0661 34.5519 23.481 35.4173C23.0393 36.1366 22.5976 36.8222 23.481 37.3954C24.3644 38.1147 25.1045 37.2493 25.5462 36.6761C25.9879 36.2434 27.7204 33.8326 28.1621 33.2594C28.4546 32.8267 28.6095 32.512 28.7587 32.2254C28.9078 31.9388 29.0685 31.6747 29.2176 31.1015L27.1524 28.3592Z" fill="white"/>
</svg>
          <h1>لیست دانش آموزان <span className={style.displayon}>کلاس دوازدهم شبکه</span></h1>
          <p>{absentList.length} نفر غایب هستند.</p>
        </div>
        <div className={style.left}>
            <Dropdown options={options1} defualt={"به ترتیب نام خانوادگی"} onSelect={handleSelect} />
        </div>
      </div>

      <div className={style.table}>
        {students.map((student, index) => {
          const isAbsent = isStudentAbsent(student.id);

          return (
            <div key={student.id} className={style.row}>
              <div className={`${style.item} ${style.display}`}>
                <p>{index + 1}</p>
              </div>
              <div className={style.item}>
                <p>{student.name} {student.lastname}</p>
              </div>
              <div className={`${style.item} ${style.display}`}>
                <p>{student.lastname}</p>
              </div>
              <div className={`${style.item} ${style.display}`}>
                <p>نام پدر: -----------</p>
              </div>
              <div className={style.item}>
                <ScoreFormat />
              </div>
              <Link to={`/student/${student.id}`} className={style.delete}>
                <img src={Graph} alt="" />
                <p>مشاهده سوابق</p>
              </Link>
              <div
                className={isAbsent ? style.editAbsent : style.editPresent}
                onClick={() => handleToggle(student)}
                style={{ cursor: "pointer" }}
              >
                <p>{isAbsent ? "غایب" : "حاضر"}</p>
                <div className={isAbsent ? style.checkboxAbsent : style.checkboxPresent}>
                  <img src={Tic} alt="تیک" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}