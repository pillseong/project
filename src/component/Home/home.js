import React from 'react';
import Footer from '../footer/footer';
import Main from '../main/main';
import Header from '../Home/header';
import Slide from '../slide/slide';
import Persona from '../persona/persona';


function Home() {  
  return (
    <div className=''>
      <Header />
      <Slide/>
      <Persona/>
      <Footer /> 
    </div>
  );
}

export default Home;