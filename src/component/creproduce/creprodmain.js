import React, { useState } from "react";
import Creprodmainstyle from "./creprodmain.module.css";
import { useSwipeable } from "react-swipeable";

function Creprodmain() {
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);

  const handleSwipedLeft1 = () => {
    setIndex1((prevIndex) => (prevIndex + 1) % 4);
  };

  const handleSwipedRight1 = () => {
    setIndex1((prevIndex) => (prevIndex - 1 + 4) % 4);
  };

  const handleSwipedLeft2 = () => {
    setIndex2((prevIndex) => (prevIndex + 1) % 4);
  };

  const handleSwipedRight2 = () => {
    setIndex2((prevIndex) => (prevIndex - 1 + 4) % 4);
  };

  const handlers1 = useSwipeable({
    onSwipedLeft: handleSwipedLeft1,
    onSwipedRight: handleSwipedRight1,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handlers2 = useSwipeable({
    onSwipedLeft: handleSwipedLeft2,
    onSwipedRight: handleSwipedRight2,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className={Creprodmainstyle.pordmainbox}>
      <p className={Creprodmainstyle.credatemaintext1}>추천 여행 코스를 선택해</p>
      <p className={Creprodmainstyle.credatemaintext2}>OO님께 제안하세요!</p>
      <p className={Creprodmainstyle.choicprtext}>페르소나 맞춤형 추천 코스</p>

      <div {...handlers2} className={Creprodmainstyle.rcslider}>
        <div
          className={Creprodmainstyle.rcslidercontainer1}
          style={{ transform: `translateX(-${index2 * 100}%)` }}
        >
          <div className={Creprodmainstyle.rcslideritem1}>
            <p className={Creprodmainstyle.traveltext}>OO 여행</p>
            <p className={Creprodmainstyle.traveldatetext}>O월 중</p>
            <p className={Creprodmainstyle.traveltimetext}>OO시간 소요</p>
            <p className={Creprodmainstyle.traveltime1text}>00:00~00:00</p>
            <div className={Creprodmainstyle.userinfobox}>
              <div className={Creprodmainstyle.usercousbox}>
                <p className={Creprodmainstyle.cous1}>코스1</p>
                <p className={Creprodmainstyle.cous2}>코스2</p>
                <p className={Creprodmainstyle.cous3}>코스3</p>
                <p className={Creprodmainstyle.cous4}>코스4</p>
                <p className={Creprodmainstyle.cous5}>코스5</p>
              </div>
              <div className={Creprodmainstyle.abox}>
                <p className={Creprodmainstyle.circle}></p>
                <p className={Creprodmainstyle.aline1}></p>
                <p className={Creprodmainstyle.aline2}></p>
              </div>
              <div className={Creprodmainstyle.a1box}>
                <p className={Creprodmainstyle.circle}></p>
                <p className={Creprodmainstyle.aline1}></p>
                <p className={Creprodmainstyle.aline2}></p>
              </div>
              <div className={Creprodmainstyle.a2box}>
                <p className={Creprodmainstyle.circle}></p>
                <p className={Creprodmainstyle.aline1}></p>
                <p className={Creprodmainstyle.aline2}></p>
              </div>
              <div className={Creprodmainstyle.a3box}>
                <p className={Creprodmainstyle.circle}></p>
                <p className={Creprodmainstyle.aline1}></p>
                <p className={Creprodmainstyle.aline2}></p>
              </div>
              <div className={Creprodmainstyle.a4box}>
                <p className={Creprodmainstyle.circle}></p>
               
              </div>
            </div>
          </div>
          <div className={Creprodmainstyle.rcslideritem1}></div>
          <div className={Creprodmainstyle.rcslideritem1}></div>
          <div className={Creprodmainstyle.rcslideritem1}></div>

        </div>
      </div>
    </div>
  );
}

export default Creprodmain;
