import {render, screen} from "../../../test-utils";
// import {render, screen} from "@testing-library/react";
import DigestaTrad from "./DigestaTrad";


import {MemoryRouter} from "react-router-dom";
describe("DigestaTrad", ()=>{
    test.only("renders correctly TOC", async ()=>{
        render(<MemoryRouter initialEntries={["/digesta"]}><DigestaTrad/></MemoryRouter>)
        const tocHeader = await screen.findByText("Digesta Iustiniani")

        expect(tocHeader).toBeInTheDocument()
    })
})