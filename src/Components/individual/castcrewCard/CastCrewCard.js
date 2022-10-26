import React,{useState} from 'react'
import './CastCrewCard.css'

function CastCrewCard({item}) {
    const [showMore,setShowMore]=useState(5)

    function handleShowmore(){
        if(showMore===5){
            setShowMore(17)
        }
        if(showMore===17){
            setShowMore(item.length)
        }
        if(showMore>item.length||showMore===item.length){
            setShowMore(5)
        }
    }
    if(item){
        return (
            <div>
            <div className='castDisplay'>
        {item.map((element,index)=>{
                    
               if(index<=showMore){
                 return  <div className='castDisplayIndvdl skeltonCard' key={index}>
                           <img  src={element.profile_path?`https://image.tmdb.org/t/p/w300/${element.profile_path}`:'https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png'} alt="" />
                           <p>{element.name}</p>
                           <p>{element.known_for_department?element.known_for_department:''}{element.character?element.character:''}</p>
                          </div>
                  }  
                })}
            </div>
           {item.length>5?<button className='ShowMoreBtn' onClick={handleShowmore}>{showMore<item.length?'Show More':'Show Less'}</button>:''} 
            </div>
          )
    }
}

export default CastCrewCard