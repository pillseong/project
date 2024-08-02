import React from "react";
import Footer from '../footer/footer';
import Perheader from "./perheader.js"
import Permain from "./permain.js"
import Perrecom from "./perrecom.js";
import Mkinput from "./makinginput.js";
import { Outlet } from "react-router-dom";
function Perhome(){
    

    return (
        <div>
            
            <Perheader></Perheader>
            <Permain></Permain>
            <Perrecom></Perrecom>
            <Mkinput></Mkinput>
            <Footer></Footer>
           
        </div>
       
    );


}
export default Perhome;

