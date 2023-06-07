import {render, screen} from "../../../../../test-utils";
import {useSelector, useDispatch} from 'react-redux';
import TocMobile from '../../../UI/TocMobile/TocMobile';
import DigestaTocMobileJuristDigestaTitulus
    from '../DigestaTocMobileJuristDigestaTitulus/DigestaTocMobileJuristDigestaTitulus';
import {getTituliAuthor} from '../../../../api/api';
import NotificationService from '../../../../services/notification.service';
import {useQuery} from '@tanstack/react-query';
import Spinner from '../../../UI/spinner/Spinner';
import {digestaActions} from '../../../../store/digesta-slice';
import DigestaTocMobileJuristDigestaBook from './DigestaTocMobileJuristDigestaBook';
import userEvent from "@testing-library/user-event";
import {act} from "@testing-library/react";


jest.mock('../DigestaTocMobileJuristDigestaTitulus/DigestaTocMobileJuristDigestaTitulus'
,
    ()=>jest.fn())

describe('DigestaTocMobileJuristDigestaBook', () => {

    test('renders the component with options', async () => {


        render(<DigestaTocMobileJuristDigestaBook book_id={1} author_id={1}/>)
        // msw server
        // { id: 1, number: 1, title_lat: 'Titulus 1' },
        // { id: 2, number: 2, title_lat: 'Titulus 2' },
        const titulus1 = await screen.findByRole('option', {
            name: /Titulus 1/i
        })
        const titulus2 = await screen.findByRole('option', {
            name: /Titulus 2/i
        })
        expect(titulus1).toBeInTheDocument()
        expect(titulus2).toBeInTheDocument()


    });

    test('renders the Spinner component while fetching data',() => {


        render(
            <DigestaTocMobileJuristDigestaBook book_id={1} author_id={1}/>
        );
        const spinner = screen.getByTestId('spinner')
        // Verify that the Spinner component is rendered
        expect(spinner).toBeInTheDocument();
    });

    test('renders the DigestaTocMobileJuristDigestaTitulus component when chosenTitulusId is truthy', async () => {

        render(
            <DigestaTocMobileJuristDigestaBook book_id={1} author_id={1}/>
        );
        const user = userEvent.setup()
        // Change the option
        const select = await screen.findByRole('combobox');

        await act(async ()=>{await user.selectOptions(select, '2')})
        // Verify that the DigestaTocMobileJuristDigestaTitulus component is rendered
        expect(DigestaTocMobileJuristDigestaTitulus).toHaveBeenCalledTimes(1);

    });
});
