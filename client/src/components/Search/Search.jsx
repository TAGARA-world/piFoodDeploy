import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getByName } from '../../redux/actions.js'
import s from '../Search/Search.module.css'

const Search = () => {
    const dispatch =  useDispatch()
    const [name,SetName]= useState("")

    const handleChange = (e)=>{
        e.preventDefault()
        SetName(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(getByName(name));
        SetName('');
      }

  return (
    <div className={s.formu} onSubmit={handleSubmit}>
      <form action="">
        <input type="text"
                placeholder='Buscar Recetas.. '
                value={name}
                onChange={handleChange}
                autoComplete='off'
            />
        </form>
            <button onClick={handleSubmit} className={s.inputButton} type="submit" value="">🍳</button>
    </div>
  )
}

export default Search