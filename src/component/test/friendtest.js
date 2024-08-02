import React, { useState, useRef } from 'react';
import axios from 'axios';

const baseFriendWebSocketUrl = 'wss://port-0-travelproject-umnqdut2blqqevwyb.sel4.cloudtype.app/ws/friend/';
const baseChatWebSocketUrl = 'wss://port-0-travelproject-umnqdut2blqqevwyb.sel4.cloudtype.app/ws/chat/';
const apiurl = 'https://port-0-travelproject-umnqdut2blqqevwyb.sel4.cloudtype.app/test_login/';

const FriendManagement = () => {
  const [status, setStatus] = useState('');
  const [travelUserId, setTravelUserId] = useState('');
  const [friendTravelId, setFriendTravelId] = useState('');
  const socketRef = useRef(null);
  const [socketType, setSocketType] = useState(null);

  const handleServerMessage = (data) => {
    console.log('서버 메시지:', data);
    setStatus(`서버 응답: ${JSON.stringify(data)}`);
  };

  const closeExistingSocket = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.close();
      console.log(`${socketType} 소켓 연결 종료`);
    }
  };

  const sendWebSocketMessage = (url, message, type) => {
    closeExistingSocket();

    const socket = new WebSocket(url);
    socketRef.current = socket;
    setSocketType(type);

    socket.onopen = () => {
      console.log(`${type} 소켓 연결 완료`);
      socket.send(JSON.stringify(message));
      console.log('웹소켓 메시지 전송:', message);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('웹소켓 메시지 수신:', data);
      handleServerMessage(data);
    };

    socket.onerror = (error) => {
      console.error('웹소켓 오류:', error);
      setStatus('웹소켓 연결 실패. 다시 시도해주세요.');
    };

    socket.onclose = () => {
      console.log(`${type} 소켓 연결 종료`);
      setSocketType(null);
    };
  };

  const sendFriendRequest = () => {
    const url = `${baseChatWebSocketUrl}${travelUserId}/`;
    sendWebSocketMessage(url, {
      type: "friend_request",
      travel_user_id: parseInt(travelUserId),
      friend_travel_user_id: parseInt(friendTravelId)
    }, 'chat');
  };

  const sendFriendAction = (type) => {
    const url = `${baseFriendWebSocketUrl}${travelUserId}/`;
    sendWebSocketMessage(url, {
      type: type,
      travel_id: parseInt(travelUserId),
      friend_travel_id: parseInt(friendTravelId)
    }, 'friend');
  };

  const acceptFriend = () => sendFriendAction("friend_accept");
  const standbyFriend = () => sendFriendAction("friend_standby");
  const refuseFriend = () => sendFriendAction("friend_refuse");
  const blockFriend = () => sendFriendAction("friend_block");

  const handleLogin = async () => {
    const userId = travelUserId || friendTravelId;
    if (userId) {
      try {
        const response = await axios.post(apiurl, {
          travel_user_id: parseInt(userId)
        });
        console.log('로그인 성공:', response.data);
        setStatus('로그인 성공!');
        setTravelUserId(userId); // 로그인 후 travelUserId를 설정
      } catch (error) {
        console.error('로그인 오류:', error.response?.data || error.message);
        setStatus('로그인 중 오류가 발생했습니다.');
      }
    } else {
      setStatus('사용자 ID 또는 친구 ID를 입력해주세요.');
    }
  };

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
      <button onClick={handleLogin}>로그인</button>
      <p>서버 응답: {status}</p>
      <p>현재 연결된 소켓: {socketType ? `${socketType} 소켓` : '없음'}</p>

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