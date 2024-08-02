import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSwipeable } from 'react-swipeable';
import Crechoicestyle from "./crechoice.module.css";
import Creprodmainstyle from "./creprodmain.module.css";

function Crechoice() {
    const [recommendedPlaces, setRecommendedPlaces] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [index1, setIndex1] = useState(0);
    const [index2, setIndex2] = useState(0);

    const fetchRecommendedPlaces = async () => {
        try {
            const travelUserId = localStorage.getItem('memberId');
            const response = await axios.post(
                'http://43.202.121.14:8000/recommend/places/',
                { travel_user_id: travelUserId },
                {
                    withCredentials: false,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            setRecommendedPlaces(response.data);
        } catch (error) {
            console.error('Error fetching recommended places:', error);
        }
    };

    useEffect(() => {
        fetchRecommendedPlaces();
    }, []);

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

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (currentIndex < recommendedPlaces.length - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        },
        onSwipedRight: () => {
            if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
        },
        trackMouse: true
    });

    return (
        <div className={Crechoicestyle.choicebox}>
            <div className={Crechoicestyle.Crebackbutton}></div>
            <p className={Crechoicestyle.choicetext1}>OO님과 함께 가고 싶은</p>
            <p className={Crechoicestyle.choicetext2}>여행지를 선택해봐요!!</p>

            <p className={Crechoicestyle.choicprtext}>알고리즘 추천 여행지</p>
            <div {...handlers} className={Crechoicestyle.chicecontainer}>
                {recommendedPlaces.length > 0 && (
                    <div className={Crechoicestyle.slide}>
                        <h3>{recommendedPlaces[currentIndex].place}</h3>
                    </div>
                )}
                <div className={Crechoicestyle.dots}>
                    {recommendedPlaces.map((_, index) => (
                        <span 
                            key={index} 
                            className={`${Crechoicestyle.dot} ${index === currentIndex ? Crechoicestyle.activeDot : ''}`}
                        ></span>
                    ))}
                </div>
            </div>

            <div {...handlers1} className={Creprodmainstyle.rcslider}>
                <div
                    className={Creprodmainstyle.rcslidercontainer1}
                    style={{ transform: `translateX(-${index1 * 100}%)` }}
                >
                    <div className={Creprodmainstyle.rcslideritem1}></div>
                    <div className={Creprodmainstyle.rcslideritem1}></div>
                    <div className={Creprodmainstyle.rcslideritem1}></div>
                    <div className={Creprodmainstyle.rcslideritem1}></div>
                </div>
            </div>

           
        </div>
    );
}

export default Crechoice;