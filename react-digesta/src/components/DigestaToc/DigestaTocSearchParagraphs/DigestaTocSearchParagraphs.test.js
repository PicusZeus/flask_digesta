import {render, screen} from "../../../../test-utils";
import DigestaTocSearchParagraphs from "./DigestaTocSearchParagraphs";
import userEvent from "@testing-library/user-event";
import {findAllByTestId} from "@testing-library/react";

describe("DigestaTocSearchParagraphs", () => {
    const paragraphi = [
             {
            "id": 31,
            "key": "8.",
            "lex": {
                "address_lat": "ZZZ libro singulari enchiridii",
                "address_pl": "POMPONIUS w księdze jedynej Podręcznika",
                "author": {
                    "id": 2,
                    "name": "ZZZ"
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
        },
        {
            "id": 30,
            "key": "8.",
            "lex": {
                "address_lat": "AAA libro singulari enchiridii",
                "address_pl": "POMPONIUS w księdze jedynej Podręcznika",
                "author": {
                    "id": 2,
                    "name": "AAA"
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

    ];
    const searchedTerm = "example";
    const lang = "lat";

    test("renders buttons and title correctly", () => {
        render(
            <DigestaTocSearchParagraphs
                paragraphi={paragraphi}
                searchedTerm={searchedTerm}
                lang={lang}
            />
        );

        const sortByAuthorButton = screen.getByText(/Posortuj według jurystów/i);
        const sortByDigestaButton = screen.getByText(/Posortuj według układu Digestów/i);
        const title = screen.getByText(
            /występuje 2 razy w następujących ustawach i paragrafach/i
        );

        expect(sortByAuthorButton).toBeInTheDocument();
        expect(sortByDigestaButton).toBeInTheDocument();
        expect(title).toBeInTheDocument();
    });

    test("clicking 'Sortuj według jurystów' button sorts paragraphs by author", async () => {
         render(
            <DigestaTocSearchParagraphs
                paragraphi={paragraphi}
                searchedTerm={searchedTerm}
                lang={lang}
            />
        );
        const user = userEvent.setup()

        const sortByAuthorButton = screen.getByText("Posortuj według jurystów");
        await user.click(sortByAuthorButton);

        const leges = await screen.findAllByTestId("address")

        expect(leges[0].textContent).toMatch(/AAA libro singulari enchiridii/i)


    });




});
