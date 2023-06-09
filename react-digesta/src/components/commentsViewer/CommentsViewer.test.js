import {render, screen} from "../../../test-utils"
import {useDispatch, useSelector} from "react-redux";
import CommentsViewer from "./CommentsViewer";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";
import {getByTestId} from "@testing-library/react";
import {useMutation} from "@tanstack/react-query";
import tokenService from "../../services/token.service";


// Mocking dependencies and hooks
jest.mock("../../services/token.service", () => ({
    ...jest.requireActual("../../services/token.service"),
    getUserId: jest.fn(), // Mock the getUserId function
    getLocalAccessToken: jest.fn()
}));
jest.mock("@tanstack/react-query", () => ({
    ...jest.requireActual("@tanstack/react-query"),
    useMutation: jest.fn()
}))

// jest.mock("../../services/notification.service", () => {
//     // Mock the NotificationService class
//     return jest.fn().mockImplementation(() => ({
//         setNotificationPending: jest.fn(),
//         setNotificationSuccess: jest.fn(),
//         setNotificationError: jest.fn(),
//     }));
// });


describe("CommentsViewer", () => {


    test("renders the 'Notatki' button and displays comments when opened", async () => {
        // comments fetched from msw


        render(
            <CommentsViewer paragraphus_id={1} repliedId={null}/>
        );
        const user = userEvent.setup()
        const openButton = await screen.findByText(/Notatki/i);
        await act(async () => {
            await user.click(openButton)
        })
        const comments = await screen.findAllByText(/testComment/i)
        expect(comments).toHaveLength(4)
    });

    test("renders the 'Notatki' button and displays spinner while loading", async () => {

        render(
            <CommentsViewer paragraphus_id={1} repliedId={2}/>
        );
        expect(screen.getByTestId("spinner")).toBeInTheDocument();
        const openButton = await screen.findByText(/Notatki/i);

        expect(openButton).toBeInTheDocument();

    });

    test("calls deleteComment mutation when deleting a comment", async () => {
        tokenService.getUserId.mockReturnValue('1')
        tokenService.getLocalAccessToken.mockReturnValue('1234')
        const mockMutate = jest.fn()
        const mockMutation = {mutate: mockMutate}
        useMutation.mockImplementation(() => mockMutation)


        render(<CommentsViewer paragraphus_id={1} repliedId={2}/>);
        const user = userEvent.setup()
        const openButton = await screen.findByText(/Notatki/i);
        await act(async () => {
            await user.click(openButton)
        })
        const deleteButtons = await screen.findAllByRole('button', {name: /delete_forever/i})
        await act(async () => {
            await user.click(deleteButtons[0])
        })
        const confirmationButton = await screen.findByText("Potwierdzam")
        await act(async () => {
            await user.click(confirmationButton)
        })

        expect(mockMutate).toHaveBeenCalled();
    });
});