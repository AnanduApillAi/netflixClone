import React,{useState,useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { ValueContext } from '../../../contexts/ValuesContext'
import {LogoUrl} from '../../Assets/Assets'
import './HomeHeader.css'

function HomeHeader(props) {
  const navigate=useNavigate()
  const [state,setState]=useState(false)
  const [focused,setFocus]=useState(false)
  const [hovered,setHovered]=useState(false)
  const [searchValue,setSearchValue]=useState(null)
  const {setQuery,userName,setAuthentication}=useContext(ValueContext)
  const [logOutScreen,setLogOutScreen]=useState(false)
  const [logOutScreenHover,setlogOutScreenHover]=useState(false)
  const [sideNav,setSideNav]=useState(false)
  function handleBlur(){
    if(!hovered){
      setState(false)
      setFocus(false)
    }
  }
function searchHandle(){
  setQuery(searchValue)
  navigate('/search')
}
function handleLogout(){
  localStorage.removeItem('userkey');
  localStorage.removeItem('username')
  setAuthentication(false)
  navigate('/login')
}
return (
  <div>
   <div className={props.classname?`fixedHeader`:'homeHeaderHome'}  style={sideNav?{height:'18rem',backgroundColor:'black'}:{height:'4rem'}}>
    <img className='homelogo' src={LogoUrl} alt='Netflix' />
    <div className='navLinks'>
    <ul className='headerList' >
      <li ><Link className={props.navBtnActive==='home'?`activeLink`:'links'} to="/home">Home</Link></li>
      <li ><Link  className={props.navBtnActive==='movie'?`activeLink`:'links'} to="/movies">Movies</Link></li>
      <li ><Link  className={props.navBtnActive==='tv'?`activeLink`:'links'} to="/tvshows">Tv Shows</Link></li>
      <li ><Link  className={props.navBtnActive==='addlist'?`activeLink`:'links'} to="/mylist">My List</Link></li>  
    </ul>
    </div>
    <div  id={state?'searchActive1':''} className='searchMain' >
    <i onClick={()=>setState(true)}  className='fa-solid fa-magnifying-glass searchIcon'></i>
    <div id={state?'searchActive2':''}  className='searchDiv'>
    <input spellCheck='false'  autoComplete="off" onChange={(e)=>setSearchValue(e.target.value)} onClick={()=>setFocus(true)} onMouseLeave={()=>{if(!focused)setState(false)}} onBlur={handleBlur} className='searchInput'    id={state   ? 'searchActive3':''} type="text" ></input>
    <button  onClick={searchHandle}  className='searchBtnHome' onMouseOver={()=>setHovered(true)} onMouseOut={()=>{setHovered(false)}}>search</button>
    </div>
    </div>
    <div className='logOutDiv' ><button onBlur={()=>{if(!logOutScreenHover)setLogOutScreen(false)}} onClick={()=>setLogOutScreen(!logOutScreen)}  className='logOut' >Log Out</button></div>
    <span className='hamBurger'  onClick={()=>setSideNav(!sideNav)}><i className="fa-solid fa-bars"></i></span>
    </div>
    {logOutScreen?<div onMouseOver={()=>setlogOutScreenHover(true)} onMouseOut={()=>{setlogOutScreenHover(false);document.querySelector('.logOut').focus()}} className='logOutScreen'>
      <p>Hello {userName}..!</p>
      <p>Confirm Log out </p>
      <span onClick={handleLogout} className='confirmLogout'>Confirm</span>
    </div>:''}
    </div>
  )
}

export default HomeHeader

