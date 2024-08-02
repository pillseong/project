import React, { useState } from "react";
import perheaderstyle from "./perheader.module.css";

function Perheader() {
    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    return (
        <div className={perheaderstyle.perheadercontainer}>
            <div className={perheaderstyle.perheadertext}>여행 메이트</div>
            <div className={perheaderstyle.toggleswitch}>
                <div className={perheaderstyle.togglebutton} onClick={handleToggle}>
                    <div className={`${perheaderstyle.toggleoption} ${!isOn ? perheaderstyle.active : ''}`}>
                        <p className={perheaderstyle.text1}>메이트</p></div>
                    <div className={`${perheaderstyle.toggleoption} ${isOn ? perheaderstyle.active : ''}`}>
                        <p className={perheaderstyle.text2}>가이드</p></div>
                    <div className={`${perheaderstyle.togglecircle} ${isOn ? perheaderstyle.on : perheaderstyle.off}`}></div>
                </div>
            </div>
        </div>
    );
}

export default Perheader;