import React from 'react';
import {render, screen} from '../../../test-utils'
import DigestaSearch from './DigestaSearch';
import userEvent from "@testing-library/user-event";


describe("DigestaSearch", () => {
    test('renders search input', () => {
        render(<DigestaSearch/>);

        const searchInput = screen.getByTestId('searched_term');
        expect(searchInput).toBeInTheDocument();

        const searchButton = screen.getByRole('button', {name: "Szukaj"})
        expect(searchButton).toBeInTheDocument()
    });


    test('calls onClick handler with search term when button is clicked', async () => {
        const onClickMock = jest.fn();
        render(<DigestaSearch onClick={onClickMock}/>);

        const searchInput = screen.getByTestId('searched_term');
        const user = userEvent.setup()
        await user.type(searchInput, 'Lorem ipsum')

        const searchButton = screen.getByText(/Szukaj/i);
        await user.click(searchButton)

        expect(onClickMock).toHaveBeenCalledTimes(1);
        expect(onClickMock).toHaveBeenCalledWith(expect.anything(), 'Lorem ipsum');
    });

})



