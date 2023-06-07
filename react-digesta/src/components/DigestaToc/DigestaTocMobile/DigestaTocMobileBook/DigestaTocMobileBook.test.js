import {render, screen} from '../../../../../test-utils'
import {useSelector, useDispatch} from 'react-redux';
import DigestaTocMobileTitulus from '../DigestaTocMobileTitulus/DigestaTocMobileTitulus';
import {useNavigate} from 'react-router-dom';
import DigestaTocMobileBook from './DigestaTocMobileBook';
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";
import {digestaActions} from "../../../../store/digesta-slice";


jest.mock( '../DigestaTocMobileTitulus/DigestaTocMobileTitulus',
    ()=>jest.fn())

jest.mock('react-redux', () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe('DigestaTocMobileBook', () => {
    test('renders the component with options', () => {

        useDispatch.mockReturnValue(jest.fn());


        useSelector.mockReturnValueOnce(2); // chosenTitulusId

        useNavigate.mockReturnValue(jest.fn());

        render(<DigestaTocMobileBook
            tituli={[{id: 1, number: 1, title_lat: 'Titulus 1'}, {id: 2, number: 2, title_lat: 'Titulus 2'}]}
            url="/example"/>);

        // Verify that the component is rendered
        expect(screen.getByRole('option', {name: '1 Titulus 1'})).toBeInTheDocument();
        // There should be two of them, as since it chosen it will be shown as default
        expect(screen.getAllByRole('option', {name: '2 Titulus 2'})).toHaveLength(2);
    });

    test('calls the dispatch function and navigate on option change', async () => {
        const mockDispatch = jest.fn()
        useDispatch.mockReturnValue(mockDispatch);

        useSelector.mockReturnValueOnce(2); // chosenTitulusId

        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        render(<DigestaTocMobileBook
            tituli={[{id: 1, number: 1, title_lat: 'Titulus 1'}, {id: 2, number: 2, title_lat: 'Titulus 2'}]}
            url="/example"/>);
        const user = userEvent.setup()
        // Change the option
        const select = screen.getByRole('combobox');

        await act(async ()=>{await user.selectOptions(select, '2')})

        // Verify that the dispatch function is called with the correct action
        // Verify that the dispatch function is called with the correct action
        expect(mockDispatch).toHaveBeenCalledWith(digestaActions.setChosenTitulusId(2));

        // Verify that the navigate function is called with the correct URL
        expect(mockNavigate).toHaveBeenCalledWith('/example');
    });

    test('renders the DigestaTocMobileTitulus component when chosenTitulusId is truthy', async () => {

        useDispatch.mockReturnValue(jest.fn());

        useSelector.mockReturnValueOnce(2); // chosenTitulusId


        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        const mockDigestaTocMobileTitulus = jest.fn();
        DigestaTocMobileTitulus.mockImplementation(mockDigestaTocMobileTitulus);

        render(<DigestaTocMobileBook
            tituli={[{id: 1, number: 1, title_lat: 'Titulus 1'}, {id: 2, number: 2, title_lat: 'Titulus 2'}]}
            url="/example"/>);
        const user = userEvent.setup()
        // Change the option
        const select = screen.getByRole('combobox');

        await act(async ()=>{await user.selectOptions(select, '2')})

        // Verify that the DigestaTocMobileTitulus component is rendered
        expect(mockDigestaTocMobileTitulus).toHaveBeenCalled();
    });

    test('does not render the DigestaTocMobileTitulus component when chosenTitulusId is falsy', () => {

        useDispatch.mockReturnValue(jest.fn());

        useSelector.mockReturnValueOnce(null); // chosenTitulusId

        useNavigate.mockReturnValue(jest.fn());

        const mockDigestaTocMobileTitulus = jest.fn();
        DigestaTocMobileTitulus.mockImplementation(mockDigestaTocMobileTitulus);

        render(<DigestaTocMobileBook
            tituli={[{id: 1, number: 1, title_lat: 'Titulus 1'}, {id: 2, number: 2, title_lat: 'Titulus 2'}]}
            url="/example"/>);

        // Verify that the DigestaTocMobileTitulus component is not rendered
        expect(mockDigestaTocMobileTitulus).not.toHaveBeenCalled();
    });
});
