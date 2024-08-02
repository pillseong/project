import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./loginhome.module.css";

function Logininputpage() {
    const navigate = useNavigate();
    
    const handleidinputclick = () => {
        navigate("/mkidpage");
    };

    const handleLogin = () => {
        navigate("/loginpage");
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.loginhomemainbox}>
                <p className={styles.loginmaintext}>함께 떠나요!</p>
                <p className={styles.loginextext}>평범한 일상.</p>
                <p className={styles.loginextext}>당신의 여행 페르소나를 생성하고</p>
                <p className={styles.loginextext}>여행 메이트를 찾아 함께 떠나봐요!</p>
            </div>
            <div className={styles.inputbuttonbox}>
                <button className={styles.logininput} onClick={handleLogin}>로그인</button>
                <button className={styles.mkidinput} onClick={handleidinputclick}>계정생성</button>
            </div>
        </div>
    );
}

export default Logininputpage;