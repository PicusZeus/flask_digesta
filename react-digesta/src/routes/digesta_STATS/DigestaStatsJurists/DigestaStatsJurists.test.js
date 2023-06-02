import {render, screen} from "../../../../test-utils";
import DigestaStatsJurists, {loader} from "./DigestaStatsJurists";
import {waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";


const useQuery = jest.fn()
describe("DigestaStatsJurists", () => {
    beforeEach(() => {
        useQuery.mockReturnValue({
            data: null,
            isFetching: false,
        });
    });
    test("renders spinner while fetching data", async () => {
        useQuery.mockReturnValue({
            data: null,
            isFetching: true,
        });
        render(<DigestaStatsJurists/>);
        const spinner = await screen.findByTestId("spinner")
        expect(spinner).toBeInTheDocument()
    });
    test("renders data when fetched successfully", async () => {
        const mockAuthors = [
            {name: "Author 1", authorship: 0.5},
            {name: "Author 2", authorship: 0.3},
            {name: "Author 3", authorship: 0.2},

        ];

        useQuery.mockReturnValue({
            data: mockAuthors,
            isFetching: false,
        });

        render(<MemoryRouter> <DigestaStatsJurists/></MemoryRouter>);

        await waitFor(() => {
            expect(screen.getByText("Juryści cytowani w Digestach")).toBeInTheDocument();
            expect(screen.getByTestId("chart")).toBeInTheDocument();
        }, {timeout: 5000});
    })

})


describe("loader", () => {
    test("returns cached data if available", async () => {
        const queryClient = {
            getQueryData: jest.fn(() => [{title: "Cached Data"}]),
            fetchQuery: jest.fn(),
        };

        const loadQuery = loader(queryClient);
        const result = await loadQuery();

        expect(queryClient.getQueryData).toHaveBeenCalledWith(["stats", "digesta", "jurists"]);
        expect(queryClient.fetchQuery).not.toHaveBeenCalled();
        expect(result).toEqual([{title: "Cached Data"}]);
    });

    test("fetches data if no cached data available", async () => {
    const queryClient = {
      getQueryData: jest.fn(() => null),
      fetchQuery: jest.fn(() => [{ title: "Fetched Data" }]),
    };

    const loadQuery = loader(queryClient);
    const result = await loadQuery();

    expect(queryClient.getQueryData).toHaveBeenCalledWith(["stats", "digesta", "jurists"]);
    expect(queryClient.fetchQuery).toHaveBeenCalledWith({
      queryKey: ["stats", "digesta", "jurists"],
      queryFn: expect.any(Function),
    });
    expect(result).toEqual([{ title: "Fetched Data" }]);
  });
})

