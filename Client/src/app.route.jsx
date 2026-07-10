import {createBrowserRouter}  from "react-router"
import {Login} from "./features/auth/page/Login"
import {Register} from "./features/auth/page/Register"
import { Protected } from "./features/auth/components/ProtectedRoute"
import { Home } from "./features/interview/pages/Home"
export const router = createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/",
        element:<Protected><Home/></Protected>
    }
])
