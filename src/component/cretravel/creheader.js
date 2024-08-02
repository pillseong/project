import React from "react";
import creheaderstyle from "./creheader.module.css";
import { useNavigate } from "react-router-dom";

function Creheader() {
    const navigate=useNavigate()
    const handlebackclick=()=>{
        navigate("/personamain")
    }
    return (
        <div className={creheaderstyle.Creheadercontainer}>
             <div className={creheaderstyle.Crebackbuttons } onClick={handlebackclick}></div>
            <p className={creheaderstyle.creheadertext}>여행 생성</p>
            <div className={creheaderstyle.checklist}>
                <div className={creheaderstyle.checkcircle1}>
                    <div className={creheaderstyle.checkmark}></div>
                </div>
                <div className={creheaderstyle.line1}></div>
                <div className={creheaderstyle.checkcircle2}>
                    <div className={creheaderstyle.checkmark}></div>
                </div>
                <div className={creheaderstyle.line2}></div>
                <div className={creheaderstyle.checkcircle3}>
                    <div className={creheaderstyle.checkmark}></div>
                </div>
            </div>
        </div>
    );
}

export default Creheader;