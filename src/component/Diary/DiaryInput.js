import React, { useState, useEffect } from 'react';
import personasChatsty from '../persona/personaChat.module.css'; // 스타일 모듈 가져오기
import DIC from './DiaryInput.module.css';
import goback from '../logininput/back.png'; // 이미지 가져오기

const DiaryInput = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    console.log(messages.length); // 상태가 변경될 때마다 messages.length를 확인
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages((prevMessages) => [...prevMessages, { text: input, sender: 'user' }]);
      setInput('');
    }
  };

  const backBtn = () => {
    window.location.href = "http://localhost:3000/";
  };

  const createDiary = () => {
    // 다음 페이지로 이동하는 로직을 추가합니다.
    window.location.href = "http://localhost:3000/diary";
  };

  return (
    <div className={personasChatsty.chatFullScreen}>
      <div className={personasChatsty.header}>
        <button onClick={backBtn} className={personasChatsty.backButton}>
          <img src={goback} alt="Go Back" className={personasChatsty.back_btn}/>
        </button>
      </div>
      <div className={personasChatsty.chatWrapper}>
        {messages.map((message, index) => (
        
          <div key={index} className={`${personasChatsty.message} ${personasChatsty[message.sender]}`}>
            {message.text}
          </div>
        ))}
      </div>
      {messages.length >= 20 && (
        <div className={DIC.end_container}>
            <div className={DIC.answerEnd}>대화 종료</div>
            <button onClick={createDiary} className={DIC.createDiaryButton}>
            여행일기 생성
            </button>
        </div>
      )}
      {messages.length < 20 && (
        <form onSubmit={handleSend} className={personasChatsty.inputArea}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지 입력"
            className={personasChatsty.inputField}
            />
          <button type="submit" className={personasChatsty.sendButton}>전송</button>
        </form>
      )}
    </div>
  );
};

export default DiaryInput;
