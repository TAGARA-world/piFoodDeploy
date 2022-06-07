import React from "react";
import{Link} from 'react-router-dom';
import './AboutMe.css'


export default function AboutMe(){
    return(
        <div className ="landingPage">
            <h1 className = 'landingTitle'> Bienvenidos </h1>
            <h2 className = 'landingSubTitle'> a mi proyecto Henry</h2>
            <Link to ='/home'>
                <button className='landingButton'> Vamos a cocinar </button>
            </Link>
        </div>
    )
}