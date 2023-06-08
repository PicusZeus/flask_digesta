import {render, screen} from "../../../../test-utils";
import MenuBar from "./MenuBar";
import tokenService from "../../../services/token.service";
import {MemoryRouter} from "react-router-dom";
import {useSelector as actualUseSelector} from "react-redux"
import {useSelector} from "react-redux";
import {initialState as uiSlice} from "../../../store/ui-slice";
import {initialState as authSlice} from "../../../store/auth-slice";
import {initialState as digestaSlice} from "../../../store/digesta-slice";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";
import  * as redux from 'react-redux'
const actual = actualUseSelector


jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn()
}));

jest.mock("../../../services/token.service", () => {
    return {
        getUserId: jest.fn(),
        getLocalAccessToken: jest.fn()
    }
})


describe("MenuBar loggedIn", () => {

    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback({

                ui: {...uiSlice},
                digesta: {...digestaSlice},
                auth: {...authSlice, commentedParagraphi: [{d: 1}, {d: 2}]}

            })
        })
        tokenService.getUserId.mockImplementation(() => {
            return 1
        })
        tokenService.getLocalAccessToken.mockImplementation(() => {
            return 123
        })

    });


    test("renders correctly loggedIn", () => {


            render(<MemoryRouter><MenuBar/></MemoryRouter>)
            const logOut = screen.getAllByText("Wyloguj się")
            const commentedParagraphi = screen.getByText(/Skomentowane Paragrafy/i)
            expect(logOut[0]).toBeInTheDocument()
            expect(commentedParagraphi).toBeInTheDocument()
        }
    )
    test("renders correctly commented paragraphi button", () => {


        render(<MemoryRouter><MenuBar/></MemoryRouter>)
        const commentedButton = screen.getByRole('button', {
            name: /skomentowane paragrafy 2/i
        })
        expect(commentedButton).toBeInTheDocument()
    })
})


describe("MenuBar loggedOut", () => {

    test('logging and registering modal opens and renders correctly', async () => {

        const newRedux = jest.requireActual('react-redux')
        useSelector.mockImplementation(newRedux.useSelector)

        const user = userEvent.setup()
        render(<MemoryRouter><MenuBar/></MemoryRouter>)

        const regButton = screen.getByRole('button', {
            name: /rejestracja/i
        })
        expect(regButton).toBeInTheDocument()
        await act(async ()=>{await user.click(regButton)})


        const passwordLabel = await screen.findByText(/Stwórz hasło \(min. 8 znaków\)/i)
        expect(passwordLabel).toBeInTheDocument()
        const logButton = screen.getByRole('button', {
            name: /logowanie/i
        })
        await act(async ()=>{user.click(logButton)})
        const loginLabel = await screen.findByText(/Podaj nazwę użytkownika/i)
        expect(loginLabel).toBeInTheDocument()

    })
})
