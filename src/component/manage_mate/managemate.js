import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "./managemate.module.css";

import backBtn from '../logininput/back.png';
import message from './Vector.png';

import Footer from '../footer/footer';

// 내 메이트 컴포넌트
function MyMates() {
    const [myMates, setMyMates] = useState([]);
    const [roomId, setRoomId] = useState(null);
    const [isSocketReady, setIsSocketReady] = useState(false);
    const [status, setStatus] = useState('');
    const [recipientId, setRecipientId] = useState('');

    useEffect(() => {
        const fetchMyMates = async () => {
            try {
                const jwtToken = localStorage.getItem('jwtToken');
                const jwtRefreshToken = localStorage.getItem('jwtRefreshToken');

                const config = {
                    withCredentials: true,
                    headers: {
                        'Cookie': `jwtToken=${jwtToken}; jwtRefreshToken=${jwtRefreshToken}`
                    }
                };

                const response = await axios.get('https://port-0-travelproject-9zxht12blqj9n2fu.sel4.cloudtype.app/friend/friend-list', config);
                setMyMates(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching my mates:', error);
            }
        };

        fetchMyMates();
    }, []);

    const itsme = localStorage.getItem("memberId")

    const ChatStart = async (userId) => {
        try {
            const response = await axios.post('https://port-0-travelproject-umnqdut2blqqevwyb.sel4.cloudtype.app/chat/rooms/', {
                travel_user_id: itsme,
                users: [
                    { travel_user_id: userId }
                ]
            });

            const createdRoomId = response.data.id;
            setRoomId(createdRoomId);
            console.log('생성된 방 ID:', createdRoomId);

            // 새로운 방이 생성된 후 웹소켓을 해당 방 ID에 맞게 재연결
            const webSocketUrl = `wss://port-0-travelproject-umnqdut2blqqevwyb.sel4.cloudtype.app/ws/chat/${createdRoomId}/`;
            const socket = new WebSocket(webSocketUrl);

            socket.onopen = () => {
                console.log('웹소켓 연결 완료');
                setIsSocketReady(true);
            };

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log('서버로부터 메시지 수신:', data);
                // handleServerMessage(data);
            };

            socket.onerror = (error) => {
                console.error('웹소켓 오류:', error);
                setIsSocketReady(false);
            };

            socket.onclose = (event) => {
                console.log('웹소켓 연결 종료.', event.code, event.reason);
                setIsSocketReady(false);
            };

            console.log('Chat Start');
        } catch (error) {
            console.error('Error creating chat room:', error.response?.data || error.message);
            setStatus('채팅방 생성 중 오류가 발생했습니다.');
        }
    }

    return (
        <div className={styles.content}>
            <div className={styles.header_container}>
                <p className={styles.count}>내 메이트 {myMates.length}명</p>
                <button className={styles.editButton}>편집</button>
            </div>
            {myMates.length > 0 ? (
                myMates.map((mate) => (
                    <div key={mate.id} className={styles.selectedMateInfo}>
                        <div className={styles.img}></div>
                        <div className={styles.chat_container}>
                            <p className={styles.userName}>{mate.friendTravelUserDto.name}</p>
                            <p>한국형 페르소나</p>
                        </div>
                        <img 
                            src={message} 
                            className={styles.meesage} 
                            onClick={() => ChatStart(mate.friendTravelUserId)}
                        />
                    </div>
                ))
            ) : (
                <p className={styles.noMateMessage}>내 메이트가 아직 없습니다.</p>
            )}
        </div>
    );
}

