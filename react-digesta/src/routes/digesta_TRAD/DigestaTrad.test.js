import {render, screen} from "../../../test-utils";
import DigestaTrad from "./DigestaTrad";


import {MemoryRouter} from "react-router-dom";
describe("DigestaTrad", ()=>{
    test("renders correctly TOC", async ()=>{
        render(<MemoryRouter initialEntries={["/digesta"]}><DigestaTrad/></MemoryRouter>)
        const tocHeader = await screen.findByText("Digesta Iustiniani")

        expect(tocHeader).toBeInTheDocument()
    })

})