import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./routes/layout/Layout";
import Main from "./routes/main/Main";
import DigestaJurists from "./routes/digesta_JURIST/DigestaJurists";
import DigestaTrad from "./routes/digesta_TRAD/DigestaTrad";
import DigestaLookUp from "./routes/digesta_LOOKUP/DigestaLookUp";
import React, {useEffect} from "react";
import {loadTOC} from "./store/digesta-actions";
import {useDispatch} from "react-redux";
import DigestaJurist from "./routes/digesta_JURIST/DigestaJurist/DigestaJurist";
import DigestaJuristOpus, { loader as opusLoader } from "./routes/digesta_JURIST/DigestaJuristOpus/DigestaJuristOpus";
import DigestaJuristDigesta, { loader as juristLexLoader } from "./routes/digesta_JURIST/DigestaJuristDigesta/DigestaJuristDigesta";
import ErrorPage from "./routes/Error/ErrorPage";
import {action as searchTextAction} from "./routes/digesta_LOOKUP/DigestaLookUp"
import DigestaLexViewer, { loader as lexLoader } from "./components/DigestaLexViewer/DigestaLexViewer";
import DigestaJursitOpera, { loader as operaLoaderi } from "./routes/digesta_JURIST/DigestaJuristOpera/DigestaJursitOpera";
import DigestaOpera, { loader as operaLoader } from "./routes/digesta_OPERA/DigestaOpera";


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
                    element: <DigestaJurists/>,
                    children: [
                        {
                            path: ':jurysta_id',
                            element: <DigestaJurist/>,
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
                    path: '/opera',
                    element: <DigestaOpera/>,
                    loader: operaLoader
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