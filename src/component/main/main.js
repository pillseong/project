import React, { useState } from 'react';
import './main.css'; // CSS 파일을 별도로 만들어 스타일을 관리하는 것이 좋습니다.

function Main() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // AI 응답을 시뮬레이션합니다. 실제로는 여기에 AI API 호출 로직이 들어갑니다.
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: "AI의 응답입니다.", sender: 'ai' }]);
      }, 1000);
    }
  };

  return (
    <div className="chat-interface">

      <div className="message-list">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="input-field">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}

export default Main;