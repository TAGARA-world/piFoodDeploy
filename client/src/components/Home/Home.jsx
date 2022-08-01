import React, { useEffect, useState,} from 'react'
import { getRecipes } from '../../redux/actions'
import { useDispatch, useSelector } from "react-redux";   

import s from '../Home/Home.module.css'
import Card from '../Card/Card'

import Paginacion from '../Paginacion/Paginacion';
import Search from '../Search/Search.jsx';
import Options from '../Options/Options';
import Loading from '../Loading/Loading'
import NotFound from "../NotFound/NotFound.jsx"


const Home = () => {
    const dispatch = useDispatch()
    const recipes = useSelector((state)=> state.recipe)
    let [loading,setLoading]= useState(true);
    //paginacion
    const [currentPage, setCurrentPage] = useState(1);
	const [couPerPage] = useState(9);
	const indexlast = currentPage * couPerPage; // devuelve 9
	const indexFirst = indexlast - couPerPage; // 0
	const allpages = recipes.slice(indexFirst, indexlast);
	const paginado = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
    if(allpages.length > 0 && loading){
        setLoading(false);
    }
    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch])
    const refresh=(e)=>{
        e.preventDefault()
        window.location.reload()
      }
  return (
    <>
        <div className={s.options}> 
        <Options set={setCurrentPage}/>
        </div>
       <div className={s.refres}>
            <button className={s.btn}  onClick={refresh}> <p className={s.na}>refresh</p>🍽</button>
            <Search/>
        </div>
        <Paginacion 
                recipes={recipes.length}
				couPerPage={couPerPage}
				paginado={paginado} />
        <div className={s.flex}>
        { allpages.length > 0 && !loading ? (
             allpages?.map((r)=>{
                return(
                    <Card  key={r.id}
                    id={r.id}
                    name={r.name}
                    image={r.image}
                    diets={ r.type ||  r.Diets.map(e => e.name) }
                    healthyScore={r.healthyScore}
                    dishTypes={r.dishTypes}
                    /> 
                )
            })
        ):  !allpages.length > 0 && loading ? (
            <Loading/>
        ) : (
            <NotFound/>
        )
        } 
        </div> 
        </>
  )
}

export default Home