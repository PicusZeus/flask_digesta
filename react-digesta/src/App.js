import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./routes/layout/Layout";
import Main from "./routes/main/Main";
import DigestaJurists from "./routes/digesta_JURIST/DigestaJurists/DigestaJurists";
import DigestaTrad from "./routes/digesta_TRAD/DigestaTrad";
import DigestaLookUp from "./routes/digesta_LOOKUP/DigestaLookUp";
import DigestaJurist from "./routes/digesta_JURIST/DigestaJurist/DigestaJurist";
import DigestaJuristDigesta, {
    loader as juristBooksLoader
} from "./routes/digesta_JURIST/DigestaJuristDigesta/DigestaJuristDigesta";
import ErrorPage from "./routes/Error/ErrorPage";
import DigestaLexViewer, {loader as lexLoader} from "./components/DigestaLexViewer/DigestaLexViewer";
import DigestaJuristOpera, {
    loader as digestaJuristOperaLoader
} from "./routes/digesta_JURIST/DigestaJuristOpera/DigestaJuristOpera";
import DigestaOpera, {loader as operaLoader} from "./routes/digesta_OPERA/DigestaOpera";
import {
    loader as paragraphusLoader
} from "./components/DigestaParagraphusViewer/DigestaParagraphusViewerRouterWrapper/DigestaParagraphusViewerRouterWrapper";
import {loader as juristLoader} from "./routes/digesta_JURIST/DigestaJurist/DigestaJurist";
import {loader as digestaLoader} from "./routes/digesta_TRAD/DigestaTrad";
import {loader as juristsLoader} from "./routes/digesta_JURIST/DigestaJurists/DigestaJurists"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import DigestaParagraphusViewerRouterWrapper
    from "./components/DigestaParagraphusViewer/DigestaParagraphusViewerRouterWrapper/DigestaParagraphusViewerRouterWrapper";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import DigestaStats from "./routes/digesta_STATS/DigestaStats/DigestaStats";
import DigestaStatsDigesta from "./routes/digesta_STATS/DigestaStatsDigesta/DigestaStatsDigesta";
import BookStats from "./components/DigestaStatistics/BookStats/BookStats";
import TitulusStats from "./components/DigestaStatistics/TitulusStats/TitulusStats";
import DigestaStatsJurists from "./routes/digesta_STATS/DigestaStatsJurists/DigestaStatsJurists";
import JuristStats from "./components/DigestaStatistics/JuristStats/JuristStats";
import DigestaStatsOpera from "./routes/digesta_STATS/DigestaStatsOpera/DigestaStatsOpera";
import OpusStats from "./components/DigestaStatistics/OpusStats/OpusStats";
import {loader as digestaStatsLoader} from "./routes/digesta_STATS/DigestaStatsDigesta/DigestaStatsDigesta";
import {loader as bookStatsLoader} from "./components/DigestaStatistics/BookStats/BookStats";

const queryClient = new QueryClient()

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
                    path: '/statystyki',
                    element: <DigestaStats/>,
                    children: [
                        {
                            path: "digesta",
                            element: <DigestaStatsDigesta/>,
                            loader: digestaStatsLoader(queryClient)
                        },
                        {
                            path: "digesta/libri/:book_id",
                            element: <BookStats/>,
                            loader: bookStatsLoader(queryClient)
                        },
                        {
                            path: "digesta/tituli/:titulus_id",
                            element: <TitulusStats/>
                        },
                        {
                            path: "jurysci",
                            element: <DigestaStatsJurists/>,
                            children: [
                                {
                                    path: ":jurysta_id",
                                    element: <JuristStats/>
                                }
                            ]
                        },
                        {
                            path: 'opera',
                            element: <DigestaStatsOpera/>,
                            children: [
                                {
                                    path: ":opus_id",
                                    element: <OpusStats/>
                                }
                            ]

                        }
                    ]

                },
                {
                    path: '/jurysci',
                    element: <DigestaJurists/>,
                    loader: juristsLoader(queryClient),
                    children: [
                        {
                            path: 'digesta/:jurysta_id',
                            element: <DigestaJuristDigesta/>,
                            loader: juristBooksLoader(queryClient),
                            children: [


                                {
                                    path: ':lex_id',
                                    element: <DigestaLexViewer/>,
                                    loader: lexLoader(queryClient),
                                    children: [
                                        {
                                            path: ':paragraphus_id',
                                            element: <DigestaParagraphusViewerRouterWrapper/>,
                                            loader: paragraphusLoader(queryClient)
                                        }
                                    ]
                                }]
                        },
                        {

                            path: "opera/:jurysta_id",
                            element: <DigestaJuristOpera/>,
                            loader: digestaJuristOperaLoader(queryClient),
                            children: [
                                {
                                    path: ':lex_id',
                                    element: <DigestaLexViewer/>,
                                    loader: lexLoader(queryClient),
                                    children: [
                                        {
                                            path: ':paragraphus_id',
                                            element: <DigestaParagraphusViewerRouterWrapper/>,
                                            loader: paragraphusLoader(queryClient)
                                        }
                                    ]

                                },
                            ]

                        },


                        {
                            path: ':jurysta_id',
                            element: <DigestaJurist/>,
                            loader: juristLoader(queryClient),
                            children: [

                                {
                                    path: "opera/:jurysta_id",
                                    element: <DigestaJuristOpera/>,
                                    loader: digestaJuristOperaLoader(queryClient),

                                },


                                {
                                    path: 'digesta/:jurysta_id',
                                    element: <DigestaJuristDigesta/>,
                                    loader: juristBooksLoader(queryClient),

                                }


                            ]
                        }
                    ]
                },


                {
                    path: '/digesta',
                    element: <DigestaTrad/>,
                    loader: digestaLoader(queryClient),
                    children: [
                        {
                            path: ':lex_id',
                            element: <DigestaLexViewer/>,
                            loader: lexLoader(queryClient),
                            children: [
                                {
                                    path: ':paragraphus_id',
                                    element: <DigestaParagraphusViewerRouterWrapper/>,
                                    loader: paragraphusLoader(queryClient)
                                }
                            ]

                        }
                    ]
                },
                {
                    path: '/opera',
                    element: <DigestaOpera/>,
                    loader: operaLoader(queryClient),
                    children: [
                        {
                            path: ':lex_id',
                            element: <DigestaLexViewer/>,
                            loader: lexLoader(queryClient),
                            children: [
                                {
                                    path: ':paragraphus_id',
                                    element: <DigestaParagraphusViewerRouterWrapper/>,
                                    loader: paragraphusLoader(queryClient)
                                }
                            ]
                        }
                    ]
                },
                {
                    path: '/wyszukaj',
                    element: <DigestaLookUp/>,
                    // action: searchTextAction
                }
            ]

        }
    ]
)


const App = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
            <ReactQueryDevtools/>
        </QueryClientProvider>


    )
}

export default App