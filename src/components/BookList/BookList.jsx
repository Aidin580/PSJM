import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import styles from './BookList.module.css';


import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function BookList() {

    const [searchTerm, setSearchTerm] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingData, setEditingData] = useState(null);
    const [visible, setVisible] = useState(false);
    const [newBook, setNewBook] = useState("");
    const [newBookID, setNewBookID] = useState("");
    const [newFeild, setNewFeild] = useState("شبکه و نرم افزار رایانه");
    const [isAdding, setIsAdding] = useState(false);
    const navigate = useNavigate();

    const [items, setItems] = useState([
        { id: 1, book: "ریاضی ۱", bookID: "۲۳۴۸۷۶", feild: "شبکه و نرم افزار" },
        { id: 2, book: "فیزیک", bookID: "۴۵۶۰۹۸", feild: "شبکه و نرم افزار" },
        { id: 3, book: "پایگاه داده و برنامه نویسی", bookID: "۶۷۸۰۹۸", feild: "شبکه و نرم افزار" },
        { id: 4, book: "الزامات محیط کار", bookID: "۷۸۹۰۹۸", feild: "شبکه و نرم افزار" },
        { id: 5, book: "نصب و راه اندازی", bookID: "۱۲۳۳۲۱", feild: "شبکه و نرم افزار" },
        { id: 6, book: "دانش فنی تخصصی", bookID: "۱۲۱۲۳۳", feild: "شبکه و نرم افزار" },
    ]);

    const onClose = () => {
    navigate('/schools');
    };

    const visibleSchools = items.filter(
        (s) =>
        s.book.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.bookID.includes(searchTerm)
    );

    const handleDelete = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
        if (editingId === id) {
            setEditingId(null);
            setEditingData(null);
        }
    };
    const startEdit = (s) => {
        setEditingId(s.id);
        setEditingData({ ...s });
    };
    const handleSave = () => {
        if (!editingData) return;
        setItems(prev =>
            prev.map(item => item.id === editingId ? editingData : item)
        );
        setEditingId(null);
        setEditingData(null);
    };
    const handleAddNewFeild = () => {
        if (!newBook || !newBookID || !newFeild) {
            alert("لطفاً تمامی فیلدها را پر کنید.");
            return;
        }
        const newItem = {
            id: items.length + 1,
            book: newBook,
            bookID: newBookID,
            feild: newFeild,
        };
        setItems((prevItems) => [newItem, ...prevItems]);
        setNewBook("");
        setNewBookID("");
        setNewFeild("فنی و حرفه ای");
        setIsAdding(false);
    };
    const handleCancel = () => {
        setIsAdding(false);
        setNewBook("");
        setNewBookID("");
        setNewFeild("فنی و حرفه ای");
    };
    
    return (
        <div>
            <Header />
                <div className='App-Container'>
                <Sidebar />
                <div className={styles.container}>
                    <div className={styles.feilds_container}>
                        <div className={styles.headers_container}>
                            <div className={styles.back_container} onClick={() => onClose()}>
                                    <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.57935 12.0483L1.02378 20.7829C0.642324 21.1722 0.646215 21.795 1.03157 22.1842L2.56129 23.7139C2.95443 24.1032 3.585 24.1032 3.97425 23.71L14.8614 12.7528C15.056 12.5582 15.1533 12.3052 15.1533 12.0483C15.1533 11.7914 15.056 11.5384 14.8614 11.3438L3.97425 0.386562C3.585 -0.00657463 2.95443 -0.00657463 2.56129 0.382669L1.03157 1.9124C0.646215 2.30164 0.642324 2.92443 1.02378 3.31367L9.57935 12.0483Z" fill="white"/>
                                    </svg>
                                <p className={styles.back_txt}>بازگشت</p>
                            </div>

                            <div className={styles.header}>
                                <div className={styles.right}>
                                    <svg width="41" height="37" viewBox="0 0 45 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.40358 0.102539C3.50644 0.102539 1.96984 1.63914 1.96984 3.53628V29.2893H26.006V25.8556H35.2912L36.3072 27.5725L35.2912 29.2893H43.1747V3.53628C43.1747 1.63914 41.6381 0.102539 39.741 0.102539H5.40358ZM32.8735 6.97002C33.3126 6.97002 33.7517 7.13736 34.0874 7.47301C34.7587 8.1443 34.7587 9.22947 34.0874 9.90077L25.503 18.4851C24.8317 19.1564 23.7466 19.1564 23.0753 18.4851L19.1385 14.5484L11.7681 21.9189C11.4333 22.2536 10.9937 22.4218 10.5542 22.4218C10.1147 22.4218 9.67509 22.2536 9.3403 21.9189C8.66901 21.2476 8.66901 20.1624 9.3403 19.4911L17.9247 10.9067C18.5959 10.2354 19.6811 10.2354 20.3524 10.9067L24.2891 14.8435L31.6596 7.47301C31.9953 7.13736 32.4344 6.97002 32.8735 6.97002ZM1.96984 32.7231C1.74233 32.7198 1.51646 32.7619 1.30534 32.8467C1.09421 32.9315 0.902061 33.0575 0.74004 33.2172C0.57802 33.377 0.449364 33.5673 0.36155 33.7772C0.273737 33.9871 0.228516 34.2124 0.228516 34.4399C0.228516 34.6675 0.273737 34.8927 0.36155 35.1026C0.449364 35.3125 0.57802 35.5029 0.74004 35.6626C0.902061 35.8224 1.09421 35.9483 1.30534 36.0331C1.51646 36.118 1.74233 36.16 1.96984 36.1568H43.1747C43.4022 36.16 43.6281 36.118 43.8392 36.0331C44.0503 35.9483 44.2425 35.8224 44.4045 35.6626C44.5665 35.5029 44.6952 35.3125 44.783 35.1026C44.8708 34.8927 44.916 34.6675 44.916 34.4399C44.916 34.2124 44.8708 33.9871 44.783 33.7772C44.6952 33.5673 44.5665 33.377 44.4045 33.2172C44.2425 33.0575 44.0503 32.9315 43.8392 32.8467C43.6281 32.7619 43.4022 32.7198 43.1747 32.7231H1.96984Z" fill="white"/>
                                    </svg>
                                    <h1>لیست دروس</h1>
                                </div>
                                <div className={styles.left}>
                                    <button onClick={() => setIsAdding(true)}>
                                        افزدون درس جدید
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.days}>
                            {isAdding && (
                                <div className={styles.row}>
                                    <div className={styles.item}>
                                        <input
                                            value={newBook}
                                            onChange={(e) => setNewBook(e.target.value)}
                                            placeholder="نام درس"
                                        />
                                    </div>
                                    <div className={styles.item}>
                                        <input
                                            value={newBookID}
                                            onChange={(e) => setNewBookID(e.target.value)}
                                            placeholder="شناسه درس"
                                        />
                                    </div>
                                    <div className={styles.itemgg}>
                                        <div className={styles.arrowBox} onClick={() => setVisible(!visible)}>
                                            <svg
                                                className={`${styles.arrow} ${visible ? styles.rotate : ''}`}
                                                viewBox="0 0 26 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M13.1299 9.96316L4.53266 1.36591C3.60116 0.434414 2.08916 0.434414 1.15766 1.36591C0.226158 2.29741 0.226158 3.80941 1.15766 4.74091L11.5392 15.1224C12.4189 16.0022 13.8432 16.0022 14.7207 15.1224L25.1022 4.74091C26.0337 3.80941 26.0337 2.29741 25.1022 1.36591C24.1707 0.434414 22.6587 0.434414 21.7272 1.36591L13.1299 9.96316Z" fill="#6B69B2" />
                                            </svg>
                                        </div>
                                        <div className={styles.displayBox} onClick={() => setVisible(!visible)}>
                                            {newFeild}
                                        </div>
                                        <div className={`${styles.dropdownMenu} ${visible ? styles.show : styles.hide}`}>
                                            {["انسانی", "تجربی", "حسابداری", "شبکه و نرم افزار رایانه"].map(option => (
                                                <div
                                                    key={option}
                                                    className={styles.dropdownItem}
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        setNewFeild(option);
                                                        setVisible(false);
                                                    }}
                                                >
                                                    {option}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={`${styles.cancel} ${styles.display}`} onClick={handleCancel}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                            <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z" fill='#fff' />
                                        </svg>
                                        <p>لغو</p>
                                    </div>
                                    <div className={`${styles.submit} ${styles.display}`} onClick={handleAddNewFeild}>
                                        <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M28.1051 2.21605L25.5953 0.510063C24.9009 0.0398242 23.9495 0.220266 23.4847 0.909219L11.182 19.0517L5.52816 13.3979C4.93763 12.8073 3.97528 12.8073 3.38475 13.3979L1.23587 15.5468C0.645336 16.1373 0.645336 17.0996 1.23587 17.6956L9.92981 26.3896C10.4165 26.8762 11.182 27.248 11.8709 27.248C12.5599 27.248 13.2543 26.8161 13.7027 26.1654L28.5097 4.32118C28.9799 3.63223 28.7995 2.68628 28.1051 2.21605Z" fill="white"/>
                                        </svg>
                                        <p>تایید</p>
                                    </div>
                                </div>
                            )}
                            <div className={styles.table}>
                                {visibleSchools.map((s) => (
                                    <div className={`${styles.row} ${editingId === s.id ? styles.editing : ''}`} key={s.id}>
                                        {editingId === s.id ? (
                                            <>
                                                <div className={styles.item}>
                                                    <input
                                                        value={editingData?.book ?? ""}
                                                        onChange={(e) => setEditingData(prev => ({ ...prev, book: e.target.value }))}
                                                    />
                                                </div>
                                                <div className={styles.item}>
                                                    <input
                                                        value={editingData?.bookID ?? ""}
                                                        onChange={(e) => setEditingData(prev => ({ ...prev, bookID: e.target.value }))}
                                                    />
                                                </div>
                                                <div className={styles.item}>
                                                    <div className={styles.arrowBox} onClick={() => setVisible(!visible)}>
                                                        <svg
                                                        className={`${styles.arrow} ${visible ? styles.rotate : ''}`}
                                                        viewBox="0 0 26 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                        <path d="M13.1299 9.96316L4.53266 1.36591C3.60116 0.434414 2.08916 0.434414 1.15766 1.36591C0.226158 2.29741 0.226158 3.80941 1.15766 4.74091L11.5392 15.1224C12.4189 16.0022 13.8432 16.0022 14.7207 15.1224L25.1022 4.74091C26.0337 3.80941 26.0337 2.29741 25.1022 1.36591C24.1707 0.434414 22.6587 0.434414 21.7272 1.36591L13.1299 9.96316Z" fill="#6B69B2" />
                                                        </svg>
                                                    </div>
                                                    <div className={styles.displayBox} onClick={() => setVisible(!visible)}>
                                                        {editingData?.feild || "شبکه و نرم افزار رایانه"}
                                                    </div>
                                                    <div className={`${styles.dropdownMenu} ${visible ? styles.show : styles.hide}`}>
                                                        {["انسانی", "تجربی", "حسابداری", "شبکه و نرم افزار رایانه"].map(option => (
                                                        <div
                                                            key={option}
                                                            className={styles.dropdownItem}
                                                            onClick={e => {
                                                            e.stopPropagation();
                                                            setEditingData(prev => ({ ...prev, feild: option }));
                                                            setVisible(false);
                                                            }}
                                                        >
                                                            {option}
                                                        </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* دکمه حذف در حالت ویرایش */}
                                                <div className={`${styles.delete} ${styles.display}`} onClick={() => handleDelete(s.id)}>
                                                    <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3.19287 24.7732C3.19287 26.4654 4.58023 27.8496 6.27623 27.8496H18.6096C20.3055 27.8496 21.6929 26.4654 21.6929 24.7732V7.03711H3.19287V24.7732ZM24.0054 2.41211H18.2241L16.2885 0.0996094H8.59733L6.66162 2.41211H0.880371V4.72461H24.0054V2.41211Z" fill="white"/>
                                                    </svg>
                                                    <p>حذف</p>
                                                </div>
                                                {/* دکمه تایید در حالت ویرایش */}
                                                <div className={`${styles.submit} ${styles.display}`} onClick={handleSave}>
                                                    <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M28.1051 2.21605L25.5953 0.510063C24.9009 0.0398242 23.9495 0.220266 23.4847 0.909219L11.182 19.0517L5.52816 13.3979C4.93763 12.8073 3.97528 12.8073 3.38475 13.3979L1.23587 15.5468C0.645336 16.1373 0.645336 17.0996 1.23587 17.6956L9.92981 26.3896C10.4165 26.8762 11.182 27.248 11.8709 27.248C12.5599 27.248 13.2543 26.8161 13.7027 26.1654L28.5097 4.32118C28.9799 3.63223 28.7995 2.68628 28.1051 2.21605Z" fill="white"/>
                                                    </svg>
                                                    <p>تایید</p>
                                                </div>
                                            </>
                                        ) : (
                                            /* حالت عادی نمایش */
                                            <>
                                                <div className={styles.item}><p>{s.book}</p></div>
                                                <div className={styles.item}><p>{s.bookID}</p></div>
                                                <div className={styles.item}><p>{s.feild}</p></div>

                                                {/* حذف در حالت عادی */}
                                                <div className={`${styles.delete} ${styles.display}`} onClick={() => handleDelete(s.id)}>
                                                    <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3.19287 24.7732C3.19287 26.4654 4.58023 27.8496 6.27623 27.8496H18.6096C20.3055 27.8496 21.6929 26.4654 21.6929 24.7732V7.03711H3.19287V24.7732ZM24.0054 2.41211H18.2241L16.2885 0.0996094H8.59733L6.66162 2.41211H0.880371V4.72461H24.0054V2.41211Z" fill="white"/>
                                                    </svg>
                                                    <p>حذف</p>
                                                </div>
                                                {/* ویرایش در حالت عادی */}
                                                <div className={`${styles.edit} ${styles.display}`} onClick={() => startEdit(s)}>
                                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M26.1791 6.22253L23.6664 8.73522L18.8199 4.03722L21.4068 1.45028C22.0397 0.81744 22.898 0.461914 23.793 0.461914C24.6879 0.461914 25.5463 0.81744 26.1791 1.45028C26.8119 2.08312 27.1675 2.94143 27.1675 3.8364C27.1675 4.73137 26.8119 5.58969 26.1791 6.22253ZM22.1949 10.205L6.74584 25.6541L0.167969 27.4867L1.97191 20.8835L17.3636 5.49184L22.1949 10.205Z" fill="#fff"/>
                                                    </svg>
                                                    <p>ویرایش</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}