import { render, screen } from "../../../../test-utils";
import { MemoryRouter, Route } from "react-router-dom";
import JuristTitulusStats, { loader } from "./JuristTitulusStats";
import OperaCoverageChart from "../../charts/OperaCoverageChart/OperaCoverageChart";
import { useParams } from "react-router-dom";

jest.mock("../../charts/OperaCoverageChart/OperaCoverageChart", () => () => (
  <div data-testid="chart">OperaCoverageChart</div>
));
// Mock the API function
const mockedParams = {
  jurysta_id: 1,
  book_id: 1,
  titulus_id: 1,
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => mockedParams,
}));

describe("JuristTitulusStats", () => {
  test("renders loading spinner while fetching data", async () => {
    // Mock the loading state

    render(<JuristTitulusStats />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("renders jurist name and titulus information when data is fetched", async () => {
    // Mock the successful API response

    render(
      <MemoryRouter>
        <JuristTitulusStats />
      </MemoryRouter>
    );

    expect(await screen.findByText("Ulpianus")).toBeInTheDocument();
    expect(await screen.findByText("w księdze 1")).toBeInTheDocument();
    expect(await screen.findByText("w tytule 1")).toBeInTheDocument();
    expect(await screen.findByText("Lorem Ipsum")).toBeInTheDocument();
  });

  // Add more test cases for other components and functionality
});

describe("loader", () => {
  test("calls loader function correctly", async () => {
    const mockedGetQueryData = jest.fn();
    const mockedFetchQuery = jest.fn();
    const mockedQueryClient = {
      getQueryData: mockedGetQueryData,
      fetchQuery: mockedFetchQuery,
    };

    await loader(mockedQueryClient)({ params: mockedParams });

    expect(mockedGetQueryData).toHaveBeenCalledWith([
      "statystyki",
      "jurysci",
      1,
      1,
      1,
    ]);
    expect(mockedFetchQuery).toHaveBeenCalledWith({
      queryKey: ["statystyki", "jurysci", 1, 1, 1],
      queryFn: expect.any(Function),
    });
  });
});
