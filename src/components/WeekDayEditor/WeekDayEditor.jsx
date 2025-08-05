import styles from "./WeekDayEditor.module.css";
import React, { useState, useEffect } from 'react';
import DownArrow from '../../assets/icons/Drop.svg';

// Dropdown and Selector components remain the same...
const Selector = ({ isActive, onClick }) => {
    return (
        <div className={styles.selectorContainer}>
            <p>تک زنگ ؟</p>
            <div
                className={`${styles.selector} ${isActive ? styles.active : ''}`}
                onClick={onClick}
            ></div>
        </div>
    );
};

const Dropdown = ({ options, onSelect, initialValue }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(initialValue);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (value) => {
        setSelectedValue(value);
        setIsOpen(false);
        if (onSelect) {
            onSelect(value);
        }
    };

    useEffect(() => {
        setSelectedValue(initialValue);
    }, [initialValue]);

    return (
        <div className={styles.dropdownContainer}>
            <div
                className={styles.dropdownHeader}
                onClick={toggleDropdown}
                aria-expanded={isOpen}
            >
                <span className={styles.selectedValue}>{selectedValue}</span>
                <img src={DownArrow} className={styles.dropdownArrow} alt="Dropdown arrow" />
            </div>
            {isOpen && (
                <div className={styles.dropdownList}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={styles.dropdownItem}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


const scheduleData = {
    'دوازدهم شبکه و نرم افزار': {
        'ریاضی': ['هادی صفری', 'علی رضایی'],
        'شبکه': ['محمد حسینی'],
        'برنامه نویسی': ['زهرا کریمی'],
    },
    'یازدهم شبکه و نرم افزار': {
        'فیزیک': ['مجید احمدی'],
        'شیمی': ['لیلا نوروزی'],
    },
    'دهم شبکه و نرم افزار': {
        'ادبیات': ['رضا مرادی'],
        'هنر': ['فاطمه حیدری'],
    },
};

const initialScheduleTemplate = [
    ['شنبه', null, null, null, null],
    ['یکشنبه', null, null, null, null],
    ['دوشنبه', null, null, null, null],
    ['سه شنبه', null, null, null, null],
    ['چهارشنبه', null, null, null, null],
];

export default function WeekDayEditor() {

    const unselectedTeachers = [
        "مهرداد صفری",
        "رضا صفری",
        "علی رضایی"
    ];

    const unselectedCourses = [
        "ریاضی", "فیزیک", "شیمی", "ریاضی", "فیزیک",
        "شیمی", "ریاضی", "فیزیک", "شیمی", "ریاضی",
        "فیزیک", "شیمی", "ریاضی", "فیزیک", "شیمی",
    ];
    const [selectedClass, setSelectedClass] = useState('دوازدهم شبکه و نرم افزار');
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [isHalfBellActive, setIsHalfBellActive] = useState(false);
    const [selectedHalfBell, setSelectedHalfBell] = useState({ day: null, time: null, index: null });

    const [allSchedules, setAllSchedules] = useState(() => {
        const schedules = {};
        Object.keys(scheduleData).forEach(className => {
            schedules[className] = JSON.parse(JSON.stringify(initialScheduleTemplate));
        });
        return schedules;
    });

    const classOptions = Object.keys(scheduleData);
    const lessonOptions = selectedClass ? Object.keys(scheduleData[selectedClass]) : [];
    const teacherOptions = selectedLesson ? scheduleData[selectedClass][selectedLesson] : [];

    useEffect(() => {
        setSelectedLesson(null);
        setSelectedTeacher(null);
    }, [selectedClass]);

    const saveAllToJson = () => {
        const jsonOutput = {};
        const days = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه'];
        const bells = ['زنگ اول', 'زنگ دوم', 'زنگ سوم', 'زنگ چهارم'];

        Object.keys(allSchedules).forEach(className => {
            const classSchedule = allSchedules[className];
            const classOutput = [];

            classSchedule.forEach((dayRow, dayIndex) => {
                dayRow.slice(1).forEach((cellContent, bellIndex) => {
                    if (cellContent) {
                        if (Array.isArray(cellContent)) {
                            if (cellContent[0]) {
                                classOutput.push({
                                    day: days[dayIndex],
                                    bell: bells[bellIndex],
                                    type: 'half-bell',
                                    bell_part: 1,
                                    lesson: cellContent[0].lesson,
                                    teacher: cellContent[0].teacher,
                                });
                            }
                            if (cellContent[1]) {
                                classOutput.push({
                                    day: days[dayIndex],
                                    bell: bells[bellIndex],
                                    type: 'half-bell',
                                    bell_part: 2,
                                    lesson: cellContent[1].lesson,
                                    teacher: cellContent[1].teacher,
                                });
                            }
                        } else {
                            classOutput.push({
                                day: days[dayIndex],
                                bell: bells[bellIndex],
                                type: 'full-bell',
                                lesson: cellContent.lesson,
                                teacher: cellContent.teacher,
                            });
                        }
                    }
                });
            });
            jsonOutput[className] = classOutput;
        });

        console.log('Final JSON Output for all classes:', JSON.stringify(jsonOutput, null, 2));
    };

    useEffect(() => {
        saveAllToJson();
    }, [allSchedules]);

    const handleCellClick = (dayIndex, timeIndex) => {
        const newContent = selectedLesson && selectedTeacher ? { lesson: selectedLesson, teacher: selectedTeacher } : null;

        setAllSchedules(prevAllSchedules => {
            const newAllSchedules = { ...prevAllSchedules };
            const newSchedule = JSON.parse(JSON.stringify(newAllSchedules[selectedClass]));
            
            const currentCellContent = newSchedule[dayIndex][timeIndex];

            if (currentCellContent && !isHalfBellActive) {
                newSchedule[dayIndex][timeIndex] = null;
            
            } else if (isHalfBellActive) {
                 if (newContent) {
                    if (currentCellContent && Array.isArray(currentCellContent)) {
                        if (currentCellContent.length === 1) {
                            newSchedule[dayIndex][timeIndex] = [currentCellContent[0], newContent];
                        }
                    } else {
                        newSchedule[dayIndex][timeIndex] = [newContent];
                    }
                }
            
            } else {
                if (newContent) {
                    newSchedule[dayIndex][timeIndex] = newContent;
                }
            }

            newAllSchedules[selectedClass] = newSchedule;
            return newAllSchedules;
        });
    };

    // 🔽🔽🔽 فقط این تابع تغییر کرده است 🔽🔽🔽
    const handleHalfBellClick = (e, dayIndex, timeIndex, halfIndex) => {
        e.stopPropagation();

        const newContent = selectedLesson && selectedTeacher ? { lesson: selectedLesson, teacher: selectedTeacher } : null;

        setAllSchedules(prevAllSchedules => {
            const newAllSchedules = { ...prevAllSchedules };
            const newSchedule = JSON.parse(JSON.stringify(newAllSchedules[selectedClass]));
            const cell = newSchedule[dayIndex][timeIndex];

            // --- CHANGE START ---
            if (Array.isArray(cell)) {
                const halfCellContent = cell[halfIndex];

                // اگر نیمه کلیک شده پر بود، آن را خالی کن
                if (halfCellContent) {
                    cell[halfIndex] = null;
                } 
                // اگر نیمه کلیک شده خالی بود، آن را با محتوای جدید پر کن
                else {
                    if (newContent) {
                        cell[halfIndex] = newContent;
                    }
                }

                // اگر هر دو نیمه خالی شدند، کل سلول را به null تبدیل کن
                if (cell[0] === null && cell[1] === null) {
                    newSchedule[dayIndex][timeIndex] = null;
                }
            }
            // --- CHANGE END ---

            newAllSchedules[selectedClass] = newSchedule;
            return newAllSchedules;
        });
    };
    // 🔼🔼🔼 پایان تغییرات 🔼🔼🔼

    const toggleHalfBell = () => {
        setIsHalfBellActive(!isHalfBellActive);
        setSelectedHalfBell({ day: null, time: null, index: null });
    };

    const currentSchedule = allSchedules[selectedClass];

    return (
        <>
            <div className={styles.container}>
                <div className={styles.editorWrapper}>
                    <h3>
                        ابتدا درس را انتخاب کرده بعد معلم مربوطه را انتخاب کنید و در نهایت روی زنگ مورد نظر کلیک کنید تا انتخاب شود (برای دروسی که تک زنگ هستند تیک تک زنگ را بزنید!)
                    </h3>
                    <div className={styles.controlsContainer}>
                        <div className={styles.line}>
                            <Dropdown
                                options={classOptions}
                                onSelect={setSelectedClass}
                                initialValue={selectedClass}
                            />
                            <Dropdown
                                options={lessonOptions}
                                onSelect={setSelectedLesson}
                                initialValue={selectedLesson || 'درس را انتخاب کنید'}
                            />
                            <Dropdown
                                options={teacherOptions}
                                onSelect={setSelectedTeacher}
                                initialValue={selectedTeacher || 'معلم را انتخاب کنید'}
                            />
                            <Selector isActive={isHalfBellActive} onClick={toggleHalfBell} />
                        </div>
                    </div>
                    <div className={styles.mainHeader}>
                        برنامه هفتگی
                    </div>
                    <div className={styles.weeklySchedule}>
                        <div className={`${styles.scheduleRow} ${styles.headerRow}`}>
                            <div className={styles.headerCell}>روز های هفته</div>
                            <div className={styles.headerCell}>زنگ اول</div>
                            <div className={styles.headerCell}>زنگ دوم</div>
                            <div className={styles.headerCell}>زنگ سوم</div>
                            <div className={styles.headerCell}>زنگ چهارم</div>
                        </div>
                        {currentSchedule.map((day, dayIndex) => (
                            <div className={styles.scheduleRow} key={dayIndex}>
                                <div className={styles.dayCell}>{day[0]}</div>
                                {day.slice(1).map((cellContent, timeIndex) => (
                                    <div
                                        key={timeIndex}
                                        className={`${styles.scheduleCell} ${cellContent ? styles.filledCell : ''} ${cellContent && Array.isArray(cellContent) ? styles.halfBell : ''}`}
                                        onClick={() => handleCellClick(dayIndex, timeIndex + 1)}
                                    >
                                        {cellContent && !Array.isArray(cellContent) && (
                                            <span>{cellContent.lesson}</span>
                                        )}
                                        {cellContent && Array.isArray(cellContent) && (
                                            <>
                                                <div
                                                    className={`${styles.halfBellPart} ${cellContent ? styles.of: styles.on}`}
                                                    onClick={(e) => handleHalfBellClick(e, dayIndex, timeIndex + 1, 0)}
                                                >
                                                    {cellContent[0]?.lesson && <span>{cellContent[0].lesson}</span>}
                                                </div>
                                                <div
                                                    className={`${styles.halfBellPart} ${cellContent ? styles.of: styles.on}`}
                                                    onClick={(e) => handleHalfBellClick(e, dayIndex, timeIndex + 1, 1)}
                                                >
                                                    {cellContent[1]?.lesson && <span>{cellContent[1].lesson}</span>}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.confooter}>
                <div className={styles.footer}>
                    <h3>دبیرانی که تا کنون انتخاب نشده اند:</h3>
                    <div className={styles.unselectedlist}>
                        {unselectedTeachers.map((teacher, index) => (
                            <p key={index}>{teacher}</p>
                        ))}
                    </div>
                </div>
                <div className={styles.footer}>
                    <h3>دروسی که تاکنون انتخاب نشده اند:</h3>
                    <div className={styles.unselectedlist}>
                        {unselectedCourses.map((course, index) => (
                            <p key={index}>{course}</p>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}