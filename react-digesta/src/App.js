import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./routes/layout/Layout";
import Main from "./routes/main/Main";
import DigestaAuth from "./routes/digesta_AUTH/DigestaAuth";
import DigestaTrad from "./routes/digesta_TRAD/DigestaTrad";
import DigestaLookUp from "./routes/digesta_LOOKUP/DigestaLookUp";
import React from "react";
import {useEffect} from "react";
import {loadTOC} from "./store/digesta-actions";
import {useDispatch} from "react-redux";


const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Layout/>,
            children: [
                {
                    path: '/',
                    element: <Main/>
                },
                {
                    path: '/jurysci',
                    element: <DigestaAuth/>
                },
                {
                    path: '/digesta',
                    element: <DigestaTrad/>
                },
                {
                    path: '/wyszukaj',
                    element: <DigestaLookUp/>
                }
            ]

        }
    ]
)


const App = () => {
    const dispatch = useDispatch()
    useEffect(()=>{dispatch(loadTOC())}, [dispatch])
    return (
        <RouterProvider router={router}/>
    )
}

export default App