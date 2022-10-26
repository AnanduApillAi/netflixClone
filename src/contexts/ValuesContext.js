import React,{createContext,useState} from 'react'

export const ValueContext=createContext(null)


export default function ValuesContext({children}) {
const [userName,setUserName]=useState()
const [isAuthenticated,setAuthentication]=useState(false)
const [userKey,setUserKey]=useState('')
const [individual,setIndividual]=useState(null)
const[query,setQuery]=useState(null)
const [videos,setVideos]=useState(null)

  return (
    <ValueContext.Provider value={{userName,setUserName,isAuthenticated,setAuthentication,individual,setIndividual,query,setQuery,videos,setVideos,userKey,setUserKey}}>
        {children}
    </ValueContext.Provider>
    
  )
}
