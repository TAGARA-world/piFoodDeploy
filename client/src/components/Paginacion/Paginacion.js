import React from "react";
import './Paginacion.css';


export default function Paginado({recipes, couPerPage, paginado}){
    const pageNumbrers = []
    for (let i = 1; i <= Math.ceil(recipes/couPerPage); i++) {
        pageNumbrers.push(i)   
    }
    //---------------------------------
    setTimeout(() => {
        const btnContainer = document.getElementById("MyId");
        // Get all buttons with class="btn" inside the container
      if(btnContainer) { var btns = btnContainer.getElementsByClassName("numero");
        
        // // Loop through the buttons and add the active class to the current/clicked button
        for (var j = 0; j < btns.length; j++) {
          btns[j].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
        
            // If there's no active class
            if (current.length > 0) {
              current[0].className = current[0].className.replace(" active", "");
            }
        
            // Add the active class to the current/clicked button
            this.className += " active";
          });
        }
}
    }, 1000);
//----------------------------------------------

    return(
        <nav className='paginadoContainer'>
            <div id="MyId" className ='number'>
                {pageNumbrers && 
                pageNumbrers.map(number =>(
                    //<li key={number}>
                        <a  href onClick={()=>paginado(number)} className ='numero' value={number} > {number} </a>  
                    //</li> 
                ))}
            </div>
        </nav>
    )
}