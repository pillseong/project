import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function UploadWait() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { travelAnswers, mbti, visitedPlaces, desiredPlaces } = location.state || {};
// selectedImages, 
  const jwtToken = localStorage.getItem('jwtToken');
  const jwtRefreshToken = localStorage.getItem('jwtRefreshToken');
  const memberId = localStorage.getItem('memberId');

  useEffect(() => {                         
    console.log("UploadWait component mounted");
    console.log("Location state:", location.state);

    const uploadDataAndAnalyze = async () => {
      try {
        const formData = new FormData();

        // console.log("Received Images:", selectedImages);

        // if (selectedImages && Array.isArray(selectedImages)) {
        //   selectedImages.slice(0, 10).forEach((image, index) => {
        //     formData.append(`picture${index + 1}`, image, `image${index + 1}.jpg`);
        //   });
        // }

        if (travelAnswers && Array.isArray(travelAnswers)) {
          travelAnswers.forEach((answer, index) => {
            formData.append(`question${index + 1}`, answer);
          });
        }

        if (memberId) formData.append('travel_user_id', memberId);
        if (mbti) formData.append('mbti', mbti);
        if (visitedPlaces) formData.append('visited_places', visitedPlaces);
        if (desiredPlaces) formData.append('desired_places', desiredPlaces);

        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }

        console.log("Sending POST request to:", 'http://43.202.121.14:8000/persona/create_user_info/');

        const response = await axios.post('http://43.202.121.14:8000/persona/create_user_info/', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          }
        });

        console.log("Server Response:", response.data);
        navigate('/potocompage', { state: { analysisResult: response.data } });
      } catch (error) {
        console.error("Error during data upload and analysis:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      }
    };

    uploadDataAndAnalyze();
  }, [travelAnswers, mbti, visitedPlaces, desiredPlaces, navigate, memberId, location.state]);
  // selectedImages, 
  return (
    <div>
      <h1>페르소나를 생성 중입니다...</h1>
      <progress value={progress} max="100"></progress>
      <span>{progress}%</span>
    </div>
  );
}

export default UploadWait;