import {render, screen} from "../../../../test-utils";
import DigestaStatsDigesta, {loader} from "./DigestaStatsDigesta";
import {waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

// const useQuery = jest.fn()
describe("DigestaStatsDigesta", () => {
    // beforeEach(() => {
    //     useQuery.mockReturnValue({
    //         data: null,
    //         isFetching: false,
    //     });
    // });
    test("renders spinner while fetching data", async () => {
        // useQuery.mockReturnValue({
        //     data: null,
        //     isFetching: true,
        // });
        render(<DigestaStatsDigesta/>);
        const spinner = await screen.findByTestId("spinner")
        expect(spinner).toBeInTheDocument()
    })

    test("renders data when fetched successfully", async () => {
        // const mockStats = [
        //     {title: "Book 1", share: 0.5},
        //     {title: "Book 2", share: 0.3},
        //     {title: "Book 3", share: 0.2},
        // ];
        //
        // useQuery.mockReturnValue({
        //     data: mockStats,
        //     isFetching: false,
        // });

        render(<MemoryRouter><DigestaStatsDigesta/></MemoryRouter>);

        await waitFor(() => {

            expect(screen.getByText(/Wybierz księgę/i)).toBeInTheDocument()
            expect(screen.getByTestId("chart")).toBeInTheDocument();
        }, {timeout: 5000})

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

        expect(queryClient.getQueryData).toHaveBeenCalledWith(["stats", "digesta", "books"]);
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

    expect(queryClient.getQueryData).toHaveBeenCalledWith(["stats", "digesta", "books"]);
    expect(queryClient.fetchQuery).toHaveBeenCalledWith({
      queryKey: ["stats", "digesta", "books"],
      queryFn: expect.any(Function),
    });
    expect(result).toEqual([{ title: "Fetched Data" }]);
  });
})

