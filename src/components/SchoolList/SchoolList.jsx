import style from "./SchoolList.module.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import 'react-loading-skeleton/dist/skeleton.css';

import Dropdown from "../DropDown/DropDown";
import searchIcon from "../../assets/icons/search.svg";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import male from '../../assets/icons/male.svg';
import female from '../../assets/icons/female.svg';
import x_panel from '../../assets/icons/x-panel-logo.svg';

import api, { endpoints } from "../../config/api";

export default function SchoolList() {
  
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const hasUpdated = React.useRef(false);

    const [selectedSchool, setSelectedSchool] = useState(null);
    const [schoolsLoading, setSchoolsLoading] = useState(false)


    const [schools, setSchools] = useState([]);
        useEffect(() => {
            const fetchSchools = async () => {
                setSchoolsLoading(true);
                try {
                    const response = await api.get(endpoints.getSchools());
                    setSchools(response.data.data || response.data || []);
                } catch (error) {
                    console.error("Error fetching schools:", error);
                } finally {
                    setSchoolsLoading(false);
                }
            }
            fetchSchools();
        }, []
    );

    /* 
        {
    "status": true,
    "message": "عملیات با موفقیت انجام شد.",
    "data": [
    
        {
            "id": 1,
            "name": "Spencer and Sons",
            "official_code": "14132603",
            "school_type": "دولتی",
            "capacity": 90,
            "principal": {
                "id": 8,
                "username": "principal",
                "profile": {
                    "id": 8,
                    "first_name": "مدیر",
                    "last_name": "اول",
                    "national_code": "000343400000",
                    "gender": "male",
                    "birth_date": "2000-01-01",
                    "phone_number": "094340200000"
                }
            },
            "addresses": [
                {
                    "id": 1,
                    "address_line_1": "تهران انقلاب خیابان ایکس بخش ایکس",
                    "address_line_2": null,
                    "postal_code": "5264897563",
                    "location": {
                        "id": 2,
                        "name": "تهران",
                        "type": {
                            "id": 2,
                            "name": "شهرستان"
                        },
                        "metadata": null
                    }
                }
            ],
            "academic_levels": [
                {
                    "id": 3,
                    "name": "متوسطه دوم",
                    "field_of_study": {
                        "id": 1,
                        "name": "فنی حرفه ای"
                    }
                }
            ],
            "current_user_role": null,
            "subscription": {
                "id": 9,
                "plan_name": "نقره‌ای",
                "status": "active",
                "expires_at": "2026/07/02",
                "is_active": true,
                "plan": {
                    "id": 5,
                    "name": "نقره‌ای",
                    "code": "silver",
                    "price": 2000000,
                    "duration_in_days": 325,
                    "is_active": true,
                    "icon_url": "http://localhost/storage/plans/icons/D03ecPJOgzLOMboRYqym8sdouCG8CnhhpuUogpPM.png"
                }
            }
        },
        {
            "id": 2,
            "name": "Schoen, Metz and Donnelly",
            "official_code": "324234235",
            "school_type": "دولتی",
            "capacity": 90,
            "principal": null,
            "addresses": [
                {
                    "id": 3,
                    "address_line_1": "تهران انقلاب خیابان ایکس بخش ایکس",
                    "address_line_2": null,
                    "postal_code": "528974652",
                    "location": {
                        "id": 2,
                        "name": "تهران",
                        "type": {
                            "id": 2,
                            "name": "شهرستان"
                        },
                        "metadata": null
                    }
                }
            ],
            "academic_levels": [
                {
                    "id": 3,
                    "name": "متوسطه دوم",
                    "field_of_study": {
                        "id": 1,
                        "name": "فنی حرفه ای"
                    }
                }
            ],
            "current_user_role": null,
            "subscription": {
                "id": 8,
                "plan_name": "نقره‌ای",
                "status": "active",
                "expires_at": "2026/07/02",
                "is_active": true,
                "plan": {
                    "id": 5,
                    "name": "نقره‌ای",
                    "code": "silver",
                    "price": 2000000,
                    "duration_in_days": 325,
                    "is_active": true,
                    "icon_url": "http://localhost/storage/plans/icons/D03ecPJOgzLOMboRYqym8sdouCG8CnhhpuUogpPM.png"
                }
            }
        }
    ],
    "links": {
        "first": "http://127.0.0.1:4001/api/v1/schools?query=&page=1",
            "last": "http://127.0.0.1:4001/api/v1/schools?query=&page=1",
            "prev": null,
            "next": null
        },
        "meta": {
            "current_page": 1,
            "from": 1,
            "last_page": 1,
            "links": [
                {
                    "url": null,
                    "label": "&laquo; قبلی",
                    "active": false
                },
                {
                    "url": "http://127.0.0.1:4001/api/v1/schools?query=&page=1",
                    "label": "1",
                    "active": true
                },
                {
                    "url": null,
                    "label": "بعدی &raquo;",
                    "active": false
                }
            ],
            "path": "http://127.0.0.1:4001/api/v1/schools",
            "per_page": 15,
            "to": 2,
            "total": 2
        }
    }
    */

    const schoolsList = [
        { key: 'schools', label: 'مدارس', value: selectedSchool, options: schools, loading: schoolsLoading, handler: setSelectedSchool }
    ]

    const options = [
   { value: "mango", label: "دهم شبکه" },
   { value: "banana", label: "دهم حسابداری" },
   { value: "orange", label: "یازدهم شبکه" },
   { value: "kiwi", label: "یازدهم حسابداری" },
   { value: "lemon", label: "دوازدهم شبکه" },
   { value: "melon", label: "دوازدهم حسابداری" },
   { value: "melon", label: "دوازدهم حسابداری" },
   { value: "melon", label: "دوازدهم حسابداری" },

    ];

    const handleSelect = (option) => {
        console.log("انتخاب شد:", option);
    };
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
    const handleEditClick = (school) => {
        navigate("/EditSchoolInfo", { state: { school, mode: "edit", from: "schoolList" } });
    };
    const handleAddClick = () => {
        navigate("/EditSchoolInfo", { state: { mode: "add" } });
    };
    const visibleSchools = schools.filter(s =>
        (s.name && s.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (s.code && s.code.includes(searchTerm))
    );

    useEffect(() => {
        if (location.state?.updatedSchool && !hasUpdated.current) {
            hasUpdated.current = true;
            const { updatedSchool, mode, from } = location.state;

            setSchools(prevSchools => {
                if (mode === "edit") {
                    return prevSchools.map(s => s.id === updatedSchool.id ? updatedSchool : s);
                }
                if (mode === "add") {
                    return [...prevSchools, updatedSchool];
                }
                return prevSchools;
            });

            if (from === "schools") {
            navigate("/schools", { replace: true, state: null });
            } else {
                navigate("/schoolList", { replace: true, state: null });
            }
        }
    }, [location.state, navigate]);



    return (
      <div>
        <Header/>
        <div className='App-Container'>
          <Sidebar/>
          <div className={style.container}>

            <div className={style.add_new_student}>
                <button onClick={handleAddClick}>
                    افزودن مدرسه جدید
                </button>
            </div>

            <div className={style.list_container}>
              <div className={style.header}>
                  <div className={style.right}>
                      <svg width="33" height="31" viewBox="0 0 33 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.26494 0.964844C3.38088 0.964844 2.53303 1.31603 1.90791 1.94115C1.28279 2.56628 0.931603 3.41412 0.931603 4.29818C0.931603 5.18223 1.28279 6.03008 1.90791 6.6552C2.53303 7.28032 3.38088 7.63151 4.26494 7.63151C5.14899 7.63151 5.99684 7.28032 6.62196 6.6552C7.24708 6.03008 7.59827 5.18223 7.59827 4.29818C7.59827 3.41412 7.24708 2.56628 6.62196 1.94115C5.99684 1.31603 5.14899 0.964844 4.26494 0.964844ZM7.98401 0.964844C7.98734 0.968177 7.98639 0.976159 7.98889 0.979492C8.77889 1.86449 9.26494 3.02568 9.26494 4.29818C9.26494 5.80984 8.58363 7.16811 7.51363 8.08561L11.1904 9.13704L14.431 7.83984C15.1543 7.55151 15.9482 7.56005 16.664 7.86589C17.3799 8.17255 17.9325 8.74086 18.2216 9.46419C18.5108 10.1875 18.5023 10.9806 18.1956 11.6973C17.8889 12.4139 17.3206 12.9665 16.5973 13.2565L12.4306 14.9232C11.8348 15.1607 11.1716 15.1958 10.5507 15.0208L9.26494 14.653V14.7148V21.7982H31.3483C32.0383 21.7982 32.5983 21.239 32.5983 20.5482C32.5983 19.8573 32.0383 19.2982 31.3483 19.2982H30.9316V2.21484C30.9316 1.52401 30.3716 0.964844 29.6816 0.964844H7.98401ZM5.49052 9.28516C5.40087 9.28424 5.31138 9.29297 5.2236 9.3112C5.18124 9.30906 5.14116 9.29818 5.09827 9.29818H2.59827C1.21744 9.29818 0.0982695 10.4173 0.0982695 11.7982V21.7982V29.7148C0.095927 29.8805 0.126528 30.0449 0.188296 30.1986C0.250063 30.3524 0.341764 30.4923 0.458069 30.6102C0.574375 30.7282 0.712966 30.8219 0.865787 30.8858C1.01861 30.9497 1.18261 30.9826 1.34827 30.9826C1.51393 30.9826 1.67793 30.9497 1.83075 30.8858C1.98357 30.8219 2.12216 30.7282 2.23847 30.6102C2.35478 30.4923 2.44648 30.3524 2.50824 30.1986C2.57001 30.0449 2.60061 29.8805 2.59827 29.7148V21.7982H5.09827V29.7148C5.09593 29.8805 5.12653 30.0449 5.1883 30.1986C5.25006 30.3524 5.34176 30.4923 5.45807 30.6102C5.57438 30.7282 5.71297 30.8219 5.86579 30.8858C6.01861 30.9497 6.18261 30.9826 6.34827 30.9826C6.51393 30.9826 6.67793 30.9497 6.83075 30.8858C6.98357 30.8219 7.12216 30.7282 7.23847 30.6102C7.35477 30.4923 7.44648 30.3524 7.50824 30.1986C7.57001 30.0449 7.60061 29.8805 7.59827 29.7148V18.8815V12.4427L11.0048 13.416C11.271 13.4922 11.555 13.4779 11.8121 13.3753L15.9788 11.7087C16.254 11.6031 16.483 11.4038 16.6255 11.1458C16.768 10.8878 16.8148 10.5877 16.7575 10.2986C16.7003 10.0095 16.5427 9.74991 16.3127 9.56567C16.0827 9.38142 15.7949 9.28438 15.5003 9.29167C15.3459 9.29565 15.1936 9.32821 15.0511 9.3877L11.2815 10.8949L5.85836 9.34701C5.73953 9.30811 5.61554 9.28726 5.49052 9.28516Z" fill="#fff"/>
                      </svg>
                      <h1>لیست کل مدارس</h1>
                      <p>{schools.length} مدرسه وجود دارد.</p>
                  </div>
                      <div className={style.filter}>
                      <Dropdown options={options} defualt={"به ترتیب کد مدرسه"} onSelect={handleSelect} />
                      <div className={style.search}>
                      <input 
                          type="text" 
                          placeholder="جستجو میان دانش آموزان..."
                          value={searchTerm}
                          onChange={handleSearchChange}
                      />
                          <img src={searchIcon} alt="جستجو" />
                      </div>
                  </div>
              </div>

                <div style={{ width: "99.389%" }} className={style.row}>
                    <div className={style.item}>
                        <p>نام آموزشگاه</p>
                    </div>
                    <div className={style.item}>
                        <p>جنسیت</p>
                    </div>
                    <div className={style.item}>
                        <p>استان</p>
                    </div>
                    <div className={style.item}>
                        <p>شهر</p>
                    </div>
                    <div className={style.item}>
                        <p>وضعیت</p>
                    </div>
                    <div className={style.item}>
                        <p>کد مدرسه</p>
                    </div>
                    <div className={style.item}>
                        <p>حاضرین</p>
                    </div>
                    <div className={style.item}>
                        <p>غایبین</p>
                    </div>
                    <div className={style.item}>
                        <p>نام مدیریت</p>
                    </div>

                    <div className={style.x_panel}>
                        <img src={x_panel} alt='' />
                    </div>
                </div>

              <div className={style.days}>

                <div className={style.table}>
                  {schools.map((s) => (
                    <div className={style.row} key={s.id}>
                      <div className={style.item}><p>{s.name}</p></div>
                      <div className={style.item}><img src={s.gender === 'female' ? female : male} alt='' /></div>
                      <div className={style.item}>{s.addresses?.[0]?.location?.name || ""}</div>
                      <div className={style.item}><p>{s.addresses?.[0]?.location?.type?.name || ""}</p></div>
                      <div className={style.item}><p>{s.status}</p></div>
                      <div className={style.item}><p>{s.official_code}</p></div>
                      <div className={style.item}><p>{s.present}</p></div>
                      <div className={style.item}><p>{s.absent}</p></div>
                      <div className={style.item}><p>{s.principal?.profile?.first_name} {s.principal?.profile?.last_name}</p></div>

                      <div className={`${style.edit} ${style.display}`} onClick={() => handleEditClick(s)}>
                        <p>مدیریت</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
}