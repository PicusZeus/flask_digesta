import {rest} from "msw";


export const handlers = [

    rest.get(
        "http://localhost/api/authors",
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([
                    {id: 1660, name: "ABURNIUS VALENS"},
                    {id: 1664, name: "ABURNIUS VoLENS"},
                ])
            );
        }
    ),

    rest.get(
        "http://localhost/api/digesta/books",
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([{
                    "book_latin_name": "LIBER PRIMUS",
                    "book_nr": 1,
                    "book_polish_name": "KSIĘGA PIERWSZA",
                    "id": 1,
                    "tituli": [
                        {
                            "id": 1,
                            "number": 1,
                            "title_lat": "DE IUSTITIA ET IURE",
                            "title_pl": "O SPRAWIEDLIWOŚCI I PRAWIE"
                        }

                    ]
                }])
            )
        }
    ),
    rest.get(
        "http://localhost/api/stats/digesta/opera",
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([
                    {
                        "author": {
                            "id": 1,
                            "name": "ULPIANUS"
                        },
                        "coverage": 0.1028,
                        "id": 1,
                        "title_lat": "Libri institutionum",
                        "title_pl": "Instytucji"
                    }
                ])
            )
        }
    ),
    rest.get(
        "http://localhost/api/stats/digesta/jurists",
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([
                    {
                        "authorship": 0.2389,
                        "id": 3,
                        "name": "FLORENTINUS"
                    }
                ])
            )
        }
    ),
    rest.get("http://localhost/api/stats/digesta/books",
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([
                    {
                        "book_latin_name": "LIBER PRIMUS",
                        "book_nr": 1,
                        "book_polish_name": "KSIĘGA PIERWSZA",
                        "id": 1,
                        "share": 1.7323
                    }
                ])
            )
        }
    ),
    rest.get("http://localhost/api/opera",
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([
                    {
                        "author": {
                            "id": 8,
                            "name": "MARCIANUS"
                        },
                        "id": 4736,
                        "libri": [
                            {
                                "id": 4736,
                                "liber": "in libro secundo de adulteriis Papiniani"
                            }
                        ],
                        "title_lat": "Adnotationes",
                        "title_pl": "uwaga w księdze drugiej monografii Papinianusa o cudzołóstwie"
                    }
                ])
            )
        }
    ),
    rest.post(
        "http://localhost/api/digesta/lat",
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([
                    {
                        "id": 30,
                        "key": "8.",
                        "lex": {
                            "address_lat": "POMPONIUS libro singulari enchiridii",
                            "address_pl": "POMPONIUS w księdze jedynej Podręcznika",
                            "author": {
                                "id": 2,
                                "name": "POMPONIUS"
                            },
                            "id": 14,
                            "lex_nr": "2",
                            "titulus": {
                                "book": {
                                    "book_latin_name": "LIBER PRIMUS",
                                    "book_nr": 1,
                                    "book_polish_name": "KSIĘGA PIERWSZA",
                                    "id": 1
                                },
                                "id": 2,
                                "number": 2,
                                "title_lat": "DE ORIGINE IURIS ET OMNIUM MAGISTRATUUM ET SUCCESSIONE PRUDENTIUM",
                                "title_pl": "O POCHODZENIU PRAWA I WSZYSTKICH URZĘDÓW ORAZ O ROZWOJU NAUKI PRAWA"
                            }
                        },
                        "text_lat": " Deinde cum esset in civitate lex duodecim tabularum et ius civile, essent et legis actiones, evenit, ut plebs in discordiam cum patribus perveniret et secederet sibique iura constitueret, quae iura plebi scita vocantur. mox cum revocata est plebs, quia multae discordiae nascebantur de his plebis scitis, pro legibus placuit et ea observari lege Hortensia: et ita factum est, ut inter plebis scita et legem species constituendi interesset, potestas autem eadem esset.",
                        "text_pl": ""
                    }
                ])
            )
        }
    ),
    rest.get(
        "http://localhost/api/opera/jurist/18",
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([
                    {
                        "author": {
                            "id": 18,
                            "name": "CELSUS"
                        },
                        "id": 8039,
                        "libri": [
                            {
                                "id": 8039,
                                "liber": "5"
                            }
                        ],
                        "title_lat": "Libri de omnibus tribunalibus",
                        "title_pl": "O wszystkich sądach"
                    }
                ])
            )
        }
    ),
    rest.get(
        "http://localhost/api/digesta/books/author/10246",
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([
                    {
                        "book_latin_name": "LIBER PRIMUS",
                        "book_nr": 1,
                        "book_polish_name": "KSIĘGA PIERWSZA",
                        "id": 1
                    }
                ])
            )
        }
    ),
    rest.get(
        "http://localhost/api/digesta/tituli/author/1/10246",
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([])
            )
        }
    ),
    rest.get(
        "http://localhost/api/authors/10246",
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    "authorship": 0.5617,
                    "description": "Alfenus Varus żył około I wieku p.n.e., był on uczniem Serwiusza Sulpicjusza Rufusa i jedynym uczniem Serwiusza. Nic o nim nie wiadomo poza historią zachowaną przez scholialistę Heleniusa Acrona, w jego notatkach na temat satyr Horacego. Miał pochodzić z Cremony, przybył do Rzymu, aby zostać uczniem Serwiusza, osiągnął godność konsulatu i został uhonorowany publicznym pogrzebem. Pomponius stwierdza również, że Varus osiągnął konsulat, ale to nie dowodzi, że reszta historii scholiasty jest prawdziwa.",
                    "flourished_end": 0,
                    "flourished_start": -100,
                    "id": 2198,
                    "name": "ALFENUS VARUS"
                })
            )
        }
    ),
    rest.get(
        "api/digesta/tituli/author/56/10246",
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([])
            )
        }
    ),
    rest.get(
        "localhost/api/stats/digesta/jurists",
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([{
                    "book_latin_name": "LIBER PRIMUS",
                    "book_nr": 1,
                    "book_polish_name": "KSIĘGA PIERWSZA",
                    "id": 1,
                    "share": 1.7323
                }])
            )
        }
    ),
    rest.get(
        "localhost/api/stats/digesta/books",
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([])
            )
        }
    )
];
