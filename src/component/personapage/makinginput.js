import React from "react";
import mkinputstyle from "./makinginput.module.css"
import { useNavigate } from "react-router-dom";
function Mkinput(){
    const navigate=useNavigate()
    const handlecreatepageClick=()=>{
        navigate("/createpage1")
    }

    return(
        <div className={mkinputstyle.mkinputbox} onClick={handlecreatepageClick}>
            <p className={mkinputstyle.mktext1}>여행 만들기</p>
        </div>
    );

}
export default Mkinput;