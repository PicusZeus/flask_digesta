import {render, screen} from "../../../../test-utils";
import DigestaJurists from "./DigestaJurists";
import {MemoryRouter} from "react-router-dom";


describe('DigestaJurists', ()=>{
    test("renders correctly toc", async ()=>{
        render(<MemoryRouter>
            <DigestaJurists/>
        </MemoryRouter>)
        const headerForToc = await screen.findByRole('heading', {name: /digestach/i})
        expect(headerForToc).toBeInTheDocument()
    })
})