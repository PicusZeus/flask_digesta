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
import DigestaSingleJurist from "./routes/digesta_AUTH/DigestSingleJurist/DigestaSingleJurist";
import DigestaJuristOpus from "./routes/digesta_AUTH/DigestSingleJurist/DigestaJuristOpus/DigestaJuristOpus";
import {loader as opusLoader} from "./routes/digesta_AUTH/DigestSingleJurist/DigestaJuristOpus/DigestaJuristOpus";
import {loader as lexLoader} from "./routes/digesta_AUTH/DigestSingleJurist/DigestaJuristOpus/DigestaJuristOpusLex/DigestaJuristOpusLex";
import DigestaJuristOpusLex
    from "./routes/digesta_AUTH/DigestSingleJurist/DigestaJuristOpus/DigestaJuristOpusLex/DigestaJuristOpusLex";
import DigestaJuristDigesta from "./routes/digesta_AUTH/DigestSingleJurist/DigestaJuristDigesta/DigestaJuristDigesta";

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
                    element: <DigestaAuth/>,
                    children: [
                        {
                            path: ':jurysta_id',
                            element: <DigestaSingleJurist/>,
                            children: [
                                {
                                    path: ':opus_id',
                                    element: <DigestaJuristOpus/>,
                                    loader: opusLoader,
                                    children: [
                                        {
                                            path: ':lex_id',
                                            element: <DigestaJuristOpusLex/>,
                                            loader: lexLoader
                                        }
                                    ]
                                },
                                {
                                    path: 'digesta/:jurysta_id',
                                    element: <DigestaJuristDigesta/>
                                }


                            ]
                        }
                    ]
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