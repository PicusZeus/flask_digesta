import {render} from "../../../../test-utils";
import DigestaParagraphusViewerRouterWrapper from "./DigestaParagraphusViewerRouterWrapper";
import DigestaParagraphusViewer from "../DigestaParagraphusViewer";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import DigestaLexViewer from "../../DigestaLexViewer/DigestaLexViewer";
import {screen, waitFor} from "@testing-library/react";

jest.mock("../DigestaParagraphusViewer", () => jest.fn())


describe("DigestaParagraphusViewerRouterWrapper", () => {
    test("renders spinner while fetching data", ()=>{
               render(<BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/digesta/1/2" replace/>}/>
                <Route path="/digesta/:lex_id/:paragraphus_id" element={<DigestaParagraphusViewerRouterWrapper/>}/>
            </Routes>
        </BrowserRouter>)

        const spinner = screen.getByTestId('spinner')
        expect(spinner).toBeInTheDocument()
    })
    test('fetches data and renders DigestaParagraphusViewer', async () => {
        const mockParagraphusViewer = jest.fn()
        DigestaParagraphusViewer.mockImplementation(mockParagraphusViewer)
        render(<BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/digesta/1/2" replace/>}/>
                <Route path="/digesta/:lex_id/:paragraphus_id" element={<DigestaParagraphusViewerRouterWrapper/>}/>
            </Routes>
        </BrowserRouter>)

        await waitFor(() => {
            expect(mockParagraphusViewer).toHaveBeenCalledWith({
                    "paragraphus":
                        {
                            "id": 2,
                            "key": "1.",
                            "text_lat": " Cuius merito quis nos sacerdotes appellet: iustitiam namque colimus et boni et aequi notitiam profitemur, aequum ab iniquo separantes, licitum ab illicito discernentes, bonos non solum metu poenarum, verum etiam praemiorum quoque exhortatione efficere cupientes, veram nisi fallor philosophiam, non simulatam affectantes.",
                            "text_pl": ""
                        }
                }, {}
            )
        })

    })
})