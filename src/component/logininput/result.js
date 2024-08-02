import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InfoResultSty from './result.module.css';

// 페르소나들 이미지 import 부분은 그대로 유지
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

const mbtiCities = {
  ENFJ: "시드니", ENFP: "바르셀로나", ENTJ: "뉴욕", ENTP: "런던",
  ESFJ: "라스베이거스", ESFP: "암스테르담", ESTJ: "서울", ESTP: "홍콩",
  INFJ: "센프란시스코", INFP: "파리", INTJ: "싱가포르", INTP: "베를린",
  ISFJ: "교토", ISFP: "리우데자네이루", ISTJ: "도쿄", ISTP: "부다페스트"
};

const mbtiDescriptions = {
  ENFJ: "시드니는 활기차고 친근한 분위기를 가지고있습니다. 사교적이고 따뜻한 성격과 잘 어울립니다.",
  ENFP: "바르셀로나는 창의적이고 활기찬 분위기를 가지고있습니다. 열정적이고 자유로운 영혼과 잘 어울립니다.",
  ENTJ: "뉴욕은 야심차고 경쟁적인 분위기를 가지고있습니다. 리더십과 목표지향적인 성격을 반영하고, 전략적 사고와 잘 어울립니다.",
  ENTP: "런던은 다양성과 혁신의 중심지입니다. 창의적이고 논리적인 면을 잘 보여줍니다. 전통과 현대의 공존하는 모습, 다재다능함과 잘 어울립니다.",
  ESFJ: "라스베이거스는 화려하고 환대를 중시하는 분위기를 가지고있습니다. 사교적이고 배려심 많은 성격을 가지고, 이는 타인 중심적 성향과 잘 어울립니다.",
  ESFP: "암스테르담은 자유롭고 개방적인 분위기를 가지고있습니다. 즉흥적이고 모험을 즐기는 성격을 가지고, 이는 다채로운 문화 경험과 감각적인 면과 잘 어울립니다.",
  ESTJ: "서울은 효율적이고 체계적인 분위기를 가지고있습니다. 조직적이고 실용적인 성격을 나타내며, 빠르게 발전하는 도시의 모습은 목표 지향적 특성과 잘 어울립니다.",
  ESTP: "홍콩은 역동적이고 모험적인 분위기를 가지고있습니다. 대담하고 행동 중심적인 성격을 뜻하며, 빠른 템포와 즉각적인 문제 해결 능력과 잘 어울립니다.",
  INFJ: "샌프란시스코는 진보적이고 이상주의적인 분위기를 가지고있습니다. 비전과 혁신적인 사고를 반영하며, 다양성을 존중하는 도시 문화는 포용력과 잘 어울립니다.",
  INFP: "파리는 낭만적이고 예술적인 분위기를 가지고있습니다. 이상주의적이고 창의적인 성격을 잘 나타내며, 풍부한 문화유산은 깊이 있는 내면세계를 상징합니다.",
  INTJ: "싱가포르는 효율적이고 미래 지향적인 분위기를 가지고있습니다. 전략적이고 혁신적인 사고를 반영하며, 도시의 정돈된 모습은 체계적인 성향과 잘 어울립니다.",
  INTP: "베를린은 지적이고 실험적인 분위기를 가지고있습니다. 논리적이고 창의적인 면을 잘 보여주며, 도시의 독특한 문화와 역사는 깊이 있는 사고를 반영합니다.",
  ISFJ: "교토는 전통을 중시하고 조용한 분위기를 가지고있습니다. 신중하고 헌신적인 성격을 반영하며, 세심하게 보존된 문화유산은 세부사항에 대한 관심을 나타냅니다.",
  ISFP: "리우데자네이루는 자연과 조화를 이루는 분위기를 가지고있습니다. 예술적이고 자유로운 영혼을 잘 표현하며, 활기찬 문화와 아름다운 풍경은 감각적인 면을 충족시킵니다.",
  ISTJ: "도쿄는 질서정연하고 효율적인 분위기를 가지고있습니다. 체계적이고 책임감 있는 성격을 반영하며, 전통과 현대의 조화는 신뢰성과 일관성을 나타냅니다.",
  ISTP: "부다페스트는 역사적이면서도 모험적인 분위기를 가지고있습니다. 실용적이고 적응력 있는 성격을 잘 보여주며, 도시의 다양한 면모는 다재다능함을 반영합니다."
};

const InfoResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { answers } = location.state || { answers: [] };

  const [user_persona, setUser_persona] = useState("뉴욕형 페르소나");
  const [extractedWords, setExtractedWords] = useState(["도시", "문화", "예술"]);
  const [userMBTI, setUserMBTI] = useState(null);

  useEffect(() => {
    const tasteTravel = localStorage.getItem('taste_travel');
    console.log("Taste Travel Data:", tasteTravel);
    if (tasteTravel) {
      const mbti = JSON.parse(tasteTravel).replace(/"/g, '').toUpperCase();
      setUserMBTI(mbti);
      setUser_persona(`${mbtiCities[mbti]}형 페르소나`);
      console.log("User MBTI set to:", mbti);
    } else {
      console.log("No MBTI data found in local storage");
    }
  }, []);

  console.log("Current userMBTI:", userMBTI);
  console.log("Answers:", answers);

  const handleIdInputClick = () => {
    navigate("/home");
  };

  const renderPersonaImage = () => {
    if (userMBTI && mbtiImages[userMBTI]) {
      console.log("Rendering image for MBTI:", userMBTI);
      return (
        <img 
          src={mbtiImages[userMBTI]} 
          alt={`${userMBTI} 페르소나`} 
          className={InfoResultSty.personaImg}
        />
      );
    } else {
      console.log("No matching image found for MBTI:", userMBTI);
      return null;
    }
  };

  return (
    <div className={InfoResultSty.main_container}>
      <div className={InfoResultSty.pre_container}>
        <h1 className={InfoResultSty.user_pre}>{user_persona}</h1>
        {renderPersonaImage()}
      </div>
      {userMBTI && (
        <div className={InfoResultSty.mbtiDescription}>
          <p className={InfoResultSty.because}>{mbtiDescriptions[userMBTI]}</p>
        </div>
      )}
      <button onClick={handleIdInputClick} className={InfoResultSty.next_btn}>서비스 이용하러 가기</button>
    </div>
  );
};

export default InfoResult;