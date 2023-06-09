import {render, screen} from '../../../test-utils';
import DigestaSearchViewer from './DigestaSearchViewer';
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";
import {MemoryRouter} from "react-router-dom";

const mockParagraph = {
    id: 1,
    lex: {
        id: 1,
        titulus: {
            book: {
                book_nr: 1
            },
            number: 2, title_lat: 'Titulus'
        },
        address_lat: 'D1234',
    },
    key: 'key',
    text_lat: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};


describe("DigestaSearchViewer", () => {

    test('renders paragraph details', () => {
        render(<DigestaSearchViewer paragraph={mockParagraph} searchedTerm="Lorem" lang="lat"/>);

        const paragraphAddress = screen.getByTestId('address');
        expect(paragraphAddress).toHaveTextContent('D1234');
    });
    test('toggles result visibility when button is clicked', async () => {
        render(
            <MemoryRouter>
                <DigestaSearchViewer paragraph={mockParagraph} searchedTerm="Lorem" lang="lat"/>
            </MemoryRouter>
        );
        const user = userEvent.setup()
        const button = screen.getByRole('button');

        let resultText = screen.queryByText(/ipsum dolor sit amet/i);

        expect(resultText).not.toBeInTheDocument();
        await act(async () => {
            await user.click(button)
        })
        resultText = await screen.findByText(/ipsum dolor sit amet/i)

        expect(resultText).toBeInTheDocument();
    });

    test('renders redirect link when result is shown', async () => {
        render(
            <MemoryRouter>
                <DigestaSearchViewer paragraph={mockParagraph} searchedTerm="Lorem" lang="lat"/>
            </MemoryRouter>
        );
        const user = userEvent.setup()
        const button = screen.getByRole('button');
        await act(async () => {
            await user.click(button)
        })

        const redirectLink = await screen.findByText(/Przejdź do widoku układu Digestów/i);
        expect(redirectLink).toBeInTheDocument();
        expect(redirectLink).toHaveAttribute('href', '/digesta/1/1');
    });
})





