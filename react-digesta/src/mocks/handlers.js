import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost/api/authors", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1660, name: "ABURNIUS VALENS" },
        { id: 1664, name: "ABURNIUS VoLENS" },
      ])
    );
  }),

  rest.get("http://localhost/api/digesta/books", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          book_latin_name: "LIBER PRIMUS",
          book_nr: 1,
          book_polish_name: "KSIĘGA PIERWSZA",
          id: 1,
          tituli: [
            {
              id: 1,
              number: 1,
              title_lat: "DE IUSTITIA ET IURE",
              title_pl: "O SPRAWIEDLIWOŚCI I PRAWIE",
            },
          ],
        },
      ])
    );
  }),
  rest.get("http://localhost/api/stats/digesta/opera", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          author: {
            id: 1,
            name: "ULPIANUS",
          },
          coverage: 0.1028,
          id: 1,
          title_lat: "Libri institutionum",
          title_pl: "Instytucji",
        },
      ])
    );
  }),
  rest.get("http://localhost/api/stats/digesta/jurists", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          authorship: 0.2389,
          id: 3,
          name: "FLORENTINUS",
        },
      ])
    );
  }),
  rest.get("http://localhost/api/stats/digesta/books", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          book_latin_name: "LIBER PRIMUS",
          book_nr: 1,
          book_polish_name: "KSIĘGA PIERWSZA",
          id: 1,
          share: 1.7323,
        },
      ])
    );
  }),
  rest.get("http://localhost/api/opera", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          author: {
            id: 8,
            name: "MARCIANUS",
          },
          id: 4736,
          libri: [
            {
              id: 4736,
              liber: "in libro secundo de adulteriis Papiniani",
            },
          ],
          title_lat: "Adnotationes",
          title_pl:
            "uwaga w księdze drugiej monografii Papinianusa o cudzołóstwie",
        },
      ])
    );
  }),
  rest.post("http://localhost/api/digesta/lat", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 30,
          key: "8.",
          lex: {
            address_lat: "POMPONIUS libro singulari enchiridii",
            address_pl: "POMPONIUS w księdze jedynej Podręcznika",
            author: {
              id: 2,
              name: "POMPONIUS",
            },
            id: 14,
            lex_nr: "2",
            titulus: {
              book: {
                book_latin_name: "LIBER PRIMUS",
                book_nr: 1,
                book_polish_name: "KSIĘGA PIERWSZA",
                id: 1,
              },
              id: 2,
              number: 2,
              title_lat:
                "DE ORIGINE IURIS ET OMNIUM MAGISTRATUUM ET SUCCESSIONE PRUDENTIUM",
              title_pl:
                "O POCHODZENIU PRAWA I WSZYSTKICH URZĘDÓW ORAZ O ROZWOJU NAUKI PRAWA",
            },
          },
          text_lat:
            " Deinde cum esset in civitate lex duodecim tabularum et ius civile, essent et legis actiones, evenit, ut plebs in discordiam cum patribus perveniret et secederet sibique iura constitueret, quae iura plebi scita vocantur. mox cum revocata est plebs, quia multae discordiae nascebantur de his plebis scitis, pro legibus placuit et ea observari lege Hortensia: et ita factum est, ut inter plebis scita et legem species constituendi interesset, potestas autem eadem esset.",
          text_pl: "",
        },
      ])
    );
  }),
  rest.get("http://localhost/api/opera/jurist/18", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          author: {
            id: 18,
            name: "CELSUS",
          },
          id: 8039,
          libri: [
            {
              id: 8039,
              liber: "5",
            },
          ],
          title_lat: "Libri de omnibus tribunalibus",
          title_pl: "O wszystkich sądach",
        },
      ])
    );
  }),
  rest.get(
    "http://localhost/api/digesta/books/author/10246",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            book_latin_name: "LIBER PRIMUS",
            book_nr: 1,
            book_polish_name: "KSIĘGA PIERWSZA",
            id: 1,
          },
        ])
      );
    }
  ),
  rest.get(
    "http://localhost/api/digesta/tituli/author/1/10246",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]));
    }
  ),
  rest.get(
    "http://localhost/api/digesta/tituli/author/2/1",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]));
    }
  ),
  rest.get(
    "http://localhost/api/digesta/tituli/author/1/1",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          { id: 1, number: 1, title_lat: "Titulus 1" },
          { id: 2, number: 2, title_lat: "Titulus 2" },
        ])
      );
    }
  ),
  rest.get("http://localhost/api/authors/10246", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        authorship: 0.5617,
        description:
          "Alfenus Varus żył około I wieku p.n.e., był on uczniem Serwiusza Sulpicjusza Rufusa i jedynym uczniem Serwiusza. Nic o nim nie wiadomo poza historią zachowaną przez scholialistę Heleniusa Acrona, w jego notatkach na temat satyr Horacego. Miał pochodzić z Cremony, przybył do Rzymu, aby zostać uczniem Serwiusza, osiągnął godność konsulatu i został uhonorowany publicznym pogrzebem. Pomponius stwierdza również, że Varus osiągnął konsulat, ale to nie dowodzi, że reszta historii scholiasty jest prawdziwa.",
        flourished_end: 0,
        flourished_start: -100,
        id: 2198,
        name: "ALFENUS VARUS",
      })
    );
  }),
  rest.get("http://localhost/api/comment/comments/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          comment: "testComment12",
          date: "2023-06-05T22:02:53.848813",
          id: 26,
          likes: [],
          private: false,
          user: {
            id: 1,
            username: "picus",
          },
        },
        {
          comment: "testComment13",
          date: "2023-06-05T22:02:53.848813",
          id: 27,
          likes: [],
          private: true,
          user: {
            id: 1,
            username: "picus",
          },
        },
        {
          comment: "testComment14",
          date: "2023-06-05T22:02:53.848813",
          id: 28,
          likes: [],
          private: false,
          user: {
            id: 1,
            username: "picus",
          },
        },
      ])
    );
  }),
  rest.post("http://localhost/api/like", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
  rest.get("http://localhost/api/comment/comments/28", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
  rest.get("http://localhost/api/comment/comments/27", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
  rest.get("http://localhost/api/comment/comments/26", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
  rest.delete("http://localhost/api/comment/26", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
  rest.post("http://localhost/api/comment/paragraphus/0", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
  rest.post("http://localhost/api/comment/paragraphus/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
  rest.get("http://localhost/api/digesta/titulus/leges/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          lex_nr: "1",
          paragraphi: [
            {
              id: 2,
              key: "1.",
            },
            {
              id: 3,
              key: "2.",
            },
            {
              id: 4,
              key: "3.",
            },
            {
              id: 5,
              key: "4.",
            },
            {
              id: 1,
              key: "pr",
            },
          ],
        },
      ])
    );
  }),
  rest.get("http://localhost/api/digesta/opus/leges/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 5566,
          lex_nr: "22",
          paragraphi: [
            {
              id: 11335,
              key: "1.",
            },
            {
              id: 11334,
              key: "pr",
            },
          ],
          titulus: {
            book: {
              book_latin_name: "LIBER TRIGESIMUS QUARTUS",
              book_nr: 34,
              book_polish_name: "KSIĘGA TRZYDZIESTA CZWARTA",
              id: 40,
            },
            id: 344,
            number: 1,
            title_lat: "ALIMENTIS VEL CIBARIIS LEGATIS",
            title_pl: "O ZAPISACH ŚRODKÓW UTRZYMANIA LUB POŻYWIENIA",
          },
        },
        {
          id: 5247,
          lex_nr: "12",
          paragraphi: [
            {
              id: 10599,
              key: "pr",
            },
          ],
          titulus: {
            book: {
              book_latin_name: "LIBER TRIGESIMUS SECUNDUS",
              book_nr: 32,
              book_polish_name: "KSIĘGA TRZYDZIESTA DRUGA",
              id: 38,
            },
            id: 333,
            number: 1,
            title_lat: "DE LEGATIS ET FIDEICOMMISSIS",
            title_pl: "O ZAPISACH I FIDEIKOMISACH",
          },
        },
      ])
    );
  }),
  rest.get(
    "http://localhost/api/digesta/titulus/leges/author/1/1",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          { id: 1, lex_nr: "1", paragraphi: [] },
          { id: 2, lex_nr: "2", paragraphi: [] },
        ])
      );
    }
  ),
  rest.get("http://localhost/api/digesta/leges/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        address_lat: "ULPIANUS libro primo institutionum",
        address_pl: "ULPIANUS w księdze pierwszej Instytucji",
        author: {
          id: 1,
          name: "ULPIANUS",
        },
        id: 1,
        lex_nr: "1",
        opus: {
          id: 1,
          liber: "1",
          opus: {
            id: 1,
            title_lat: "Libri institutionum",
            title_pl: "Instytucji",
          },
        },
        paragraphi: [
          {
            id: 2,
            key: "1.",
            text_lat:
              " Cuius merito quis nos sacerdotes appellet: iustitiam namque colimus et boni et aequi notitiam profitemur, aequum ab iniquo separantes, licitum ab illicito discernentes, bonos non solum metu poenarum, verum etiam praemiorum quoque exhortatione efficere cupientes, veram nisi fallor philosophiam, non simulatam affectantes.",
            text_pl: "",
          },
          {
            id: 3,
            key: "2.",
            text_lat:
              " Huius studii duae sunt positiones, publicum et privatum. publicum ius est quod ad statum rei Romanae spectat, privatum quod ad singulorum utilitatem: sunt enim quaedam publice utilia, quaedam privatim. publicum ius in sacris, in sacerdotibus, in magistratibus constitit. privatum ius tripertitum est: collectum etenim est ex naturalibus praeceptis aut gentium aut civilibus.",
            text_pl: "",
          },

          {
            id: 1,
            key: "pr",
            text_lat:
              " Iuri operam daturum prius nosse oportet, unde nomen iuris descendat. est autem a iustitia appellatum: nam, ut eleganter Celsus definit, ius est ars boni et aequi.",
            text_pl: "",
          },
        ],
        titulus: {
          book: {
            book_latin_name: "LIBER PRIMUS",
            book_nr: 1,
            book_polish_name: "KSIĘGA PIERWSZA",
            id: 1,
          },
          id: 1,
          number: 1,
          title_lat: "DE IUSTITIA ET IURE",
          title_pl: "O SPRAWIEDLIWOŚCI I PRAWIE",
        },
      })
    );
  }),
  rest.get("http://localhost/api/digesta/paragraphi/2", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 2,
        key: "1.",
        text_lat:
          " Cuius merito quis nos sacerdotes appellet: iustitiam namque colimus et boni et aequi notitiam profitemur, aequum ab iniquo separantes, licitum ab illicito discernentes, bonos non solum metu poenarum, verum etiam praemiorum quoque exhortatione efficere cupientes, veram nisi fallor philosophiam, non simulatam affectantes.",
        text_pl: "",
      })
    );
  }),
  rest.get("http://localhost/api/comment/paragraphus/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, user: { id: 1, username: "testUser" }, likes: [] },
        {
          id: 2,
          user: { id: 1, username: "testUser" },
          likes: [],
        },
      ])
    );
  }),
  rest.get("http://localhost/api/comment/comments/2", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          comment: "testComment12",
          date: "2023-06-05T22:02:53.848813",
          id: 444,
          likes: [],
          private: false,
          user: {
            id: 1,
            username: "picus",
          },
        },
      ])
    );
  }),
  rest.get("http://localhost/api/comment/comments/444", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
  rest.get("http://localhost/api/stats/digesta/books/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        book: {
          book_latin_name: "LIBER PRIMUS",
          book_nr: 1,
          book_polish_name: "KSIĘGA PIERWSZA",
          id: 1,
        },

        jurists_authorship: [
          {
            author: {
              id: 3,
              name: "FLORENTINUS",
            },
            authorship: 0.7004,
            id: 1,
          },
        ],
        opera_coverage: [
          {
            coverage: 3.7553,
            id: 1,
            opus: {
              author: {
                id: 1,
                name: "ULPIANUS",
              },
              id: 1,
              title_lat: "Libri institutionum",
              title_pl: "Instytucji",
            },
          },
        ],
        tituli_book_share: [
          {
            book_share: 6.4176,
            id: 3,
            number: 3,
            title_lat: "DE LEGIBUS SENATUSQUE CONSULTIS ET LONGA CONSUETUDINE",
            title_pl: "O USTAWACH, UCHWAŁACH SENATU I DŁUGOTRWAŁYM ZWYCZAJU",
          },
        ],
      })
    );
  }),
  rest.get(
    "http://localhost/api/stats/digesta/jurists/1/1",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          author: {
            name: "Author Name",
          },
          book: {
            book_nr: 3,
          },
          tituli: [],
          opera: {},
        })
      );
    }
  ),
  rest.get("http://localhost/api/stats/digesta/jurists/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        jurist: { name: "Ulpianus" },
        books: [],
        opera: [],
      })
    );
  }),
  rest.get(
    "http://localhost/api/stats/digesta/jurists/1/1/1",

    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          author: { name: "Ulpianus" },
          titulus: {
            titulus: {
              book: { book_nr: "1" },
              number: "1",
              title_lat: "Lorem Ipsum",
            },
          },
          opera: [],
        })
      );
    }
  ),
  rest.get("http://localhost/api/stats/digesta/opera/1/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        opus: { title_lat: "opus", author: { name: "ULPIANUS" } },
        book: { book_nr: "1" },
        tituli: [],
      })
    );
  }),
  rest.get("http://localhost/api/stats/digesta/opera/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        opus: { title_lat: "opus", author: { name: "ULPIANUS" } },
        books: [],
      })
    );
  }),
  rest.get("http://localhost/api/stats/digesta/tituli/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        titulus: {
          book: { book_nr: 1 },
          number: 1,
          title_lat: "Titulus",
        },
        jurists_authorship: [{ authorship: 10, jurist: { name: "SCAEVOLA" } }],
        opera_coverage: [{ coverage: 8, opera: { title: "opus" } }],
      })
    );
  }),
  rest.get("localhost/api/stats/digesta/books", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
];
