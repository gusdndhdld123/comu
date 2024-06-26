import React, {useContext, useEffect, useState} from 'react';
import myImage from '../image/lunch.jpg';

function TitleBanner(){
    return (
        <div className="justify-content-md-center" style={{width: "100%", height: "150px", backgroundImage: `url(${myImage})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
            <h1 style={{color:"white",paddingTop:"50px"}}>대충 배너</h1>
        </div>
    )
}

export default TitleBanner