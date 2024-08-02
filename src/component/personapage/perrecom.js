import React, { useState } from "react";
import perrecomstyle from "./perrecom.module.css";
import { useSwipeable } from 'react-swipeable';

function Perrecom() {
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
        <div>
            <div className={perrecomstyle.perrecomcontainer1}>
                <p className={perrecomstyle.recomtext1}>추천 여행지</p>
                <div {...handlers1} className={perrecomstyle.rcslider}>
                    <div 
                        className={perrecomstyle.rcslidercontainer} 
                        style={{ transform: `translateX(-${index1 * 100}%)` }}
                    >
                        <div className={perrecomstyle.rcslideritem}></div>
                        <div className={perrecomstyle.rcslideritem}></div>
                        <div className={perrecomstyle.rcslideritem}></div>
                        <div className={perrecomstyle.rcslideritem}></div>
                    </div>
                </div>
            </div>

            <div className={perrecomstyle.perrecomcontainer2}>
                <p className={perrecomstyle.recomtext2}>함께한 추억</p>
                <div {...handlers2} className={perrecomstyle.rcslider}>
                    <div 
                        className={perrecomstyle.rcslidercontainer1} 
                        style={{ transform: `translateX(-${index2 * 100}%)` }}
                    >
                        <div className={perrecomstyle.rcslideritem1}></div>
                        <div className={perrecomstyle.rcslideritem1}></div>
                        <div className={perrecomstyle.rcslideritem1}></div>
                        <div className={perrecomstyle.rcslideritem1}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perrecom;
