// import {render, screen} from "../../../test-utils";
import {render, screen} from "@testing-library/react";
import Main from "./Main";
import {MemoryRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App, {Providers} from "../../App";


describe("Main", () => {
    test("renders correctly", () => {
        render(<MemoryRouter initialEntries={['']}><Main/></MemoryRouter>)
        const info = screen.getByText(/Strona, na którą wszedłeś/)
        expect(info).toBeInTheDocument()
    })


    // test.skip('renders links', () => {
    //     render(<Main/>, {wrapper: Routes});
    //
    //
    //     const links = screen.getAllByRole('link', {
    //         name: /przejdź/i
    //     })
    //     expect(links).toHaveLength(5)
    // });
    //
    // test.skip('links forward to correct pages', async () => {
    //     render(<MemoryRouter initialEntries={['/digesta']}><App/></MemoryRouter>);
    //     const links = screen.getAllByRole('link', {
    //         name: /przejdź/i
    //     })
    //
    //     // await userEvent.click(links[0])
    //
    //     // const toc = screen.getByRole('heading', {  name: /digesta iustiniani/i})
    //
    //     expect(links[0]).toHaveAttribute('href', '/digesta')
    //     expect(links[1]).toHaveAttribute('href', '/jurysci')
    //     expect(links[2]).toHaveAttribute('href', '/opera')
    //     expect(links[3]).toHaveAttribute('href', '/Wyszukaj')
    //     expect(links[4]).toHaveAttribute('href', '/statystyki')
    //
    //
    //
    // })
})


