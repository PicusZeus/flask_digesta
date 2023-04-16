import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./routes/layout/Layout";
import Main from "./routes/main/Main";
import DigestaAuth from "./routes/digesta_AUTH/DigestaAuth";
import DigestaTrad from "./routes/digesta_TRAD/DigestaTrad";
import DigestaLookUp from "./routes/digesta_LOOKUP/DigestaLookUp";
import React, {useEffect} from "react";
import {loadTOC} from "./store/digesta-actions";
import {useDispatch} from "react-redux";
import DigestaSingleJurist from "./routes/digesta_AUTH/DigestSingleJurist/DigestaSingleJurist";
import DigestaJuristOpus, { loader as opusLoader } from "./routes/digesta_AUTH/DigestSingleJurist/DigestaJuristOpus/DigestaJuristOpus";
import DigestaJuristDigesta, { loader as juristLexLoader } from "./routes/digesta_AUTH/DigestSingleJurist/DigestaJuristDigesta/DigestaJuristDigesta";
import ErrorPage from "./routes/Error/ErrorPage";
import {action as searchTextAction} from "./routes/digesta_LOOKUP/DigestaLookUp"
import DigestaLexViewer, { loader as lexLoader } from "./components/DigestaLexViewer/DigestaLexViewer";
import DigestaJursitOpera, { loader as operaLoader } from "./routes/digesta_AUTH/DigestSingleJurist/DigestaJuristOpera/DigestaJursitOpera";


const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Layout/>,
            errorElement: <ErrorPage/>,
            children: [
                {
                    path: '/',
                    element: <Main/>,
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
                                    path: "opera/:jurysta_id",
                                    element: <DigestaJursitOpera/>,
                                    loader: operaLoader,
                                    children: [
                                        {
                                            path: ':opus_id',
                                            element: <DigestaJuristOpus/>,
                                            loader: opusLoader,
                                            children: [
                                                {
                                                    path: ':lex_id',
                                                    element: <DigestaLexViewer/>,
                                                    loader: lexLoader
                                                }
                                            ]
                                        },
                                    ]
                                },


                                {
                                    path: 'digesta/:jurysta_id',
                                    element: <DigestaJuristDigesta/>,
                                    loader: juristLexLoader,
                                    children: [
                                        {
                                            path: ':lex_id',
                                            element: <DigestaLexViewer/>,
                                            loader: lexLoader
                                        }
                                    ]
                                }


                            ]
                        }
                    ]
                },


                {
                    path: '/digesta',
                    element: <DigestaTrad/>,
                    children: [
                        {
                            path: ':lex_id',
                            element: <DigestaLexViewer/>,
                            loader: lexLoader

                        }
                    ]
                },
                {
                    path: '/wyszukaj',
                    element: <DigestaLookUp/>,
                    action: searchTextAction
                }
            ]

        }
    ]
)


const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadTOC())
    }, [dispatch])
    return (
        <RouterProvider router={router}/>
    )
}

export default App