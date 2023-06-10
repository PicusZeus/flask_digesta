import { render, screen } from "../../../../test-utils";
import DigestaStatsJurists, { loader } from "./DigestaStatsJurists";
import { waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BooksAuthorshipChart from "../../../components/charts/BooksAuthorshipChart/BooksAuthorshipChart";

jest.mock(
  "../../../components/charts/BooksAuthorshipChart/BooksAuthorshipChart",
  () => {
    return () => <div data-testid="chart">BooksAuthorshipChart</div>;
  }
);

describe("DigestaStatsJurists", () => {
  test("renders spinner while fetching data", async () => {
    render(<DigestaStatsJurists />);
    const spinner = await screen.findByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });
  test("renders data when fetched successfully", async () => {
    render(
      <MemoryRouter>
        {" "}
        <DigestaStatsJurists />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Juryści cytowani w Digestach")
      ).toBeInTheDocument();
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
      "jurists",
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
      "jurists",
    ]);
    expect(queryClient.fetchQuery).toHaveBeenCalledWith({
      queryKey: ["stats", "digesta", "jurists"],
      queryFn: expect.any(Function),
    });
    expect(result).toEqual([{ title: "Fetched Data" }]);
  });
});
