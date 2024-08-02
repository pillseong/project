import React from "react";
import Creproheaderstyle from "./creproheader.module.css";
import { useNavigate } from "react-router-dom";


function Creproheader() {
    const navigate=useNavigate()
    const handlebackclick=()=>{
        navigate("/credatepage")

    }
    return (
        <div className={Creproheaderstyle.proheadercontainer}>
            <div className={Creproheaderstyle.proCrebackbuttons}onClick={handlebackclick}></div>
            <p className={Creproheaderstyle.proheadertext}>여행 생성</p>
            <div className={Creproheaderstyle.prochecklist}>
                <div className={Creproheaderstyle.procheckcircle1}>
                    <div className={Creproheaderstyle.procheckmark}></div>
                </div>
                <div className={Creproheaderstyle.proline1}></div>
                <div className={Creproheaderstyle.procheckcircle2}>
                    <div className={Creproheaderstyle.procheckmark}></div>
                </div>
                <div className={Creproheaderstyle.proline2}></div>
                <div className={Creproheaderstyle.procheckcircle3}>
                    <div className={Creproheaderstyle.procheckmark}></div>
                </div>
            </div>
        </div>
    );
}

export default Creproheader;
