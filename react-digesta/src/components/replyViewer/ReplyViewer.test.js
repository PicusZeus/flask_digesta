import {render, screen} from "../../../test-utils";
import ReplyViewer from "./ReplyViewer";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";
import tokenService from "../../services/token.service";
import {findByText} from "@testing-library/react";

jest.mock("../../services/token.service", () => {
    return {
        getUserId: jest.fn(),
        getLocalAccessToken: jest.fn()
    }
})

const reply = {
    id: 1,
    user: {
        id: 1,
        username: 'testuser',
    },
    likes: [],
    comment: 'Test comment',
    date: '2021-01-01',
};
describe("ReplyViewer logged out", () => {


    test('renders reply information', () => {
        render(<ReplyViewer reply={reply}/>);

        expect(screen.getByText(reply.user.username)).toBeInTheDocument();
        expect(screen.getByText('Test comment')).toBeInTheDocument();

    });
    test('doesnt open delete modal when delete button is clicked and when logout', async () => {
        render(<ReplyViewer reply={reply}/>);
        const user = userEvent.setup()
        const deleteButton = screen.getByRole("button", {name: /delete_forever/i});
        expect(deleteButton).toBeInTheDocument()
        act(() => {
            user.click(deleteButton)
        })
        const deleteModal = await screen.queryByRole('button', {name: /potwierdzam/i})
        expect(deleteModal).not.toBeInTheDocument()
    });
    test('doesnt open reply input, when "reply" clicked and when logged out', async () => {
        render(<ReplyViewer reply={reply}/>)
        const user = userEvent.setup()
        const replyButton = screen.getByRole("button", {name: /reply/i})
        expect(replyButton).toBeInTheDocument()
        act(() => {
            user.click(replyButton)
        })
        const deleteModal = await screen.queryByRole('button', {name: /potwierdzam/i})
        expect(deleteModal).not.toBeInTheDocument()
    })
    test("doesnt set liked when logged out", () => {
        render(<ReplyViewer reply={reply}/>)
        const user = userEvent.setup()
        const likeButton = screen.getByRole("button", {name: /favorite/i})
        act(() => {
            user.click(likeButton)
        })
        expect(screen.queryByRole("button", {name: /heart_check/i})).not.toBeInTheDocument()
    })
    test('private replies to reply are not rendered', async () => {
        render(<ReplyViewer reply={reply}/>)
        const testReply = screen.queryByText("testComment13")

        expect(testReply).not.toBeInTheDocument()
    })


})

describe("ReplyViewer logged in", () => {

    beforeEach(() => {
        tokenService.getUserId.mockImplementation(() => {
            return '1'
        })
        tokenService.getLocalAccessToken.mockImplementation(() => {
            return '123'
        })

    })

    test("renders correctly", () => {
        render(<ReplyViewer reply={reply}/>);

        expect(screen.getByText(reply.user.username)).toBeInTheDocument();
        expect(screen.getByText('Test comment')).toBeInTheDocument();

    });
    test('opens delete modal when delete button is clicked and when logout', async () => {
        const onDelete = jest.fn()
        render(<ReplyViewer reply={reply} onDelete={onDelete}/>);
        const user = userEvent.setup()
        const deleteButton = screen.getByRole("button", {name: /delete_forever/i});
        expect(deleteButton).toBeInTheDocument()
        act(() => {
            user.click(deleteButton)
        })

        const deleteModal = await screen.findByRole('button', {name: /potwierdzam/i})
        expect(deleteModal).toBeInTheDocument()
        // await act(()=>{
        await act( async ()=>{await user.click(deleteModal)})

        // })
        expect(onDelete).toBeCalledWith(reply.id)

    });
    test('opens and closes reply input, when "reply" clicked and when logged out', async () => {
        render(<ReplyViewer reply={reply}/>)
        const user = userEvent.setup()
        const replyButton = screen.getByRole("button", {name: /reply/i})
        expect(replyButton).toBeInTheDocument()
        act(()=>{
            user.click(replyButton)
        })
        const textArea = await screen.findByRole('textbox')
        expect(textArea).toBeInTheDocument()
        // await act( ()=>{
        await act(async ()=>{
            await user.click(replyButton)
        })
        // })
        const noTextArea = screen.queryByRole('textbox')
        expect(noTextArea).not.toBeInTheDocument()

    })
    test("doesnt set liked when logged out", async () => {
        render(<ReplyViewer reply={reply}/>)
        const user = userEvent.setup()
        const likeButton = screen.getByRole("button", {name: /favorite/i})
        act(() => {
            user.click(likeButton)
        })
        const likedComment = await screen.findByRole("button", {name: /heart_check/i})
        expect(likedComment).toBeInTheDocument()
    })
    test('private replies to reply are rendered', async () => {
        render(<ReplyViewer reply={reply}/>)
        const testReply = await screen.findByText("testComment13")

        expect(testReply).toBeInTheDocument()
    })

})