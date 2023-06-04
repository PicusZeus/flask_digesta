import {render, screen} from "../../../../test-utils";
import DigestaStatsOpera, {loader} from "./DigestaStatsOpera";
import userEvent from "@testing-library/user-event";
import {waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import DigestaStatsJurists from "../DigestaStatsJurists/DigestaStatsJurists";


// const useQuery = jest.fn()

describe("DigestaStatsOpera", () => {
    // beforeEach(() => {
    //     useQuery.mockReturnValue({
    //         data: [
    //             {
    //                 author: {
    //                     id: 1,
    //                     name: "ULPIANUS"
    //                 },
    //                 coverage: 1.1028,
    //                 id: 1,
    //                 title_lat: "Opus 1",
    //                 title_pl: "Instytucji"
    //             },
    //             {
    //                 author: {
    //                     id: 1,
    //                     name: "ULPIANUS"
    //                 },
    //                 coverage: 0.9,
    //                 id: 1,
    //                 title_lat: "Opus 2",
    //                 title_pl: "Instytucji"
    //             },
    //             {
    //                 "author": {
    //                     "id": 1,
    //                     "name": "ULPIANUS"
    //                 },
    //                 "coverage": 0.1028,
    //                 "id": 1,
    //                 "title_lat": "Libri institutionum",
    //                 "title_pl": "Instytucji"
    //             }
    //         ],
    //         isFetching: false,
    //     });
    // });
    test("renders spinner while fetching data", async () => {
        // useQuery.mockReturnValue({
        //     data: null,
        //     isFetching: true,
        // });
        render(<DigestaStatsOpera/>);
        const spinner = await screen.findByTestId("spinner")
        expect(spinner).toBeInTheDocument()
    });
    test("renders data when fetched successfully", async () => {


        render(<MemoryRouter> <DigestaStatsOpera/></MemoryRouter>);

        await waitFor(() => {
            expect(screen.getByTestId("chart")).toBeInTheDocument();
        }, {timeout: 5000});
    })

    // test("renders charts when fetched successfully", async () => {
    //
    //
    //     render(<MemoryRouter> <DigestaStatsOpera/></MemoryRouter>);
    //
    //     await waitFor(() => {
    //         expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    //         expect(screen.getByText("Prace jurystów cytowane w Digestach")).toBeInTheDocument();
    //         expect(screen.getByText("Wybierz pracę jurysty, o której chcesz się dowiedzieć więcej.")).toBeInTheDocument();
    //         expect(screen.getByLabelText("Pokaż prace jurystów z udziałem")).toBeInTheDocument();
    //         expect(screen.getByText("ponad jeden procent")).toBeInTheDocument();
    //         expect(screen.getByText("poniżej jednego procenta a powyżej pół procenta")).toBeInTheDocument();
    //         expect(screen.getByText("poniżej pół procenta a powyżej jednego promila")).toBeInTheDocument();
    //         expect(screen.getByText("poniżej jednego promila a powyżej pół promila")).toBeInTheDocument();
    //         expect(screen.getByText("poniżej pół promila a powyżej dziesiątej części promila")).toBeInTheDocument();
    //         expect(screen.getByText("poniżej dziesiątej części promila")).toBeInTheDocument();
    //         // Assert chart data
    //         expect(screen.getByTestId(/chart/i)).toBeInTheDocument();
    //
    //
    //     }, {timeout: 10000});
    // })
    // test("changes chart data on option select, chart renders", async () => {
    //     const user = userEvent.setup()
    //     render(<MemoryRouter> <DigestaStatsOpera/> </MemoryRouter>);
    //
    //     // Change option
    //     const selectElement = await screen.findByLabelText("Pokaż prace jurystów z udziałem");
    //
    //     user.selectOptions(selectElement, "1")
    //     const chart = await screen.findByTestId('chart')
    //
    //     expect(chart).toBeInTheDocument()
    //
    //
    //
    // });


})


describe("operaLoader", () => {
    test("returns cached data if available", async () => {
        const queryClient = {
            getQueryData: jest.fn(() => [{title: "Cached Data"}]),
            fetchQuery: jest.fn(),
        };

        const loadQuery = loader(queryClient);
        const result = await loadQuery();

        expect(queryClient.getQueryData).toHaveBeenCalledWith(["stats", "digesta", "opera"]);
        expect(queryClient.fetchQuery).not.toHaveBeenCalled();
        expect(result).toEqual([{title: "Cached Data"}]);
    });

    test("fetches data if no cached data available", async () => {
        const queryClient = {
            getQueryData: jest.fn(() => null),
            fetchQuery: jest.fn(() => [{title: "Fetched Data"}]),
        };

        const loadQuery = loader(queryClient);
        const result = await loadQuery();

        expect(queryClient.getQueryData).toHaveBeenCalledWith(["stats", "digesta", "opera"]);
        expect(queryClient.fetchQuery).toHaveBeenCalledWith({
            queryKey: ["stats", "digesta", "opera"],
            queryFn: expect.any(Function),
        });
        expect(result).toEqual([{title: "Fetched Data"}]);
    });
})