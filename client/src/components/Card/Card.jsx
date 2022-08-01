import { Link } from 'react-router-dom'
import s from '../Card/Card.module.css'



const Card = ({id,name,diets,image,healthyScore,dishTypes}) => {
    var dietas='';
    if(Array.isArray(diets)){
        if(diets.name){
        var temp = diets.map((e)=>{return e.name})
        for(let i = 0 ; i<temp.length; i++){
            if(temp[i+1]){
            dietas=dietas+temp[i]+', '
            }else{
            dietas=dietas+temp[i];
            }
        }
    }else{
            temp = diets.map((e)=>{return e})
            for(let i = 0 ; i<temp.length; i++){
                if(temp[i+1]){
                dietas=dietas+temp[i]+', '
                }else{
                    dietas=dietas+temp[i];
                }
            }
    }
    } else dietas=diets; 
 return (
   <div className={s.grid}>
       <div className={s.conteiner}>
       <Link  to={`/recipe/${id}`}>
           <p className={s.name}>{name}</p>
       </Link>
           <img width={240} className={s.image} height={240} src={image} alt="" />
           <p className={s.score}>Health score: {healthyScore}</p>
           <p className={s.dietas}>{dietas}</p>
           <p >{dishTypes}</p>
       </div>
   </div>
 )
}

export default Card