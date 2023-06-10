import { render, screen } from "../../../../test-utils";
import DigestaStatsDigesta, { loader } from "./DigestaStatsDigesta";
import { waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BooksShareChart from "../../../components/charts/BooksShareChart/BooksShareChart";

jest.mock("../../../components/charts/BooksShareChart/BooksShareChart", () => {
  return () => <div data-testid="chart">BooksShareChart</div>;
});
describe("DigestaStatsDigesta", () => {
  test("renders spinner while fetching data", async () => {
    render(<DigestaStatsDigesta />);
    const spinner = await screen.findByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  test("renders data when fetched successfully", async () => {
    render(
      <MemoryRouter>
        <DigestaStatsDigesta />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Wybierz księgę/i)).toBeInTheDocument();
      expect(screen.getByTestId("chart")).toBeInTheDocument();
    });
  });
});

describe("loader", () => {
  test("returns cached data if available", async () => {
    const queryClient = {
      getQueryData: jest.fn(() => [{ title: "Cached Data" }]),
      fetchQuery: jest.fn(),
    };

    const loadQuery = loader(queryClient);
    const result = await loadQuery();

    expect(queryClient.getQueryData).toHaveBeenCalledWith([
      "stats",
      "digesta",
      "books",
    ]);
    expect(queryClient.fetchQuery).not.toHaveBeenCalled();
    expect(result).toEqual([{ title: "Cached Data" }]);
  });

  test("fetches data if no cached data available", async () => {
    const queryClient = {
      getQueryData: jest.fn(() => null),
      fetchQuery: jest.fn(() => [{ title: "Fetched Data" }]),
    };

    const loadQuery = loader(queryClient);
    const result = await loadQuery();

    expect(queryClient.getQueryData).toHaveBeenCalledWith([
      "stats",
      "digesta",
      "books",
    ]);
    expect(queryClient.fetchQuery).toHaveBeenCalledWith({
      queryKey: ["stats", "digesta", "books"],
      queryFn: expect.any(Function),
    });
    expect(result).toEqual([{ title: "Fetched Data" }]);
  });
});
