import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; // useNavigate 훅 추가
import axios from "axios";
import potocomstyle from "./potocom.module.css";

// 페르소나들 이미지
import ENFJ from '../Img/ENFJ 시드니.png';
import ENFP from '../Img/ENFP 바르셀로나.png';
import ENTJ from '../Img/ENTJ 뉴욕.png';
import ENTP from '../Img/ENTP 런던.png';
import ESFJ from '../Img/ESFJ 라스베이거스.png';
import ESFP from '../Img/ESFP 암스테르담.png';
import ESTJ from '../Img/ESTJ 서울.png';
import ESTP from '../Img/ESTP 홍콩.png';
import INFJ from '../Img/INFJ 센프란시스코.png';
import INFP from '../Img/INFP 파리.png';
import INTJ from '../Img/INTJ 싱가포르.png';
import INTP from '../Img/INTP 베를린.png';
import ISFJ from '../Img/ISFJ 교토.png';
import ISFP from '../Img/ISFP 리우데자네이루.png';
import ISTJ from '../Img/ISTJ 도쿄.png';
import ISTP from '../Img/ISTP 부다페스트.png';

function Potocom() {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate(); // useNavigate 훅 사용

    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get('https://port-0-travelproject-9zxht12blqj9n2fu.sel4.cloudtype.app/travel-user/reading', {
            withCredentials: true
          });
          setUserInfo(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("사용자 정보 가져오기 실패:", error);
          setError("사용자 정보를 가져오는데 실패했습니다.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserInfo();
    }, []);

    const persona_result = () => {
      navigate('/InfoResult'); // '/InfoResult' 페이지로 이동
    }

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>에러: {error}</div>;
    }

    return(
        <div className={potocomstyle.potocombox}>
            <p className={potocomstyle.title}>{userInfo?.name || 'OO'}님의 페르소나는?</p>
            <p className={potocomstyle.subtitle}>생성 완료!!</p>
            <p className={potocomstyle.inputbutton} onClick={persona_result}>내 여행 페르소나</p>
        </div>
    )
}

export default Potocom;