import { useState, useEffect, useContext, createContext, Children } from "react";
import { currentAccount } from "../lib/appwrite";


const GlobalContext = createContext()
export const useGlobalContext =()=> useContext(GlobalContext)

const GlobalPovider=({children})=>{

    const [isUser, setIsUser]= useState(null)
    const [isLoggedin, setIsLoggedIn]= useState(false)
    const [isLoading, setIsLoading]= useState(false)

    useEffect(() => {
      currentAccount()
      .then((res)=>{
        if(res){
            setIsUser(res)
            setIsLoggedIn(true)
        }else{
            setIsUser(null)
            setIsLoggedIn(false)
        }
        
      }).catch((error)=>{
        console.log(error);
        
      })
    }, [])
    

  return(
    <GlobalContext.Provider value={{isUser,isLoading,isLoggedin, setIsLoggedIn, setIsUser}}>{children}</GlobalContext.Provider>
  )

}

export default GlobalPovider