import React, { useState, useEffect } from 'react'

const useGeoLocation = () => {

    const DiaryInput = () => {
        window.location.href = "http://localhost:3000/DiaryInput"
    }
  return (
    <div>
        <h2>여행 일기</h2>
        <div>
            <div>여행일기 기록 (이미지)</div>
            <div>하트?</div>
        </div>
        <div>
            <span>아직 여행 일기가 없습니다.</span>
            <span>내 페르소나와 여행에 대한 대화를 하면 커버 이미지와 함께 여행 일기를 생성해줍니다.</span>
        </div>
        <button onClick={DiaryInput}>여행 일기 쓰기</button>
    </div>
  )
}

export default useGeoLocation

