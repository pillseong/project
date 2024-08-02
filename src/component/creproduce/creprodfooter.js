import React from "react"
import Creprodfooterstyle from"./creprodfooter.module.css"
import { useNavigate } from "react-router-dom";
function Creprodfooter(){
    const navigate=useNavigate();
    const handlebackclick=()=>{
        navigate("/credatepage")

    }
    const handlereturnclick=()=>{
        navigate("/mateporp1")

    }
    return(
        <div className={Creprodfooterstyle.prodfooterbox}>
              <div className={Creprodfooterstyle.datecreleftbutton}>
            <div className={Creprodfooterstyle.datecrebuttontext1} onClick={handlebackclick}>이전</div>
            <div className={Creprodfooterstyle.datecresold1}></div>
        </div>
        <div className={Creprodfooterstyle.datecrerightbutton}>
            <div className={Creprodfooterstyle.datecrebuttontext2} onClick={handlereturnclick} >매이트 매칭</div>
            
        </div>

        </div>
    )

}
export default Creprodfooter;