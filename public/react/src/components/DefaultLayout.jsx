import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout(){
    const {user, token} = useStateContext()
    if(!token){
        return <Navigate to='/login' />
    }
    return(
        <>



        <p>defaukt layout</p>
        <Outlet/>
        </>
    )
}