import {render, screen} from "../../../../../test-utils";
import DigestaTocMobileBooks from "./DigestaTocMobileBooks";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";
import {digestaActions} from "../../../../store/digesta-slice";

jest.mock('react-redux', () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe('DigestaTocMobileBooks', () => {
    beforeEach(() => {
        useSelector.mockClear();
        useDispatch.mockClear();
        useNavigate.mockClear();
    });

    test('renders without errors', () => {
        useSelector.mockReturnValue(false);
        useDispatch.mockReturnValue(jest.fn());
        useNavigate.mockReturnValue(jest.fn());

        render(<DigestaTocMobileBooks toc={[]} url="/"/>);
    });

    test('renders book options correctly', () => {
        const mockToc = [
            {id: 1, book_latin_name: 'Book 1', tituli: [{id: 1, number: 1}, {id: 2, number: 2}]},
            {id: 2, book_latin_name: 'Book 2', tituli: [{id: 3, number: 3}, {id: 4, number: 4}]},
        ];
        useSelector.mockReturnValue(false);
        useDispatch.mockReturnValue(jest.fn());
        useNavigate.mockReturnValue(jest.fn());

        render(
            <DigestaTocMobileBooks toc={mockToc} url="/"/>
        );

        const option1 = screen.getByRole("option", {
            name: /Book 1/i
        })
        const option2 = screen.getByRole("option", {
            name: /Book 2/i
        })
        const option3 = screen.getByRole('option', {
            name: "Wybierz księgę"
        })
        expect(option1).toBeInTheDocument();

        expect(option2).toHaveValue('2');
        expect(option3).toHaveValue('');
    });

    test('dispatches action and navigates on option change', async () => {
        const mockToc = [
            {id: 1, book_latin_name: 'Book 1', tituli: [{id: 1, number: 1}, {id: 2, number: 2}]},
            {id: 2, book_latin_name: 'Book 2', tituli: [{id: 3, number: 3}, {id: 4, number: 4}]},
        ];
        const mockDispatch = jest.fn();
        const mockNavigate = jest.fn();
        useSelector.mockReturnValue(1);
        useDispatch.mockReturnValue(mockDispatch);
        useNavigate.mockReturnValue(mockNavigate);

        render(
            <DigestaTocMobileBooks toc={mockToc} url="/"/>
        );
        const user = userEvent.setup()

        const selectElement = screen.getAllByRole('combobox');

        await act(async ()=>{await user.selectOptions(selectElement[0], '2')})

        expect(mockDispatch).toHaveBeenCalledWith(
            digestaActions.setChosenBookId(2)
        );
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

});


