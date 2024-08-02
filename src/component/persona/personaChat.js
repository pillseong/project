import React, { useState, useEffect, useRef } from "react";
import personasChatsty from "./personaChat.module.css";
import { useNavigate } from 'react-router-dom';
import backBtn from '../logininput/back.png';
import loading from './Loading.png';

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

const mbtiImages = {
  ENFJ, ENFP, ENTJ, ENTP, ESFJ, ESFP, ESTJ, ESTP,
  INFJ, INFP, INTJ, INTP, ISFJ, ISFP, ISTJ, ISTP
};

const mbtiColors = {
  ENFJ: { background: '#B1E8ED', textBackground: '#076D91' },
  ENFP: { background: '#F8E8BC', textBackground: '#E66027' },
  ENTJ: { background: '#EAE1BF', textBackground: '#B65025' },
  ENTP: { background: '#E4D8C9', textBackground: '#665049' },
  ESFJ: { background: '#C9E7F2', textBackground: '#003A87' },
  ESFP: { background: '#FDEBE7', textBackground: '#FF957E' },
  ESTJ: { background: '#F6EBDA', textBackground: '#DC4432' },
  ESTP: { background: '#D7DFE5', textBackground: '#174A87' },
  INFJ: { background: '#C4BBB6', textBackground: '#814722' },
  INFP: { background: '#FFDCD4', textBackground: '#F47046' },
  INTJ: { background: '#E1EFE8', textBackground: '#367B90' },
  INTP: { background: '#D1C6BF', textBackground: '#603B3D' },
  ISFJ: { background: '#FCDEC7', textBackground: '#4F556D' },
  ISFP: { background: '#FFD4AE', textBackground: '#F03526' },
  ISTJ: { background: '#DBCBB9', textBackground: '#6D6060' },
  ISTP: { background: '#F5EBCF', textBackground: '#037D68' }
};

function PersonaChat() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWaitingForAIResponse, setIsWaitingForAIResponse] = useState(false);
  const [userMBTI, setUserMBTI] = useState(null);
  const chatContentRef = useRef(null);

  const MAX_MESSAGES = 10; // 최대 표시할 메시지 수

  useEffect(() => {
    const loadMessages = () => {
      const savedMessages = localStorage.getItem('personaChatMessages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
      setIsLoading(false);
    };

    const loadUserMBTI = () => {
      const mbti = localStorage.getItem('taste_travel');
      if (mbti) {
        const cleanedMBTI = mbti.replace(/['"]+/g, '').toUpperCase();
        setUserMBTI(cleanedMBTI);
      }
    };

    loadMessages();
    loadUserMBTI();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('personaChatMessages', JSON.stringify(messages));
    }
    // 새 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const goBack = () => {
    navigate('/home');
  }

  const getBackgroundImage = () => {
    if (userMBTI && mbtiImages[userMBTI]) {
      return mbtiImages[userMBTI];
    }
    return null;
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' };
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, newMessage];
        return updatedMessages.slice(-MAX_MESSAGES);
      });
      setInput('');
      setIsWaitingForAIResponse(true);
      setTimeout(() => {
        setMessages(prevMessages => {
          const aiMessage = { text: "AI의 응답입니다.", sender: 'ai' };
          const updatedMessages = [...prevMessages, aiMessage];
          return updatedMessages.slice(-MAX_MESSAGES);
        });
        setIsWaitingForAIResponse(false);
      }, 1000);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { background, textBackground } = userMBTI ? mbtiColors[userMBTI] : { background: '#FFFFFF', textBackground: '#000000' };
  const backgroundImage = getBackgroundImage();

  return (
    <div className={personasChatsty.chatFullScreen} style={{
      backgroundColor: background,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    }}>
      {backgroundImage && (
        <img 
          src={backgroundImage} 
          alt="Background" 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            opacity: 0.5,
          }}
        />
      )}
      <div className={personasChatsty.header} style={{ backgroundColor: 'transparent', zIndex: 1 }}>
        <img onClick={goBack} src={backBtn} className={personasChatsty.back_btn} alt="Go Back" />
      </div>
      <div 
        className={personasChatsty.chatWrapper} 
        style={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-end',
          overflow: 'hidden',
          zIndex: 1 
        }}
      >
        <div 
          ref={chatContentRef}
          className={personasChatsty.chatContent} 
          style={{ 
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '100%'
          }}
        >
          {messages.map((message, index) => (
            <div key={index} className={`${personasChatsty.message} ${personasChatsty[message.sender]}`}
                 style={{
                   backgroundColor: message.sender === 'user' ? textBackground : '#FFFFFF'
                 }}>
              {message.text}
            </div>
          ))}
          {isWaitingForAIResponse && (
            <div className={`${personasChatsty.message} ${personasChatsty.ai}`}>
              <img src={loading} alt="Loading" />
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSend} className={personasChatsty.inputArea}
        style={{
          backgroundColor: 'transparent',
          zIndex: 1,
          padding: '10px',
          borderTop: '1px solid #e0e0e0',
        }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지 입력"
          className={personasChatsty.inputField}
        />
        <button type="submit" className={personasChatsty.sendButton}>전송</button>
      </form>
    </div>
  );
}

export default PersonaChat;