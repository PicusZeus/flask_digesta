import { render, screen } from "../../../../test-utils";
import { MemoryRouter, Route } from "react-router-dom";
import JuristStats, { loader } from "./JuristStats";
import { useParams } from "react-router-dom";
import BooksAuthorshipShareChart from "../../charts/BooksAuthorshipShareChart/BooksAuthorshipShareChart";
import OperaCoverageChart from "../../charts/OperaCoverageChart/OperaCoverageChart";
import { waitFor } from "@testing-library/react";

const mockedParams = {
  jurysta_id: "1",
};

jest.mock(
  "../../charts/BooksAuthorshipShareChart/BooksAuthorshipShareChart",
  () => () => <div data-testid="chart">BooksAuthorshipShareChart</div>
);
jest.mock("../../charts/OperaCoverageChart/OperaCoverageChart", () => () => (
  <div data-testid="chart">OperaCoverageChart</div>
));
jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useParams: () => mockedParams,
  };
});
// Mock the API function

describe("JuristStats", () => {
  test("renders loading spinner while fetching data", async () => {
    // Mock the loading state

    render(<JuristStats />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("renders jurist name when data is fetched", async () => {
    render(
      <MemoryRouter>
        <JuristStats />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("Ulpianus w Digestach")).toBeInTheDocument();
    });
  });
});

describe("loader", () => {
  test("calls loader function correctly", async () => {
    const mockedGetQueryData = jest.fn();
    const mockedFetchQuery = jest.fn();
    const mockedQueryClient = {
      getQueryData: mockedGetQueryData,
      fetchQuery: mockedFetchQuery,
    };
    const mockedParams = {
      jurysta_id: "1",
    };

    await loader(mockedQueryClient)({ params: mockedParams });

    expect(mockedGetQueryData).toHaveBeenCalledWith([
      "stats",
      "digesta",
      "jurists",
      "1",
    ]);
    expect(mockedFetchQuery).toHaveBeenCalledWith({
      queryKey: ["stats", "digesta", "jurists", "1"],
      queryFn: expect.any(Function),
    });
  });
});
