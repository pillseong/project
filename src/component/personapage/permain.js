import React from "react";
import permainstyle from "./permain.module.css"
function Permain(){
 return(
    <div className={permainstyle.permaincontainer}>
        <div className={permainstyle.perusercontainer}>
            <p className={permainstyle.perimg1}>페르소나이미지</p>
        </div>
        <div className={permainstyle.perusercontainer}>
            <p className={permainstyle.perimg2}>페르소나이미지</p>
        </div>
        

        <div className={permainstyle.userinfocontainer1}>
            <div className={permainstyle.infobox1}>
            <p className={permainstyle.userinfotext}>모험</p>
            <div className={permainstyle.userinfobox}></div>
            </div>
             <div className={permainstyle.infobox2}>
            <p className={permainstyle.userinfotext}>경험</p>
            <div className={permainstyle.userinfobox}></div>
            </div>
            <div className={permainstyle.infobox3}>
            <p className={permainstyle.userinfotext}>즉흥</p>
            <div className={permainstyle.userinfobox}></div>
            <div className={permainstyle.infobox1}>
            </div>
            <div className={permainstyle.infobox4}>
            <p className={permainstyle.userinfotext}>사교</p>
            <div className={permainstyle.userinfobox}></div>
            </div>
            </div>
        </div>
        <div className={permainstyle.userinfocontainer2}>
        <div className={permainstyle.infobox1}>
            <p className={permainstyle.userinfotext1}>모험</p>
            <div className={permainstyle.userinfobox}></div>
            </div>
             <div className={permainstyle.infobox2}>
            <p className={permainstyle.userinfotext2}>경험</p>
            <div className={permainstyle.userinfobox}></div>
            </div>
            <div className={permainstyle.infobox3}>
            <p className={permainstyle.userinfotext3}>즉흥</p>
            <div className={permainstyle.userinfobox}></div>
            <div className={permainstyle.infobox1}>
            </div>
            <div className={permainstyle.infobox4}>
            <p className={permainstyle.userinfotext4}>사교</p>
            <div className={permainstyle.userinfobox}></div>
            </div>
            </div>
        </div>
        <div className={permainstyle.userstatedistrict}>
            <p className={permainstyle.compat}>궁합</p>
            <p className={permainstyle.percent}>0%</p>
        
        </div>
    </div>
    

 )

};
export default Permain;