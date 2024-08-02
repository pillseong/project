import React from "react";
import Credateheaderstyle from "./credateheader.module.css"
import { useNavigate } from "react-router-dom";
function Credateheader(){
    const navigate=useNavigate()
    const hadlebackclick=()=>{
        navigate("/personamain")
    }
    return(
        <div className={Credateheaderstyle.dateheadercontainer}>
            <div className={Credateheaderstyle.dateCrebackbuttons }onClick={hadlebackclick} ></div>
            <p className={Credateheaderstyle.dateheadertext}>여행 생성</p>
            <div className={Credateheaderstyle.datechecklist}>
                <div className={Credateheaderstyle.datecheckcircle1}>
                    <div className={Credateheaderstyle.datecheckmark}></div>
                </div>
                <div className={Credateheaderstyle.dateline1}></div>
                <div className={Credateheaderstyle.datecheckcircle2}>
                    <div className={Credateheaderstyle.datecheckmark}></div>
                </div>
                <div className={Credateheaderstyle.dateline2}></div>
                <div className={Credateheaderstyle.datecheckcircle3}>
                    <div className={Credateheaderstyle.datecheckmark}></div>
                </div>
            </div>  

        </div>

    )

}
export default Credateheader;