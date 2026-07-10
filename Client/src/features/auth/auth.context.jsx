import { createContext,useEffect,useState } from "react";
import { getMe } from "../services/auth.api";

export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const[loading,setLoading]=useState(true)

    useEffect(()=>{
        const getMeAndSet = async ()=>{
            try {
                const data = await getMe();
                setUser(data.user);
                
            } catch (error) {
                setUser(null)
            }
            finally{
                setLoading(false)
            }
        }
        getMeAndSet()
    },[])

    return (
        <AuthContext.Provider value={{user,loading,setUser,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}