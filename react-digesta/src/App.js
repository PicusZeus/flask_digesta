import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./routes/layout/Layout";
import Main from "./routes/main/Main";
import DigestaJurists from "./routes/digesta_JURIST/DigestaJurists/DigestaJurists";
import DigestaTrad from "./routes/digesta_TRAD/DigestaTrad";
import DigestaLookUp from "./routes/digesta_LOOKUP/DigestaLookUp";
import React, {useEffect} from "react";
import {loadJurists, loadTOC} from "./store/digesta-actions";
import {useDispatch} from "react-redux";
import DigestaJurist from "./routes/digesta_JURIST/DigestaJurist/DigestaJurist";
import DigestaJuristDigesta, {
    loader as juristLexLoader
} from "./routes/digesta_JURIST/DigestaJuristDigesta/DigestaJuristDigesta";
import ErrorPage from "./routes/Error/ErrorPage";
import {action as searchTextAction} from "./routes/digesta_LOOKUP/DigestaLookUp"
import DigestaLexViewer, {loader as lexLoader} from "./components/DigestaLexViewer/DigestaLexViewer";
import DigestaJuristOpera, {
    loader as digestaJuristOperaLoader
} from "./routes/digesta_JURIST/DigestaJuristOpera/DigestaJuristOpera";
import DigestaOpera, {loader as operaLoader} from "./routes/digesta_OPERA/DigestaOpera";
import DigestaParagraphusViewer, {loader as paragraphusLoader} from "./components/DigestaParagraphusViewer/DigestaParagraphusViewer";


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
                                    element: <DigestaJuristOpera/>,
                                    loader: digestaJuristOperaLoader,
                                    children: [
                                        {
                                            path: ':lex_id',
                                            element: <DigestaLexViewer/>,
                                            loader: lexLoader,
                                            children: [
                                                {
                                                    path: ':paragraphus_id',
                                                    element: <DigestaParagraphusViewer/>,
                                                    loader: paragraphusLoader
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
                                            loader: lexLoader,
                                            children: [
                                                {
                                                    path: ':paragraphus_id',
                                                    element: <DigestaParagraphusViewer/>,
                                                    loader: paragraphusLoader
                                                }
                                            ]
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
                            loader: lexLoader,
                            children: [
                                {
                                    path: ':paragraphus_id',
                                    element: <DigestaParagraphusViewer/>,
                                    loader: paragraphusLoader
                                }
                            ]

                        }
                    ]
                },
                {
                    path: '/opera',
                    element: <DigestaOpera/>,
                    loader: operaLoader,
                    children: [
                        {
                            path: ':lex_id',
                            element: <DigestaLexViewer/>,
                            loader: lexLoader,
                            children: [
                                {
                                    path: ':paragraphus_id',
                                    element: <DigestaParagraphusViewer/>,
                                    loader: paragraphusLoader
                                }
                            ]
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
        dispatch(loadJurists())
    }, [dispatch])
    return (
        <RouterProvider router={router}/>
    )
}

export default App