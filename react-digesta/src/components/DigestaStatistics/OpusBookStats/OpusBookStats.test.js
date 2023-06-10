import { render, screen } from "../../../../test-utils";
import { MemoryRouter, Route } from "react-router-dom";
import OpusBookStats, { loader } from "./OpusBookStats";
import TituliCoverage from "../../charts/TituliCoverage/TituliCoverage";
import { useParams } from "react-router-dom";

jest.mock("../../charts/TituliCoverage/TituliCoverage", () => () => (
  <div data-testid="chart">TituliCoverage</div>
));
// Mock the API function

const mockedParams = {
  opus_id: 1,
  book_id: 1,
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => mockedParams,
}));

describe("OpusBookStats", () => {
  test("renders loading spinner while fetching data", async () => {
    render(<OpusBookStats />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("renders opus and book information when data is fetched", async () => {
    // const mockOpusBookStats = {
    //   opus: { title_lat: 'opus', author: { name: 'ULPIANUS' } },
    //   book: { book_nr: '1' },
    //   tituli: [],
    // };

    render(
      <MemoryRouter>
        <OpusBookStats />
      </MemoryRouter>
    );

    expect(
      await screen.findByText("opus ULPIANUSA w księdze 1")
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Wybierz tytuł i zobacz jego zawartość dla ULPIANUSA"
      )
    ).toBeInTheDocument();
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

    await loader(mockedQueryClient)({ params: mockedParams });

    expect(mockedGetQueryData).toHaveBeenCalledWith([
      "stats",
      "digesta",
      "opera",
      1,
      1,
    ]);
    expect(mockedFetchQuery).toHaveBeenCalledWith({
      queryKey: ["stats", "digesta", "opera", 1, 1],
      queryFn: expect.any(Function),
    });
  });
});
