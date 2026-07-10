import { Navigate } from "react-router";
import { useAuth } from "../hooks/auth.context"



export const  Protected = ({children})=>{
    const {user,loading}=useAuth();
    if(loading){
        return (
            <main>
                <h1>Loading...</h1>
            </main>
        )
    }
    if(!user){
        return <Navigate to={"/login"} replace />
    }
    return children
}