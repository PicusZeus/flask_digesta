import {render, screen} from "../../../../../test-utils";
import DigestaTocMobileOpusLiber from './DigestaTocMobileOpusLiber';
import {MemoryRouter, useNavigate} from "react-router-dom";
import userEvent from "@testing-library/user-event";

jest.mock("react-router-dom", () => {
    return {
        ...jest.requireActual("react-router-dom"),
        useNavigate: jest.fn()
    }
})

describe('DigestaTocMobileOpusLiber', () => {
    test('renders the component with options', async () => {


        render(<MemoryRouter>
                <DigestaTocMobileOpusLiber
                    liber={{id: 1}}
                    lexPath="/lex/"
                />
            </MemoryRouter>
        );

        // Verify that the component is rendered
        const option = await screen.findByRole('option', {name: 'Wybierz fragment'});
        expect(option).toBeInTheDocument()
    });

    test('calls the navigate function on option change', async () => {
        const mockNavigate = jest.fn()
        useNavigate.mockImplementation(() => mockNavigate)


        render(
            <MemoryRouter>
                <DigestaTocMobileOpusLiber
                    liber={{id: 1}}
                    lexPath="/lex/"
                />
            </MemoryRouter>
        );
        const user = userEvent.setup()

        // Change the option
        const select = await screen.findByRole('combobox');
        await user.selectOptions(select, "5566")

        // Verify that the navigate function is called with the correct value
        expect(mockNavigate).toHaveBeenCalledWith('/lex/5566');
    });
});
