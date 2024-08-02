import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const apiUrl = 'https://port-0-travelproject-umnqdut2blqqevwyb.sel4.cloudtype.app/chat/rooms/';
const webSocketUrl = 'wss://port-0-travelproject-umnqdut2blqqevwyb.sel4.cloudtype.app/ws/chat/1/';

const CreateChatRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [status, setStatus] = useState('');
  const [roomId, setRoomId] = useState(null);
  const socketRef = useRef(null);
  const [isSocketReady, setIsSocketReady] = useState(false);
  const [message, setMessage] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  const connectWebSocket = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log('웹소켓이 이미 연결되어 있습니다.');
      return;
    }

    socketRef.current = new WebSocket(webSocketUrl);

    socketRef.current.onopen = () => {
      console.log('웹소켓 연결 완료');
      setIsSocketReady(true);
      setConnectionStatus('connected');
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('서버로부터 메시지 수신:', data);
      handleServerMessage(data);
    };

    socketRef.current.onerror = (error) => {
      console.error('웹소켓 오류:', error);
      setIsSocketReady(false);
      setConnectionStatus('error');
    };

    socketRef.current.onclose = (event) => {
      console.log('웹소켓 연결 종료.', event.code, event.reason);
      setIsSocketReady(false);
      setConnectionStatus('disconnected');
    };
  };

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    let pingInterval;

    if (isSocketReady) {
      pingInterval = setInterval(() => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
          socketRef.current.send(JSON.stringify({ type: 'ping' }));
        }
      }, 15000);
    }

    return () => {
      clearInterval(pingInterval);
    };
  }, [isSocketReady]);

  const handleServerMessage = (data) => {
    console.log('서버로부터 받은 메시지:', data);
    switch (data.type) {
      case 'invite':
        console.log(`초대 응답: 방 ID ${data.room_id}에 사용자 초대 성공`);
        setStatus(`사용자가 방 ${data.room_id}에 초대되었습니다.`);
        break;
      case 'participants_update':
        console.log('참가자 목록 업데이트:', data.participants);
        setStatus(`참가자 목록이 업데이트되었습니다. 참가자 수: ${data.participants.length}`);
        break;
      case 'room_update':
        console.log(`방 정보 업데이트: 방 ID ${data.room_id}`, data.room_info);
        setStatus(`방 ${data.room_id} 정보가 업데이트되었습니다.`);
        break;
      case 'message':
        console.log(`메시지 수신: ${data.sender.travel_user_id}로부터 - "${data.message}"`);
        setStatus(`새 메시지: ${data.message}`);
        break;
      case 'leave':
        console.log(`사용자가 방을 나갔습니다: 사용자 ID ${data.sender_id}, 방 ID ${data.room_id}`);
        setStatus(`사용자 ${data.sender_id}가 방을 나갔습니다.`);
        break;
      case 'travel_request':
        console.log(`여행 요청 수신: 보낸 사람 ID ${data.sender_travel_user_id}`);
        setStatus(`${data.sender_travel_user_id}로부터 여행 요청을 받았습니다.`);
        break;
      case 'travel_response':
        console.log(`여행 요청 응답: ${data.accepted ? '수락' : '거절'}`);
        setStatus(`여행 요청이 ${data.accepted ? '수락' : '거절'}되었습니다.`);
        break;
      default:
        console.log('처리되지 않은 메시지 타입:', data.type);
    }
  };

  const sendWebSocketMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
      console.log('웹소켓 메시지 전송:', message);
      setStatus(`${message.type} 메시지를 전송했습니다.`);
    } else {
      console.log('웹소켓이 열려있지 않습니다. 메시지를 보낼 수 없습니다.');
      setStatus('웹소켓 연결이 끊어졌습니다. 재연결 버튼을 눌러주세요.');
    }
  };

  const createRoom = async () => {
    if (roomName) {
      try {
        const response = await axios.post(apiUrl, {
          room_name: roomName,
          users: [
            { travel_user_id: 1 },
            { travel_user_id: 3 }
          ]
        });

        const createdRoomId = response.data.id;
        setRoomId(createdRoomId);
        console.log('생성된 방 ID:', createdRoomId);

        console.log('방 생성 성공:', response.data);
        setStatus('방이 성공적으로 생성되었습니다!');
      } catch (error) {
        console.error('방 생성 오류:', error.response?.data || error.message);
        setStatus('방 생성 중 오류가 발생했습니다.');
      }
    } else {
      setStatus('방 이름을 입력해주세요.');
    }
  };

  const inviteUser = () => {
    if (recipientId && isSocketReady) {
      sendWebSocketMessage({
        type: 'invite',
        travel_user_id: parseInt(recipientId)
      });
      console.log(`사용자 ID ${recipientId}에게 초대장 전송`);
      setStatus(`사용자 ID ${recipientId}에게 초대장을 보냈습니다. 응답 대기 중...`);
      setRecipientId('');
    } else {
      setStatus('초대할 사용자 ID를 입력하고 웹소켓이 연결되었는지 확인해주세요.');
    }
  };

  const leaveRoom = () => {
    sendWebSocketMessage({
      type: "leave",
      sender_id: 1,
      room_id: roomId
    });
    setStatus('방 퇴장 요청을 보냈습니다.');
  };

  const sendMessage = () => {
    sendWebSocketMessage({
      type: "message",
      sender_id: 1,
      message: message
    });
    setMessage('');
    setStatus('메시지를 전송했습니다.');
  };

  const sendTravelRequest = () => {
    sendWebSocketMessage({
      type: "travel_request",
      sender_travel_user_id: 1,
      recipient_travel_user_id: parseInt(recipientId),
      room_name: roomName
    });
    setStatus('여행 요청을 보냈습니다. 응답 대기 중...');
  };

  const acceptTravelRequest = () => {
    sendWebSocketMessage({
      type: "travel_response",
      accepted: true,
      sender_travel_user_id: 1,
      recipient_travel_user_id: parseInt(recipientId),
      room_name: roomName
    });
    setStatus('여행 요청을 수락했습니다. 응답 대기 중...');
  };

  const rejectTravelRequest = () => {
    sendWebSocketMessage({
      type: "travel_response",
      accepted: false,
      sender_travel_user_id: 1,
      recipient_travel_user_id: parseInt(recipientId),
      room_name: roomName
    });
    setStatus('여행 요청을 거절했습니다. 응답 대기 중...');
  };

  const requestRoomUpdate = () => {
    sendWebSocketMessage({
      type: "room_update",
      room_id: roomId
    });
    setStatus('방 정보 업데이트를 요청했습니다. 응답 대기 중...');
  };

  const requestParticipantsUpdate = () => {
    sendWebSocketMessage({
      type: "participants_update",
      sender_id: 1
    });
    setStatus('참가자 정보 업데이트를 요청했습니다. 응답 대기 중...');
  };

  return (
    <div>
      <h1>새로운 채팅방 만들기</h1>
      <p>연결 상태: {connectionStatus}</p>
      <button onClick={connectWebSocket} disabled={isSocketReady}>
        {isSocketReady ? '웹소켓 연결됨' : '웹소켓 연결하기'}
      </button>
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="방 이름 입력"
      />
      <button onClick={createRoom}>방 만들기</button>
      <p>상태: {status}</p>

      <h2>사용자 초대</h2>
      <input
        type="number"
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
        placeholder="초대할 사용자 ID 입력"
      />
      <button onClick={inviteUser}>사용자 초대</button>

      <h2>채팅방 동작</h2>
      <button onClick={leaveRoom}>방 나가기</button>
      
      <h2>메시지 보내기</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지 입력"
      />
      <button onClick={sendMessage}>메시지 보내기</button>

      <h2>여행 관련 동작</h2>
      <input
        type="number"
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
        placeholder="수신자 ID"
      />
      <button onClick={sendTravelRequest}>여행 요청 보내기</button>
      <button onClick={acceptTravelRequest}>여행 요청 수락</button>
      <button onClick={rejectTravelRequest}>여행 요청 거절</button>

      <h2>방 관련 동작</h2>
      <button onClick={requestRoomUpdate}>방 정보 업데이트 요청</button>
      <button onClick={requestParticipantsUpdate}>참가자 정보 업데이트 요청</button>
    </div>
  );
};

export default CreateChatRoom;