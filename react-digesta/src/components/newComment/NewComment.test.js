import { render, screen } from "../../../test-utils"
import NewComment from './NewComment';
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";



describe('NewComment', () => {
    test('renders the component', () => {
        render(
            <NewComment paragraphus_id={1} username="testuser" queryClient={{}}/>
        );

        // Verify that the component is rendered
        expect(screen.getByPlaceholderText('Treść notatki')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'send'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /visibility/i})).toBeInTheDocument();
    })
    test("renders the component loggedout", ()=>{
        render(<NewComment paragraphus_id={1} username={false} queryClient={{}}/>)
        expect(screen.getByText(/zaloguj się/i)).toBeInTheDocument()
    })

    test('send request on form submit', async () => {
        render(
            <NewComment paragraphus_id={1} username="testuser"/>
        );
        const user = userEvent.setup()

        // Enter a value in the textarea
        const textarea = screen.getByPlaceholderText('Treść notatki');
        await user.type(textarea, 'Test comment')

        // Submit the form
        const submitButton = screen.getByRole('button', {name: 'send'});
        await act(async ()=>{await user.click(submitButton)});
    });




    test('toggles the isPrivate state when the visibility button is clicked', async () => {
        render(
                <NewComment paragraphus_id={1} username="testuser" queryClient={{}}/>
        );
        const user = userEvent.setup()

        // Verify that the initial state is public
        const visibilityButton = screen.getByRole('button', {name: /visibility/i});
        expect(visibilityButton).toBeInTheDocument()
        // Click the visibility button
        await act(async ()=>{ await user.click(visibilityButton)})

        const visibilityOffButton = screen.getByRole('button', {name: /visibility_off/i})
        expect(visibilityOffButton).toBeInTheDocument()

    })
})
