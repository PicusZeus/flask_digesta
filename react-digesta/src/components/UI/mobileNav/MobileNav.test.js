import {render, screen} from "../../../../test-utils";
import MobileNav from "./MobileNav";

import tokenService from "../../../services/token.service";
import {MemoryRouter} from "react-router-dom";

jest.mock("../../../services/token.service", () => {
            return {
                getUserId: jest.fn()
            }

        })
describe("MobileNav", () => {
    test('renders correctly when logged in', () => {
        tokenService.getUserId.mockImplementation(()=>{return 1})
        render(<MemoryRouter><MobileNav/></MemoryRouter>)
        const logout = screen.getByText("Wyloguj się")
        expect(logout).toBeInTheDocument()
    })
    test("renders correctly when logged out", () => {
        tokenService.getUserId.mockImplementation(()=>{return false})
        render(<MemoryRouter><MobileNav/></MemoryRouter>)
        const register = screen.getByText("Zarejestruj się")
        expect(register).toBeInTheDocument()
    })
})