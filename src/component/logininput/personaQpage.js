import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TravelQuestions.module.css';
import backImg from './back.png';

const TravelQuestions = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [sliderValue, setSliderValue] = useState(3);
  const [answers, setAnswers] = useState(new Array(10).fill(3));

  const [mbti, setMbti] = useState('');
  const [visitedPlaces, setVisitedPlaces] = useState('');
  const [desiredPlaces, setDesiredPlaces] = useState('');

  const questions = [
    "여행에서 새로운 사람들과의 만남을 중요하게 생각한다.",
    "자연 경관을 감상할 수 있는 여행지가 좋다.",
    "전통적인 문화 유산을 탐방하는 것이 좋다.",
    "여행 계획한 대로 최대한 이행하려고 노력한다",
    "지역의 특색있는 음식 경험은 매우 중요하다.",
    "여행 중 휴식시간에는, 숙소에서 편히 쉬고 싶다.",
    "이미 한 번 방문한 곳이라도, 다시 여행하고 싶다.",
    "해당 지역의 지역문화 축제를 즐기는 것이 좋다.",
    "유명 건축물, 높은 건물, 도시의 야경에서 나오는 웅장함이 좋다.",
    "집에서 가까운 곳이라도 자주 여행을 떠나고 싶다.",
    "당신의 MBTI는 어떻게 되나요?",
    "당신이 방문했던 여행지가 있나요?",
    "또 가고싶거나 가보고 싶은 여행지가 있나요?"
  ];

  const answerTexts = ["별로야", "그건 좀..", "그냥 그래", "괜찮은데?", "너무 좋아!"];

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      if (currentQuestion < 9) {
        setSliderValue(answers[currentQuestion + 1]);
      }
    } else {
      // 마지막 질문에서 '완료' 버튼을 눌렀을 때
      console.log("Travel Questions Answers:", answers);
      navigate('/potouploadpage', { 
        state: { 
          travelAnswers: answers,
          mbti,
          visitedPlaces,
          desiredPlaces
        } 
      });
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      if (currentQuestion <= 10) {
        setSliderValue(answers[currentQuestion - 1]);
      }
    }
  };

  const handleSliderChange = (event) => {
    const value = parseInt(event.target.value);
    setSliderValue(value);
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = value;
      return newAnswers;
    });
  };

  const getBubblePosition = () => {
    const position = ((sliderValue - 1) / 4) * 90; // 0% to 100%
    return `calc(${position}% - 45%)`; // 20px는 말풍선의 절반 너비
  };

  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header_container}>
        <img src={backImg} className={styles.back_btn} alt="Back" onClick={prevQuestion} />
        <h1 className={styles.title}>여행 질문</h1>
      </div>

      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${(currentQuestion + 1) / questions.length * 100}%` }}></div>
      </div>

      <div className={styles.questionContainer}>
        <p className={styles.questionText}>
          {questions[currentQuestion]}
        </p>
      </div>

      {currentQuestion < 10 ? (
        <div className={styles.sliderContainer}>
          <div className={styles.sliderWrapper}>
            <div className={styles.bubbleContainer}>
              <div 
                className={styles.bubble} 
                style={{ left: getBubblePosition() }}
              >
                {answerTexts[sliderValue - 1]}
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={sliderValue}
              onChange={handleSliderChange}
              className={styles.slider}
            />
          </div>
          <div className={styles.answerLabelsContainer}>
            <span className={styles.answerLabel}>Bad</span>
            <span className={styles.answerLabel}>Good</span>
          </div>
        </div>
      ) : (
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={currentQuestion === 10 ? mbti : currentQuestion === 11 ? visitedPlaces : desiredPlaces}
            onChange={(e) => handleInputChange(e, currentQuestion === 10 ? setMbti : currentQuestion === 11 ? setVisitedPlaces : setDesiredPlaces)}
            placeholder={currentQuestion === 10 ? "MBTI를 입력하세요" : currentQuestion === 11 ? "방문한 장소를 입력하세요" : "가고 싶은 장소를 입력하세요"}
            className={styles.input}
          />
        </div>
      )}

      <div className={styles.navigationButtons}>
        <button 
          className={`${styles.navButton} ${styles.navButtonPrev}`} 
          onClick={prevQuestion} 
          disabled={currentQuestion === 0}
        >
          이전
        </button>
        <button 
          className={`${styles.navButton} ${styles.navButtonNext}`} 
          onClick={nextQuestion}
        >
          {currentQuestion === questions.length - 1 ? '완료' : '다음'}
        </button>
      </div>
    </div>
  );
};

export default TravelQuestions;
