import { render, screen } from "../../../../test-utils";
import { MemoryRouter } from "react-router-dom";
import OpusStats, { loader } from "./OpusStats";
import BooksOpusCoverage from "../../charts/BooksOpusCoverage/BooksOpusCoverage";
import { useParams } from "react-router-dom";

const mockedParams = {
  opus_id: 1,
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => mockedParams,
}));
jest.mock("../../charts/BooksOpusCoverage/BooksOpusCoverage", () => () => (
  <div data-testid="chart">BooksOpusCoverage</div>
));
// Mock the API function

// Mock the helper function

describe("OpusStats", () => {
  test("renders loading spinner while fetching data", async () => {
    render(<OpusStats />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("renders opus information when data is fetched", async () => {
    // const mockOpusStats = {
    //   opus: { title_lat: 'opus', author: { name: 'ULPIANUS' } },
    //   books: [],
    // };

    render(
      <MemoryRouter>
        <OpusStats />
      </MemoryRouter>
    );

    expect(await screen.findByText("opus ULPIANUSA")).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Wybierz księgę, dla której chcesz zobaczyć udział tej pracy w tytułach"
      )
    ).toBeInTheDocument();
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
      "stats",
      "digesta",
      "opus",
      1,
    ]);
    expect(mockedFetchQuery).toHaveBeenCalledWith({
      queryKey: ["stats", "digesta", "opus", 1],
      queryFn: expect.any(Function),
    });
  });
});
