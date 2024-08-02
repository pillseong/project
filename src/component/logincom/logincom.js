import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logincomstyle from "./logincom.module.css";
import axios from "axios";

import Cookies from 'js-cookie';


function Logincom() {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const create_persona = () => {
        navigate("/TravelQuestions", { 
          state: { userInfo: userInfo },
          replace: true });
    }


    const goToTestPage = () => {
        navigate("/test");
    }
  
    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get('https://port-0-travelproject-9zxht12blqj9n2fu.sel4.cloudtype.app/travel-user/reading', {
            withCredentials: true,
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
          });
          setUserInfo(response.data);
          console.log(response);
    
          // 쿠키 정보 출력
          console.log('jwtToken:', Cookies.get('jwtToken'));
          console.log('jwtRefreshToken:', Cookies.get('jwtRefreshToken'));
    
          // 모든 쿠키 출력
          console.log('All cookies:', Cookies.get());
    
          // 쿠키 정보 로컬 스토리지에 저장
          const jwtToken = Cookies.get('jwtToken');
          const jwtRefreshToken = Cookies.get('jwtRefreshToken');
    
          if (jwtToken) localStorage.setItem('jwtToken', jwtToken);
          if (jwtRefreshToken) localStorage.setItem('jwtRefreshToken', jwtRefreshToken);
        } catch (error) {
          console.error("사용자 정보 가져오기 실패:", error);
          setError("사용자 정보를 가져오는데 실패했습니다.");
        } finally {
          setIsLoading(false);
        }
      };
    
      fetchUserInfo();
    }, []);

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>에러: {error}</div>;
    }

    const userName = userInfo && userInfo.name ? userInfo.name : 'OOO';
    localStorage.setItem('memberId', userInfo.member.memberId);


    return(
        <div className={Logincomstyle.logincombox}>
            <h1 className={Logincomstyle.title}>반가워요! {userName}님</h1>
            <p className={Logincomstyle.subtitle}>
                서비스를 시작하기 전,<br/>
                {userName}님의 여행 페르소나를 생성할게요!
            </p>

            <button className={Logincomstyle.button} onClick={create_persona}>페르소나 생성하기</button>
            <div className={Logincomstyle.circleContainer}>
                <div className={Logincomstyle.circle}></div>
                <div className={Logincomstyle.circle2}></div>
                <div className={Logincomstyle.circle}></div>
            </div>
        </div>
    );
}

export default Logincom;
