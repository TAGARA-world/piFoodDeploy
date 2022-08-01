import React from "react";
import './Paginado.css'
// ALTO
export default function Paginado({couPerPage, recipes, paginado}){
    const pageNumbrers = []
    for (let i = 1; i <= Math.ceil(recipes/couPerPage); i++) {
        pageNumbrers.push(i)   
    }
    //---------------------------------
    setTimeout(() => {
        const btnContainer = document.getElementById("MyId");
        if(btnContainer) { var btns = btnContainer.getElementsByClassName("numero");
        for (var j = 0; j < btns.length; j++) {
          btns[j].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            if (current.length > 0) {
              current[0].className = current[0].className.replace(" active", "");
            }
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
                    <li key={number.toString()}>
                        <p   onClick={()=>paginado(number)} className ='numero' value={number} > {number} </p>
                    </li> 
                ))}
            </div>
        </nav>
    )
}