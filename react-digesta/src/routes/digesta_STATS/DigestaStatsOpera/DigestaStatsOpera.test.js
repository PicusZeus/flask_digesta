import {render, screen} from "../../../../test-utils";
import DigestaStatsOpera, {loader} from "./DigestaStatsOpera";
import userEvent from "@testing-library/user-event";
import {waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";


const useQuery = jest.fn()

describe("DigestaStatsOpera", () => {
    beforeEach(() => {
        useQuery.mockReturnValue({
            data: [
                {
                    author: {
                        id: 1,
                        name: "ULPIANUS"
                    },
                    coverage: 1.1028,
                    id: 1,
                    title_lat: "Opus 1",
                    title_pl: "Instytucji"
                },
                {
                    author: {
                        id: 1,
                        name: "ULPIANUS"
                    },
                    coverage: 0.9,
                    id: 1,
                    title_lat: "Opus 2",
                    title_pl: "Instytucji"
                },
                {
                    "author": {
                        "id": 1,
                        "name": "ULPIANUS"
                    },
                    "coverage": 0.1028,
                    "id": 1,
                    "title_lat": "Libri institutionum",
                    "title_pl": "Instytucji"
                }
            ],
            isFetching: false,
        });
    });
    test("renders spinner while fetching data", async () => {
        useQuery.mockReturnValue({
            data: null,
            isFetching: true,
        });
        render(<DigestaStatsOpera/>);
        const spinner = await screen.findByTestId("spinner")
        expect(spinner).toBeInTheDocument()
    });

    test("renders charts when fetched successfully", async () => {


        render(<MemoryRouter> <DigestaStatsOpera/></MemoryRouter>);

        await waitFor(() => {
            expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
            expect(screen.getByText("Prace jurystów cytowane w Digestach")).toBeInTheDocument();
            expect(screen.getByText("Wybierz pracę jurysty, o której chcesz się dowiedzieć więcej.")).toBeInTheDocument();
            expect(screen.getByLabelText("Pokaż prace jurystów z udziałem")).toBeInTheDocument();
            expect(screen.getByText("ponad jeden procent")).toBeInTheDocument();
            expect(screen.getByText("poniżej jednego procenta a powyżej pół procenta")).toBeInTheDocument();
            expect(screen.getByText("poniżej pół procenta a powyżej jednego promila")).toBeInTheDocument();
            expect(screen.getByText("poniżej jednego promila a powyżej pół promila")).toBeInTheDocument();
            expect(screen.getByText("poniżej pół promila a powyżej dziesiątej części promila")).toBeInTheDocument();
            expect(screen.getByText("poniżej dziesiątej części promila")).toBeInTheDocument();
            // Assert chart data
            expect(screen.getByTestId(/chart/i)).toBeInTheDocument();


        }, {timeout: 10000});
    })
    // test("changes chart data on option select", async () => {
    //     const user = userEvent.setup()
    //     render(<MemoryRouter> <DigestaStatsOpera/> </MemoryRouter>);
    //
    //     // Change option
    //     const selectElement = await screen.findByLabelText("Pokaż prace jurystów z udziałem");
    //     // selectElement.value = '1'
    //     //     selectElement.dispatchEvent(new Event("change"));
    //
    //     await user.selectOptions(selectElement, "2")
    //     const options = await screen.findAllByRole('option')
    //
    //     await waitFor(()=>{
    //         expect(options[1].selected).toBeTruthy()
    //     }, {timeout: 6000})
    //
    // });


})