import {render, screen} from '../../../../../test-utils';
import DigestaTocDesktopJurist from './DigestaTocDesktopJurist';
import {useDispatch, useSelector} from 'react-redux';
import {digestaActions} from '../../../../store/digesta-slice';
import {MemoryRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import {useRef} from "react";
import {act} from "@testing-library/react";


jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

describe('DigestaTocDesktopJurist', () => {
    const jurist = {id: 1, name: 'Jurist 1'};

    beforeEach(() => {
        useDispatch.mockReturnValue(jest.fn());
        useSelector.mockReturnValue(jest.fn());

    });

    test('renders the component', () => {
        render(<MemoryRouter>
            <DigestaTocDesktopJurist jurist={jurist}/>
        </MemoryRouter>);
        expect(screen.getByText('Jurist 1')).toBeInTheDocument();
    });
    test('triggers selectJuristHandler on link click', async () => {
        const setChosenJuristId = jest.fn();
        useDispatch.mockReturnValueOnce(setChosenJuristId);

        render(
            <MemoryRouter>
                <DigestaTocDesktopJurist jurist={jurist}/>
            </MemoryRouter>);
        const user = userEvent.setup()
        await act(async ()=>{
            await user.click(screen.getByText('Jurist 1'))
        })
        expect(setChosenJuristId).toHaveBeenCalledWith(digestaActions.setChosenJuristId(jurist.id));
    });

    test('applies the "chosen" class if the jurist is chosen', () => {
        useSelector.mockReturnValueOnce(1);

        render(<MemoryRouter>
            <DigestaTocDesktopJurist jurist={jurist}/>
        </MemoryRouter>);

        expect(screen.getByText('Jurist 1')).toHaveClass('chosen');
    });

    test('does not apply the "chosen" class if the jurist is not chosen', () => {
        useSelector.mockReturnValueOnce(null);

        render(<MemoryRouter>
            <DigestaTocDesktopJurist jurist={jurist}/>
        </MemoryRouter>);

        expect(screen.getByText('Jurist 1')).not.toHaveClass('chosen');
    });

    test('scrolls to the component when the jurist is chosen', () => {

        useSelector.mockReturnValueOnce(1);


      render(<MemoryRouter>
            <DigestaTocDesktopJurist jurist={jurist}/>
        </MemoryRouter>);

        expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({
            behavior: 'smooth',
            block: 'start',
        });
    });
});
