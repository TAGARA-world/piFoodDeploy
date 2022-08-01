import React from "react";
import{Link} from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage(){
    return(
        <div className ="landingPage">
            <h1 className = 'landingTitle'> Bienvenidos a Foods </h1>
            <h2 className = 'landingSubTitle'> mi proyecto Henry</h2>
            <Link to ='/home'>
                <button className='landingButton'> Ingresar al sitio</button>
            </Link>
            <Link to ='/ramirotaramasco'>
                <button className='aboutme'> Ramiro Taramasco</button>
            </Link>
        </div>
    )
}