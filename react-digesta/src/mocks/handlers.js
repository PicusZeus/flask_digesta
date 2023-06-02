import {rest} from "msw";




export const handlers = [

    rest.get(
        process.env.REACT_APP_BASE_API_URL + "api/authors",
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
        "http://api/digesta/books",
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
    )
];
