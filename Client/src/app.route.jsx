import {createBrowserRouter}  from "react-router"
import {Login} from "./features/auth/page/Login"
import {Register} from "./features/auth/page/Register"
export const router = createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    }
])
