import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./credatemain.module.css"; 

function Credatemain() {
    const [date, setDate] = useState(new Date());
    const [viewMode, setViewMode] = useState('calendar'); 

    const handleToggle = () => {
        setViewMode(prevViewMode => (prevViewMode === 'calendar' ? 'year' : 'calendar'));
    };

    const handleDayClick = (value) => {
        setDate(value);
        if (viewMode === 'month') {
            setViewMode('calendar'); 
        }
    };

    const handleMonthChange = (value) => {
        setDate(value);
        if (viewMode === 'year') {
            setViewMode('calendar'); 
        }
    };

    return (
        <div className={styles.credatemaincontainer}>
            <p className={styles.credatemaintext1}>원하는 여행 날짜를</p>
            <p className={styles.credatemaintext2}>선택해 주세요.</p>
            <div className={styles.datetogglebutton} onClick={handleToggle}>
                <div className={styles.datetoggletextleft}>날짜 지정</div>
                <div className={styles.datetoggletextright}>월단위</div>
                <div className={`${styles.datetogglecircle} ${viewMode === 'year' ? styles.on : styles.off}`}></div>
            </div>
            <div className={styles.datebox}>
                <Calendar
                    onChange={handleDayClick}
                    value={date}
                    view={viewMode}
                    onClickDay={handleDayClick}
                    onViewChange={handleMonthChange} 
                    className={styles.reactCalendar}
                />
            </div>
        </div>
    );
}

export default Credatemain;