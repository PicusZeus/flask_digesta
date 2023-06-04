import {render, screen} from "../../../../test-utils";
import DigestaJuristDigesta from "./DigestaJuristDigesta";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {findByText} from "@testing-library/react";


describe("DigestaJuristDigesta", () => {
    test("renders info digesta toc", async () => {
         render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="jurysci/10246/digesta/10246" replace/>}/>
                    <Route path="jurysci/10246/digesta/:jurysta_id" element={<DigestaJuristDigesta/>}/>
                </Routes>
            </BrowserRouter>
        )

        const showOperaLink = await screen.findByText(/Digesta Iustiniani/i)
        expect(showOperaLink).toBeInTheDocument()
    })
})