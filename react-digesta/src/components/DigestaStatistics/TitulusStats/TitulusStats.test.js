import { render, screen } from "../../../../test-utils";
import { MemoryRouter, Route } from "react-router-dom";
import TitulusStats, { loader } from "./TitulusStats";
import BookAuthorshipChart from "../../charts/BookAuthorshipChart/BookAuthorshipChart";
import BookOperaShareChart from "../../charts/BookOperaShareChart/BookOperaShareChart";
import { useParams } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";

jest.mock("../../charts/BookOperaShareChart/BookOperaShareChart", () => () => (
  <div data-testid="chart">BookOperaShareChart</div>
));
jest.mock("../../charts/BookAuthorshipChart/BookAuthorshipChart", () => () => (
  <div data-testid="chart">BookAuthorshipChart</div>
));

const mockedParams = {
  titulus_id: 1,
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => mockedParams,
}));

describe("TitulusStats", () => {
  test("renders loading spinner while fetching data", async () => {
    render(<TitulusStats />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("renders titulus information and charts when data is fetched", async () => {
    // const mockTitulusStats = {
    //                 titulus: {
    //                     book: {book_nr: 1},
    //                     number: 1,
    //                     title_lat: 'Titulus',
    //                 },
    //                 jurists_authorship: [{authorship: 10, jurist: {name: 'SCAEVOLA'}}],
    //                 opera_coverage: [{coverage: 8, opera: {title: 'opus'}}],
    //             }

    render(
      <MemoryRouter>
        <TitulusStats />
      </MemoryRouter>
    );

    expect(await screen.findByText("Księga 1")).toBeInTheDocument();
    expect(await screen.findByText("tytuł 1")).toBeInTheDocument();
    expect(await screen.findByText("Titulus")).toBeInTheDocument();
    expect(
      await screen.findByLabelText("Zobacz jurystów z udziałem w tytule")
    ).toBeInTheDocument();
    expect(
      await screen.findByLabelText("Zobacz prace z udziałem w tym tytule")
    ).toBeInTheDocument();
  });

  test("changes authors set and opera set based on user selection", async () => {
    render(
      <MemoryRouter>
        <TitulusStats />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    const selections = await screen.findByLabelText(
      "Zobacz jurystów z udziałem w tytule"
    );
    await act(async () => {
      await user.selectOptions(selections, "1");
    });
    // Select the second option for authors set

    expect(await screen.findByText("BookAuthorshipChart")).toBeInTheDocument();
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
      "tituli",
      1,
    ]);
    expect(mockedFetchQuery).toHaveBeenCalledWith({
      queryKey: ["stats", "digesta", "tituli", 1],
      queryFn: expect.any(Function),
    });
  });
});
