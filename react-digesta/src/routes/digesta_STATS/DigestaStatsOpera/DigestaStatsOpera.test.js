import { render, screen } from "../../../../test-utils";
import DigestaStatsOpera, { loader } from "./DigestaStatsOpera";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OperaCoverageChart from "../../../components/charts/OperaCoverageChart/OperaCoverageChart";

jest.mock(
  "../../../components/charts/OperaCoverageChart/OperaCoverageChart",
  () => {
    return () => <div data-testid="chart">OperaCoverageChart</div>;
  }
);
// const useQuery = jest.fn()

describe("DigestaStatsOpera", () => {
  test("renders spinner while fetching data", async () => {
    render(<DigestaStatsOpera />);
    const spinner = await screen.findByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });
  test("renders data when fetched successfully", async () => {
    render(
      <MemoryRouter>
        {" "}
        <DigestaStatsOpera />
      </MemoryRouter>
    );

    await waitFor(
      () => {
        expect(screen.getByTestId("chart")).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });
});

describe("operaLoader", () => {
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
      "opera",
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
      "opera",
    ]);
    expect(queryClient.fetchQuery).toHaveBeenCalledWith({
      queryKey: ["stats", "digesta", "opera"],
      queryFn: expect.any(Function),
    });
    expect(result).toEqual([{ title: "Fetched Data" }]);
  });
});
