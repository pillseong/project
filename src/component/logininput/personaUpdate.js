import React, { useState } from 'react';
import personaImg from './personaImg.jpg';
import personaSty from './personaUpdata.module.css';

import backImg from './back.png';

const LoginUpdate = () => {
    const [personaInfo, setPersonaInfo] = useState("뉴욕형 페르소나");

    return (
    <div>
      <img src={backImg} className={personaSty.back_btn}/>
      <div className={personaSty.main_container}>
        <div className={personaSty.header_container}>
            <h2 className={personaSty.one}>여행 질문으로</h2>
            <h2 className={personaSty.two}>페르소나 정확도 올리자!!</h2>
        </div>
        <div className={personaSty.Img_container}>
            <img src={personaImg} alt="Persona" className={personaSty.personaImg}/>
            <div className={personaSty.ImgInfo_container}>
                <p className={personaSty.info}>현재 내 페르소나</p>
                <p className={personaSty.user_persona}>{personaInfo}</p>
            </div>
        </div>
        <button className={personaSty.Update_button}>여행 질문 시작</button>
      </div>
    </div>

    );
};

export default LoginUpdate;
