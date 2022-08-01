import React from "react";
import{Link} from 'react-router-dom';
import './AboutMe.css'


export default function AboutMe(){
    return(
        <div className ="landingPageRamiro">
            <h1 className = 'title'> Ramiro Taramasco </h1>
            <h2 className = 'subTitle'> FullStack Web Developer</h2>
            <Link to ='/'>
                <button className='linkedinButton'> Linkedin </button>
            </Link>
            <button className="githubButton">
            <a href="https://github.com/TAGARA-world">Github</a>
            </button>
            <Link to ='/'>
                <button className='portfolioButton'> Portfolio </button>
            </Link>
        </div>
    )
}