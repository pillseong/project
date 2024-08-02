// Mkidpage.js
import React, { useState } from "react";
import mkidpagestyle from "./mkidpage.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Mkidpage() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gender: "M",
    age: "",
    phoneNumber: "",
    email: "",
    password: "",
    address: "",
    identificationNumber: "",
    imageUrl: "",
    introduction: ""
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
        
     
      memberDto: {
        email: formData.email,
        password: formData.password
    },
    travelUserDto: {
        name: formData.name,
        gender: formData.gender,
        age: parseInt(formData.age),
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        identificationNumber: formData.identificationNumber,
        imageUrl: formData.imageUrl,
        introduction: formData.introduction
      }
    };

    try {
      const response = await axios.post('https://port-0-travelproject-9zxht12blqj9n2fu.sel4.cloudtype.app/travel-user/creation', payload);
      console.log(response.data);
      alert("계정이 성공적으로 생성되었습니다.");
      navigate('/loginpage');
    } catch (error) {
        console.log(payload)
      console.error("Error creating account:", error);
      alert("계정 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={mkidpagestyle.mainbox}>
      <h1 className={mkidpagestyle.mkidmaintext}>계정 생성</h1>
      
      <form onSubmit={handleSubmit}>
        <label className={mkidpagestyle.inputlabel}>사용자 이름 *</label>
        <input className={mkidpagestyle.mkinput} name="name" value={formData.name} onChange={handleInputChange} placeholder="당신의 이름" required />
        
        <label className={mkidpagestyle.inputlabel}>성별 *</label>
        <select className={mkidpagestyle.mkinput} name="gender" value={formData.gender} onChange={handleInputChange} required>
          <option value="M">남성</option>
          <option value="F">여성</option>
        </select>
        
        <label className={mkidpagestyle.inputlabel}>나이 *</label>
        <input className={mkidpagestyle.mkinput} type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="나이" required />
        
        <label className={mkidpagestyle.inputlabel}>전화번호 *</label>
        <input className={mkidpagestyle.mkinput} name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="전화번호" required />
        
        <label className={mkidpagestyle.inputlabel}>이메일 *</label>
        <input className={mkidpagestyle.mkinput} type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="이메일" required />
        
        <label className={mkidpagestyle.inputlabel}>비밀번호 *</label>
        <div className={mkidpagestyle.passwordContainer}>
          <input 
            className={mkidpagestyle.mkinput} 
            type={showPassword ? "text" : "password"} 
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="••••••••"
            required 
          />
          <button 
            className={mkidpagestyle.passwordToggle} 
            onClick={togglePasswordVisibility}
            type="button"
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보이기"}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" 
                stroke="#AAAAAA" 
                strokeWidth="1.5"
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" 
                stroke="#AAAAAA" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              {showPassword && (
                <path 
                  d="M3 21L21 3" 
                  stroke="#AAAAAA" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </button>
        </div>

        <label className={mkidpagestyle.inputlabel}>주소</label>
        <input className={mkidpagestyle.mkinput} name="address" value={formData.address} onChange={handleInputChange} placeholder="주소" />
        
        <label className={mkidpagestyle.inputlabel}>주민등록번호</label>
        <input className={mkidpagestyle.mkinput} name="identificationNumber" value={formData.identificationNumber} onChange={handleInputChange} placeholder="주민등록번호" />
        
        <label className={mkidpagestyle.inputlabel}>프로필 이미지 URL</label>
        <input className={mkidpagestyle.mkinput} name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="이미지 URL" />
        
        <label className={mkidpagestyle.inputlabel}>자기소개</label>
        <textarea className={mkidpagestyle.mkinput} name="introduction" value={formData.introduction} onChange={handleInputChange} placeholder="자기소개" />
        
        <div className={mkidpagestyle.checkboxContainer}>
          <input type="checkbox" id="agreement" className={mkidpagestyle.checkbox} required />
          <label htmlFor="agreement" className={mkidpagestyle.checkboxLabel}>
            약관 및 개인정보 보호정책에 동의합니다.
          </label>
        </div>
        
        <button type="submit" className={mkidpagestyle.submitButton}>계정 생성</button>
      </form>
      
      <p className={mkidpagestyle.loginLink}>
        이미 계정을 가지고 있나요? <Link to="/loginpage">로그인</Link>
      </p>
    </div>
  );
}

export default Mkidpage;