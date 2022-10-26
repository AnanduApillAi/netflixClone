import React,{useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import { ValueContext } from '../../../contexts/ValuesContext'
import './card.css'

function Card(props) {
const [flipped,isFlipped]=useState(false)
const navigate=useNavigate()
const {setIndividual}=useContext(ValueContext)

function handleInfoClick(data){
  setIndividual(data,navigate('/movie'))
}
try {
  return (
    props.NetflixOrginals?
    <div onClick={()=>isFlipped(!flipped)}  className={`${props.classname} skeltonCard`}  onMouseEnter={()=>props.setbackground(props.element.backdrop_path)}>
        { !flipped?<img className='frontSide'     src={props.element.poster_path?`https://image.tmdb.org/t/p/w300/${props.element.poster_path}`:'https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png'} alt='' />
          :<div className='backSide'><i onClick={()=>handleInfoClick(props.element)} className="fa-sharp fa-solid fa-circle-info cardBtn"></i><p className='cardOverview'>{props.element.overview}</p></div>}
    </div>
    :<div onClick={()=>isFlipped(!flipped)}  className={`${props.classname} skeltonCard`} >
      { !flipped?<img className='frontSide'   src={props.element.poster_path?`https://image.tmdb.org/t/p/w300/${props.element.poster_path}`:'https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png'} alt="" />
    
        :<div className='backSide'>{props.AddList?<i onClick={()=>props.handleDelete(props.element)} className="fa-solid fa-trash deleteBtn"></i>:''}<i onClick={()=>handleInfoClick(props.element)} className="fa-sharp fa-solid fa-circle-info cardBtn"></i><p className='cardOverview'>{props.element.overview}</p></div>}
   </div>
  ) 
} catch (error) {
  console.log(error);
}
}

export default Card


