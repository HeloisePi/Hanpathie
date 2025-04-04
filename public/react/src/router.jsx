import { createBrowserRouter, Navigate, Routes } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import NotFound from "./views/Notfound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/guestlayout";
import Games from "./views/Games";

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
            },
            {
                path : '/games',
                element: <Games/>
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