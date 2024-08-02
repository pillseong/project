import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const baseFriendWebSocketUrl = 'wss://port-0-travelproject-umnqdut2blqqevwyb.sel4.cloudtype.app/ws/friend/';
const apiurl = 'https://port-0-travelproject-umnqdut2blqqevwyb.sel4.cloudtype.app/users/';

const FriendManagement = () => {
  const [status, setStatus] = useState('');
  const [travelUserId, setTravelUserId] = useState('');
  const [friendTravelId, setFriendTravelId] = useState('');
  const friendSocketRef = useRef(null);

  const handleServerMessage = (data) => {
    console.log('서버 메시지:', data);
    setStatus(`서버 응답: ${JSON.stringify(data)}`);
  };

  const connectFriendSocket = (userId) => {
    const url = `${baseFriendWebSocketUrl}${userId}/`;
    const socket = new WebSocket(url);
    friendSocketRef.current = socket;

    socket.onopen = () => {
      console.log('Friend 소켓 연결 완료');
      setStatus('Friend 소켓 연결됨');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Friend 웹소켓 메시지 수신:', data);
      handleServerMessage(data);
    };

    socket.onerror = (error) => {
      console.error('Friend 웹소켓 오류:', error);
      setStatus('Friend 웹소켓 연결 실패. 다시 시도해주세요.');
    };

    socket.onclose = () => {
      console.log('Friend 소켓 연결 종료');
    };
  };

  const sendWebSocketMessage = (message) => {
    if (friendSocketRef.current && friendSocketRef.current.readyState === WebSocket.OPEN) {
      friendSocketRef.current.send(JSON.stringify(message));
      console.log('웹소켓 메시지 전송:', message);
    } else {
      console.error('웹소켓이 연결되어 있지 않습니다.');
      setStatus('웹소켓이 연결되어 있지 않습니다. 다시 로그인해주세요.');
    }
  };

  const sendFriendRequest = () => {
    sendWebSocketMessage({
      type: "friend_request",
      travel_user_id: parseInt(travelUserId),
      friend_travel_user_id: parseInt(friendTravelId)
    });
  };

  const sendFriendAction = (type) => {
    sendWebSocketMessage({
      type: type,
      travel_id: parseInt(travelUserId),
      friend_travel_id: parseInt(friendTravelId)
    });
  };

  const acceptFriend = () => sendFriendAction("friend_accept");
  const standbyFriend = () => sendFriendAction("friend_standby");
  const refuseFriend = () => sendFriendAction("friend_refuse");
  const blockFriend = () => sendFriendAction("friend_block");

  const handleLogin = async () => {
    const userId = travelUserId || friendTravelId;
    if (userId) {
      try {
        const jwtToken = localStorage.getItem('jwtToken');
        const jwtRefreshToken = localStorage.getItem('jwtRefreshToken');

        const response = await axios.post(apiurl, {
        
          jwtToken: jwtToken,
          jwtRefreshToken: jwtRefreshToken
        });

        console.log('로그인 성공:', response.data);
        setStatus('로그인 성공!');
        setTravelUserId(userId);
        connectFriendSocket(userId);
      } catch (error) {
        console.error('로그인 오류:', error.response?.data || error.message);
        setStatus('로그인 중 오류가 발생했습니다.');
      }
    } else {
      setStatus('사용자 ID 또는 친구 ID를 입력해주세요.');
    }
  };

  useEffect(() => {
    return () => {
      if (friendSocketRef.current) {
        friendSocketRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <h1>친구 관리</h1>
      <input
        type="number"
        value={travelUserId}
        onChange={(e) => setTravelUserId(e.target.value)}
        placeholder="사용자 ID 입력"
      />
      <button onClick={handleLogin}>로그인</button>
      <input
        type="number"
        value={friendTravelId}
        onChange={(e) => setFriendTravelId(e.target.value)}
        placeholder="친구 ID 입력"
      />
      <p>서버 응답: {status}</p>

      <h2>친구 관련 동작</h2>
      <button onClick={sendFriendRequest}>친구 요청</button>
      <button onClick={acceptFriend}>친구 수락</button>
      <button onClick={standbyFriend}>친구 대기</button>
      <button onClick={refuseFriend}>친구 거절</button>
      <button onClick={blockFriend}>친구 차단</button>
    </div>
  );
};

export default FriendManagement;