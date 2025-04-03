import { createBrowserRouter, Navigate, Routes } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import NotFound from "./views/Notfound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/guestlayout";

const router = createBrowserRouter([
    {
        path:'/',
        element: <DefaultLayout />,
        children:[
            {
                path : '/',
                element: <Users/>
            },
            {
                path : '/users',
                element: <Users/>
            }

        ]
    },
    {
        path:'/',
        element: <GuestLayout />,
        children:[
            {
                path : '/login',
                element: <Login/>
            },
            {
                path : '/signup',
                element: <Signup/>
            }
        ]
    },
    
    
    {
        path : '*',
        element: <NotFound />
    }
    
])

export default router;