// 받은 요청 컴포넌트
function ReceivedRequests() {
    const [receivedRequests, setReceivedRequests] = useState([]);

    useEffect(() => {
        const fetchReceivedRequests = async () => {
            try {
                const jwtToken = localStorage.getItem('jwtToken');
                const jwtRefreshToken = localStorage.getItem('jwtRefreshToken');

                const config = {
                    withCredentials: true,
                    headers: {
                        'Cookie': `jwtToken=${jwtToken}; jwtRefreshToken=${jwtRefreshToken}`
                    }
                };

                const response = await axios.get('https://port-0-travelproject-9zxht12blqj9n2fu.sel4.cloudtype.app/friend/standby-list', config);
                setReceivedRequests(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching received requests:', error);
            }
        };

        fetchReceivedRequests();
    }, []);

    const handleAccept = async (requestId) => {
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            const jwtRefreshToken = localStorage.getItem('jwtRefreshToken');

            const config = {
                withCredentials: true,
                headers: {
                    'Cookie': `jwtToken=${jwtToken}; jwtRefreshToken=${jwtRefreshToken}`
                }
            };

            const response = await axios.patch('https://port-0-travelproject-9zxht12blqj9n2fu.sel4.cloudtype.app/friend/acceptance', {
                friendTravelUserId: receivedRequests[0].friendTravelUserId
            }, config);

            console.log(`Request ${requestId} accepted`, response.data);
            setReceivedRequests(receivedRequests.filter(request => request.id !== requestId));
        } catch (error) {
            console.error('Error accepting request:', error);
        }
    };

    const handleReject = async (requestId) => {
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            const jwtRefreshToken = localStorage.getItem('jwtRefreshToken');

            const config = {
                withCredentials: true,
                headers: {
                    'Cookie': `jwtToken=${jwtToken}; jwtRefreshToken=${jwtRefreshToken}`
                }
            };

            const response = await axios.patch('https://port-0-travelproject-9zxht12blqj9n2fu.sel4.cloudtype.app/friend/refusal', {
                friendTravelUserId: receivedRequests[0].friendTravelUserId
            }, config);

            console.log(`Request ${requestId} rejected`, response.data);
            setReceivedRequests(receivedRequests.filter(request => request.id !== requestId));
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };

    return (
        <div className={styles.content}>
            <div className={styles.header_container}>
                <p className={styles.count}>받은 요청 {receivedRequests.length}개</p>
                <button className={styles.editButton}>편집</button>
            </div>
            {receivedRequests.length > 0 ? (
                receivedRequests.map((request) => (
                    <div key={request.id} className={styles.selectedMateInfo}>
                        <div className={styles.img}></div>
                        <div className={styles.chat_container}>
                            <p className={styles.userName}>{request.name}</p>
                            <p>{request.location} • 궁합 {request.percentage}%</p>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button className={styles.acceptButton} onClick={() => handleAccept(request.id)}>수락</button>
                            <button className={styles.rejectButton} onClick={() => handleReject(request.id)}>거절</button>
                        </div>
                    </div>
                ))
            ) : (
                <p className={styles.noMateMessage}>받은 요청이 없습니다.</p>
            )}
        </div>
    );
}

function SentRequests() {
    const [sentRequests, setSentRequests] = useState([]);

    useEffect(() => {
        const fetchSentRequests = async () => {
            try {
                const jwtToken = localStorage.getItem('jwtToken');
                const jwtRefreshToken = localStorage.getItem('jwtRefreshToken');

                const config = {
                    withCredentials: true,
                    headers: {
                        'Cookie': `jwtToken=${jwtToken}; jwtRefreshToken=${jwtRefreshToken}`
                    }
                };

                const response = await axios.get('https://port-0-travelproject-9zxht12blqj9n2fu.sel4.cloudtype.app/friend/request-list', config);
                setSentRequests(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching sent requests:', error);
            }
        };

        fetchSentRequests();
    }, []);

    return (
        <div className={styles.content}>
            <div className={styles.header_container}>
                <p className={styles.count}>보낸 요청 {sentRequests.length}개</p>
                <button className={styles.editButton}>편집</button>
            </div>
            {sentRequests.length > 0 ? (
                sentRequests.map((request) => (
                    <div key={request.id} className={styles.selectedMateInfo}>
                        <div className={styles.img}></div>
                        <div className={styles.chat_container}>
                            <p className={styles.userName}>{request.friendTravelUserDto.name}</p>
                            <p>{request.friendTravelUserDto.location} • 궁합 {request.friendTravelUserDto.percentage}%</p>
                        </div>
                        <p className={styles.pendingStatus}>대기중</p>
                    </div>
                ))
            ) : (
                <p className={styles.noMateMessage}>보낸 요청이 없습니다.</p>
            )}
        </div>
    );
}

function Managemate() {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('myMates');
    const [selectedMate, setSelectedMate] = useState(null);

    useEffect(() => {
        if (location.state && location.state.selectedMate) {
            setSelectedMate(location.state.selectedMate);
        }
    }, [location]);

    const handleBack = () => {
        navigate(-1);
    };

    const renderContent = () => {
        switch(activeTab) {
            case 'myMates':
                return <MyMates />;
            case 'receivedRequests':
                return <ReceivedRequests />;
            case 'sentRequests':
                return <SentRequests />;
            default:
                return <MyMates />;
        }
    };

    return (
        <div className={styles.mainbox}>
            <header className={styles.header}>
                <img src={backBtn} className={styles.backButton} onClick={handleBack}/>
                <h1 className={styles.title}>메이트 관리</h1>
            </header>
            
            <nav className={styles.tabNav}>
                <button 
                    className={`${styles.tabButton} ${activeTab === 'myMates' ? styles.active : ''}`}
                    onClick={() => setActiveTab('myMates')}
                >
                    내 메이트
                </button>
                <button 
                    className={`${styles.tabButton} ${activeTab === 'receivedRequests' ? styles.active : ''}`}
                    onClick={() => setActiveTab('receivedRequests')}
                >
                    받은 요청
                </button>
                <button 
                    className={`${styles.tabButton} ${activeTab === 'sentRequests' ? styles.active : ''}`}
                    onClick={() => setActiveTab('sentRequests')}
                >
                    보낸 요청<span className={styles.dot}></span>
                </button>
            </nav>
            
            {renderContent()}

            <Footer />
        </div>
    );
}

export default Managemate;
