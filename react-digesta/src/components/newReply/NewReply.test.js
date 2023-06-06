import {render, screen} from "../../../test-utils"
import NewReply from './NewReply';
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";

// Create a mock Redux store


describe('NewReply', () => {
  test('renders the component', () => {
    render(
        <NewReply onUpdate={() => {}} onClose={() => {}} repliedId={1} username="testuser" queryClient={{}} />
    );

    // Verify that the component is rendered
    expect(screen.getByPlaceholderText('Treść odpowiedzi')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'send' })).toBeInTheDocument();
  });

  test('calls the postCommentHandler function on form submit', async () => {
    const onUpdateMock = jest.fn();
    const onCloseMock = jest.fn();

    render(
        <NewReply onUpdate={onUpdateMock} onClose={onCloseMock} repliedId={1} username="testuser" queryClient={{}} />
    );
    const user = userEvent.setup()

    // Enter a value in the textarea
    const textarea = screen.getByPlaceholderText('Treść odpowiedzi');
    await user.type(textarea, "test comment")

    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'send' });
    await act (async () => {
      await user.click(submitButton)
    })
    // Verify that the postCommentHandler function is called with the correct arguments
    expect(onCloseMock).toHaveBeenCalled();
    expect(onUpdateMock).toHaveBeenCalled();
  });
  test('disables the submit button if no username is provided', () => {
    render(
        <NewReply onUpdate={() => {}} onClose={() => {}} repliedId={1} username={false} />
    );

    // Verify that the submit button is disabled
    const submitButton = screen.getByRole('button', { name: /send/i });
    expect(submitButton).toBeDisabled();
  });
});
