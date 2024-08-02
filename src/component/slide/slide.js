import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import Slidestyle from "./slide.module.css"

function Slide() {
  const [index, setIndex] = useState(0);

  const handleSwipedLeft = () => {
    setIndex((prevIndex) => (prevIndex + 1) % 3); 
  };

  const handleSwipedRight = () => {
    setIndex((prevIndex) => (prevIndex - 1 + 3) % 3); 
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipedLeft,
    onSwipedRight: handleSwipedRight,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div {...handlers} className={Slidestyle.slider}>
      <div className={Slidestyle.slidercontainer} style={{ transform: `translateX(-${index * 100}%)` }}>
        <div className={Slidestyle.slideritem}>
       
        </div>
        <div className={Slidestyle.slideritem}>
          
        </div>
        <div className={Slidestyle.slideritem}>
          
        </div>
      </div>
    </div>
  );
}

export default Slide;
