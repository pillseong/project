import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./firstemate.module.css";
import permainstyle from "../personapage/permain.module.css";
import axios from 'axios';
import mate from "./Vector.png";
import Footer from '../footer/footer';

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

function Firstmatepage() {
    const mbtiImages = {
        ENFJ, ENFP, ENTJ, ENTP, ESFJ, ESFP, ESTJ, ESTP,
        INFJ, INFP, INTJ, INTP, ISFJ, ISFP, ISTJ, ISTP
    };

    const mbtiToCityMap = {
        ENFJ: "시드니", ENFP: "바르셀로나", ENTJ: "뉴욕", ENTP: "런던",
        ESFJ: "라스베이거스", ESFP: "암스테르담", ESTJ: "서울", ESTP: "홍콩",
        INFJ: "샌프란시스코", INFP: "파리", INTJ: "싱가포르", INTP: "베를린",
        ISFJ: "교토", ISFP: "리우데자네이루", ISTJ: "도쿄", ISTP: "부다페스트"
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

    const [isOn, setIsOn] = useState(false);
    const navigate = useNavigate();
    const [myMates, setMyMates] = useState([]);
    const [personaData, setPersonaData] = useState(null);
    const [list, setList] = useState([]);
    const [selectedMate, setSelectedMate] = useState(null);
    const [selfData, setSelfData] = useState(null);

    useEffect(() => {
        const fetchMyMates = async () => {
            try {
                const jwtToken = localStorage.getItem('jwtToken');
                const jwtRefreshToken = localStorage.getItem('jwtRefreshToken');

                const config = {
                    headers: {
                        'Cookie': `jwtToken=${jwtToken}; jwtRefreshToken=${jwtRefreshToken}`
                    }
                };

                const response = await axios.get('https://port-0-travelproject-9zxht12blqj9n2fu.sel4.cloudtype.app/friend/friend-list', config);
                setMyMates(response.data);
                console.log(response.data);

                const travelUserIds = response.data.map(mate => mate.friendTravelUserId);
                const travelUserIdsObject = { list: travelUserIds };

                console.log(JSON.stringify(travelUserIdsObject));
                setList(travelUserIdsObject);
                
            } catch (error) {
                console.error('Error fetching my mates:', error);
            }
        };

        fetchMyMates();
    }, []);

    useEffect(() => {
        const fetchPersonaData = async () => {
            try {
                const memberId = localStorage.getItem('memberId');
                if (!memberId) {
                    console.error('memberId not found in localStorage');
                    return;
                }

                const response = await axios.post(`http://43.202.121.14:8000/getlist/friends/${memberId}/`, list, {
                    withCredentials: false,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                console.log('Persona data:', response.data);
                setPersonaData(response.data);
                setSelfData(response.data.self);
            } catch (error) {
                console.error('Error fetching persona data:', error);
                console.log(list);
            }
        };

        if (list.list && list.list.length > 0) {
            fetchPersonaData();
        }
    }, [list]);

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    const mate_travel = () => {
        navigate("/nextpage");
    }

    const manageMate = () => {
        navigate("/Managematepage");
    }

    const handleMateClick = (friendTravelUserId) => {
        if (personaData && personaData.list) {
            const selected = personaData.list.find(mate => mate.travel_user_id === friendTravelUserId);
            if (selected) {
                setSelectedMate(selected);
                console.log(`Clicked mate's MBTI: ${selected.tendency}`);
            } else {
                console.log('MBTI information not found for this mate.');
            }
        } else {
            console.log('Persona data not loaded yet.');
        }
    };

    const renderMBTIImage = (mbti) => {
        return (
            <img 
                src={mbtiImages[mbti]} 
                alt={`${mbti} image`} 
                className={permainstyle.perimg1}
            />
        );
    };

    const renderCompatibility = (compatibility) => {
        return (
            <div className={permainstyle.userstatedistrict}>
                <p className={permainstyle.compat}>궁합</p>
                <p className={permainstyle.percent}>{compatibility}%</p>
            </div>
        );
    };

    const renderPersonalityBars = (data, side) => {
        return (
            <div className={permainstyle[`userinfocontainer${side}`]}>
                <div className={permainstyle.infobox1}>
                    <p className={permainstyle.userinfotext}>모험</p>
                    <div className={permainstyle.userinfobox} style={{width: `${data.ei}%`}}></div>
                </div>
                <div className={permainstyle.infobox2}>
                    <p className={permainstyle.userinfotext}>경험</p>
                    <div className={permainstyle.userinfobox} style={{width: `${data.sn}%`}}></div>
                </div>
                <div className={permainstyle.infobox3}>
                    <p className={permainstyle.userinfotext}>즉흥</p>
                    <div className={permainstyle.userinfobox} style={{width: `${data.ft}%`}}></div>
                </div>
                <div className={permainstyle.infobox4}>
                    <p className={permainstyle.userinfotext}>사교</p>
                    <div className={permainstyle.userinfobox} style={{width: `${data.pj}%`}}></div>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.containerWrapper}>
            <div className={styles.container}>
                <div className={styles.mainbox}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>여행 메이트</h1>
                        
                        <div className={styles.togglebutton} onClick={handleToggle}>
                            <div className={`${styles.toggleoption} ${!isOn ? styles.active : ''}`}>
                                <p className={styles.text1}>메이트</p>
                            </div>
                            <div className={`${styles.toggleoption} ${isOn ? styles.active : ''}`}>
                                <p className={styles.text2}>가이드</p>
                            </div>
                            <div className={`${styles.togglecircle} ${isOn ? styles.on : styles.off}`}></div>
                        </div>
                    </div>

                    <div className={styles.subHeader}>
                        <div>
                            {myMates.length > 0 ? (
                                myMates.map((mate) => (
                                    <div key={mate.id}>
                                        <div 
                                            className={styles.header_container}
                                            onClick={() => handleMateClick(mate.friendTravelUserId)}
                                        >
                                            <img />
                                            <p>{mate.friendTravelUserDto.name}</p>
                                        </div>
                                    </div>
                                ))
                            ) : <p className={styles.noMateText}>메이트가 아직 없습니다.</p>}
                        </div>
                        
                        <div className={styles.mateManageIconContainer} onClick={manageMate}>
                            <div className={styles.mateManageCircle}>
                               <img className={styles.img} src={mate} alt="Mate icon" />
                            </div>
                            <div className={styles.mateManageIcon}>
                                메이트 관리
                            </div>
                        </div>
                    </div>
                    <div className={styles.divider}></div>

                    {myMates.length > 0 && selectedMate && selfData ? (
                        <div className={permainstyle.permaincontainer}>
                            <div className={permainstyle.perusercontainer}>
                                {renderMBTIImage(selfData.tendency)}
                            </div>
                            <div className={permainstyle.perusercontainer}>
                                {renderMBTIImage(selectedMate.tendency)}
                            </div>
                            {renderPersonalityBars(selfData, 1)}
                            {renderPersonalityBars(selectedMate, 2)}
                            {renderCompatibility(selectedMate.compatibility)}
                        </div>
                    ) : (
                        <div className={styles.content}>
                            <p className={styles.createMateText}>메이트를 선택하세요.</p>
                        </div>
                    )}
                    <button className={styles.createTripButton} onClick={mate_travel}>여행 만들기</button>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Firstmatepage;