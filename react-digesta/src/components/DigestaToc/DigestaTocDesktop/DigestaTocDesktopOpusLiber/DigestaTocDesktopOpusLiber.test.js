import {render, screen} from "../../../../../test-utils";
import DigestaTocDesktopOpusLiber from "./DigestaTocDesktopOpusLiber";
import {waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {MemoryRouter} from "react-router-dom";
import {act} from "react-dom/test-utils";



describe("DigestaTocDesktopOpusLiber", () => {


    test("renders liber information correctly", async () => {
        render(
            <DigestaTocDesktopOpusLiber
                liber={{id: 1, liber: "4"}}
                libriLength={1}
                lexPath="/path/to/lex"
            />
        );

        // Assert liber information
        await waitFor(() => {
            const lib1 = screen.getByText(/Liber 4/i)
            expect(lib1).toBeInTheDocument()
        })
    })


    test("renders leges when liber is selected and doesnt render leges when unselected", async () => {
        render(
            <MemoryRouter>
                <DigestaTocDesktopOpusLiber
                    liber={{id: 1, liber: "4"}}
                    libriLength={1}
                    lexPath="/path/to/lex"
                />
            </MemoryRouter>
        );
        const user = userEvent.setup()

        let lex1 = screen.queryByText('D.32.1.12')
        let lex2 = screen.queryByText('D.34.1.22')

        expect(lex1).not.toBeInTheDocument()

        // Click on the liber button to select it
        const liber = await screen.findByRole('button', {name:"Liber 4"})
        await act(async () => {
            await user.click(liber);
        })

        await waitFor(() => {
            lex1 = screen.getByText("D.32.1.12")
            lex2 = screen.getByText("D.34.1.22")
            expect(lex1).toBeInTheDocument()
            expect(lex2).toBeInTheDocument()
        })


    });


});
