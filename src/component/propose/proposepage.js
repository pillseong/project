import React from "react";
import Proposepagestyle from "./proposepage.module.css"
import { useNavigate } from "react-router-dom";
function Proposepage(){
    const navigate=useNavigate()
    const hadlebackclick=()=>{
        navigate("/personamain")
    }
    const hadlereturnclick=()=>{
        navigate("/personamain")
    }
    return(
        <div className={Proposepagestyle.proppage}>
             <div className={Proposepagestyle.dateCrebackbuttons } onClick={hadlebackclick}></div>
            <p className={Proposepagestyle.dateheadertext}>여행 생성</p>
            <div className={Proposepagestyle.checkbox}>
                <di className={Proposepagestyle.check}></di>

            </div>
           <div className={Proposepagestyle.porpmaintext}>제안 완료!!</div>
           <div className={Proposepagestyle.porpmaintext1}>OO님이 제안을 수락하면</div>
           <div className={Proposepagestyle.porpmaintext2}>여행 일정이 생성됩니다</div>
           <div className={Proposepagestyle.porpfooterbutton}>
            <p className={Proposepagestyle.propstatetext} onClick={hadlereturnclick}>확인</p>

           </div>



        </div>
    )

}
export default Proposepage