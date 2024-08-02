// Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('https://port-0-travelproject-9zxht12blqj9n2fu.sel4.cloudtype.app/travel-user/reading', {
          withCredentials: true // 쿠키를 포함하기 위해 필요합니다
        });
        setUserInfo(response.data);
        console.log(response.data);

        // 응답 헤더에서 토큰을 가져와 쿠키에 저장
        const jwtToken = response.headers['jwt-token'];
        const jwtRefreshToken = response.headers['jwt-refresh-token'];

        localStorage.setItem('jwtToken', Cookies.get('jwtToken'));
        localStorage.setItem('jwtRefreshToken', Cookies.get('jwtRefreshToken'));

        if (jwtToken) {
          Cookies.set('jwtToken', jwtToken, { expires: 7 }); // 7일 동안 유효
        }
        if (jwtRefreshToken) {
          Cookies.set('jwtRefreshToken', jwtRefreshToken, { expires: 30 }); // 30일 동안 유효
        }

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {userInfo ? (
        <div>
          <h2>사용자 정보</h2>
          <p>이름: {userInfo.name}</p>
          <p>이메일: {userInfo.member.email}</p>
        </div>
      ) : (
        <p>사용자 정보를 불러오지 못했습니다.</p>
      )}
    </div>
  );
}

export default Dashboard;