import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./routes/layout/Layout";
import Main from "./routes/main/Main";
import DigestaJurists, {loader as digestaJuristsLoader} from "./routes/digesta_JURIST/DigestaJurists/DigestaJurists";
import DigestaTrad, {loader as digestaTradLoader} from "./routes/digesta_TRAD/DigestaTrad";
import DigestaLookUp from "./routes/digesta_LOOKUP/DigestaLookUp";
import DigestaJurist, {loader as digestaJuristLoader} from "./routes/digesta_JURIST/DigestaJurist/DigestaJurist";
import DigestaJuristDigesta, {
    loader as digestaJuristDigestaLoader
} from "./routes/digesta_JURIST/DigestaJuristDigesta/DigestaJuristDigesta";
import ErrorPage from "./routes/Error/ErrorPage";
import DigestaLexViewer, {loader as digestaLexLoader} from "./components/DigestaLexViewer/DigestaLexViewer";
import DigestaJuristOpera, {
    loader as digestaJuristOperaLoader
} from "./routes/digesta_JURIST/DigestaJuristOpera/DigestaJuristOpera";
import DigestaOpera, {loader as digestaOperaLoader} from "./routes/digesta_OPERA/DigestaOpera";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import DigestaParagraphusViewerRouterWrapper, {loader as digestaParagraphusViewerRouterWrapper}
    from "./components/DigestaParagraphusViewer/DigestaParagraphusViewerRouterWrapper/DigestaParagraphusViewerRouterWrapper";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import DigestaStats from "./routes/digesta_STATS/DigestaStats/DigestaStats";
import DigestaStatsDigesta, {
    loader as digestaStatsDigestaLoader
} from "./routes/digesta_STATS/DigestaStatsDigesta/DigestaStatsDigesta";
import BookStats, {loader as bookStatsLoader} from "./components/DigestaStatistics/BookStats/BookStats";
import TitulusStats, {loader as titulusStatsLoader} from "./components/DigestaStatistics/TitulusStats/TitulusStats";
import DigestaStatsJurists, {
    loader as digestaStatsJuristsLoader
} from "./routes/digesta_STATS/DigestaStatsJurists/DigestaStatsJurists";
import JuristStats, {loader as juristStatsLoader} from "./components/DigestaStatistics/JuristStats/JuristStats";
import DigestaStatsOpera, {
    loader as digestaStatsOperaLoader
} from "./routes/digesta_STATS/DigestaStatsOpera/DigestaStatsOpera";
import OpusStats, {loader as opusStatsLoader} from "./components/DigestaStatistics/OpusStats/OpusStats";
import JuristBookStats, {
    loader as juristBookStatsLoader
} from "./components/DigestaStatistics/JuristBookStats/JuristBookStats";
import OpusBookStats, {loader as opusBookStatsLoader} from "./components/DigestaStatistics/OpusBookStats/OpusBookStats";
import JuristTitulusStats, {
    loader as juristTitulusStatsLoader
} from "./components/DigestaStatistics/JuristTitulusStats/JuristTitulusStats";

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
                    element: <DigestaStats/>

                },
                {
                    path: "/statystyki/digesta",
                    element: <DigestaStatsDigesta/>,
                    loader: digestaStatsDigestaLoader(queryClient)
                },
                {
                    path: "/statystyki/digesta/libri/:book_id",
                    element: <BookStats/>,
                    loader: bookStatsLoader(queryClient)
                },
                {
                    path: "/statystyki/digesta/tituli/:titulus_id",
                    element: <TitulusStats/>,
                    loader: titulusStatsLoader(queryClient)
                },
                {
                    path: "/statystyki/jurysci",
                    element: <DigestaStatsJurists/>,
                    loader: digestaStatsJuristsLoader(queryClient)

                },
                {
                    path: "/statystyki/jurysci/:jurysta_id",
                    element: <JuristStats/>,
                    loader: juristStatsLoader(queryClient)
                },
                {
                    path: "/statystyki/jurysci/:jurysta_id/:book_id",
                    element: <JuristBookStats/>,
                    loader: juristBookStatsLoader(queryClient)
                },
                {
                    path: "/statystyki/jurysci/:jurysta_id/:book_id/:titulus_id",
                    element: <JuristTitulusStats/>,
                    loader: juristTitulusStatsLoader(queryClient)
                },
                {
                    path: '/statystyki/opera',
                    element: <DigestaStatsOpera/>,
                    loader: digestaStatsOperaLoader(queryClient)
                },
                {
                    path: "/statystyki/opera/:opus_id",
                    element: <OpusStats/>,
                    loader: opusStatsLoader(queryClient)
                },
                {
                    path: "/statystyki/opera/:opus_id/:book_id",
                    element: <OpusBookStats/>,
                    loader: opusBookStatsLoader(queryClient)
                },
                {
                    path: '/jurysci',
                    element: <DigestaJurists/>,
                    loader: digestaJuristsLoader(queryClient),
                    children: [
                        {
                            path: 'digesta/:jurysta_id',
                            element: <DigestaJuristDigesta/>,
                            loader: digestaJuristDigestaLoader(queryClient),
                            children: [
                                {
                                    path: ':lex_id',
                                    element: <DigestaLexViewer/>,
                                    loader: digestaLexLoader(queryClient),
                                    children: [
                                        {
                                            path: ':paragraphus_id',
                                            element: <DigestaParagraphusViewerRouterWrapper/>,
                                            loader: digestaParagraphusViewerRouterWrapper(queryClient)
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
                                    loader: digestaLexLoader(queryClient),
                                    children: [
                                        {
                                            path: ':paragraphus_id',
                                            element: <DigestaParagraphusViewerRouterWrapper/>,
                                            loader: digestaParagraphusViewerRouterWrapper(queryClient)
                                        }
                                    ]

                                },
                            ]

                        },


                        {
                            path: ':jurysta_id',
                            element: <DigestaJurist/>,
                            loader: digestaJuristLoader(queryClient),
                            children: [
                                {
                                    path: "opera/:jurysta_id",
                                    element: <DigestaJuristOpera/>,
                                    loader: digestaJuristOperaLoader(queryClient),
                                },
                                {
                                    path: 'digesta/:jurysta_id',
                                    element: <DigestaJuristDigesta/>,
                                    loader: digestaJuristDigestaLoader(queryClient),
                                }
                            ]
                        }
                    ]
                },
                {
                    path: '/digesta',
                    element: <DigestaTrad/>,
                    loader: digestaTradLoader(queryClient),
                    children: [
                        {
                            path: ':lex_id',
                            element: <DigestaLexViewer/>,
                            loader: digestaLexLoader(queryClient),
                            children: [
                                {
                                    path: ':paragraphus_id',
                                    element: <DigestaParagraphusViewerRouterWrapper/>,
                                    loader: digestaParagraphusViewerRouterWrapper(queryClient)
                                }
                            ]
                        }
                    ]
                },
                {
                    path: '/opera',
                    element: <DigestaOpera/>,
                    loader: digestaOperaLoader(queryClient),
                    children: [
                        {
                            path: ':lex_id',
                            element: <DigestaLexViewer/>,
                            loader: digestaLexLoader(queryClient),
                            children: [
                                {
                                    path: ':paragraphus_id',
                                    element: <DigestaParagraphusViewerRouterWrapper/>,
                                    loader: digestaParagraphusViewerRouterWrapper(queryClient)
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