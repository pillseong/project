import React from "react";
import styles from "./nextmate.module.css"
import { Navigate, useNavigate } from "react-router-dom";

function Nextmate(){
    const navigate=useNavigate()
    const handlereturnclick=()=>{
        navigate("/createpage1")
    } 
     const handlbackclick=()=>{
        navigate("/frmatepage")
    }
    return(
        <div className={styles.mainbox}>
            <div className={styles.Crebackbuttons} onClick={handlbackclick}></div>
            <h1 className={styles.title}>여행 생성</h1>
            <div className={styles.content}>
                <h2 className={styles.subtitle}>여행을 생성하고<br />메이트와 함께 떠납니다.</h2>
                <p className={styles.description}>원하는 여행을 생성하면 여행 궁합이 맞는<br />메이트를 매칭합니다.</p>
                <button className={styles.createButton} onClick={handlereturnclick}>여행 생성 시작</button>
            </div>
        </div>
    );
}

export default Nextmate;