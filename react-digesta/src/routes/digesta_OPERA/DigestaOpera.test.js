import {render, screen} from "../../../test-utils";
import DigestaOpera from "./DigestaOpera";


// const useQuery = jest.fn()

describe("DigestaOpera", () => {

    test("renders spinner on load", async () => {

        render(<DigestaOpera/>)
        const spinner = await screen.findByTestId("spinner")
        expect(spinner).toBeInTheDocument()
    })
    test("renders toc when loaded", async () => {

        render(<DigestaOpera/>)
        const opera = await screen.findAllByText("Adnotationes");
        expect(opera[0]).toBeInTheDocument()


    })
})