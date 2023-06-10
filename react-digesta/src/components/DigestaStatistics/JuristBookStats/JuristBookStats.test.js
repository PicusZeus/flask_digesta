import { render, screen } from "../../../../test-utils";
import JuristBookStats, { loader } from "./JuristBookStats";
import OperaBookShareChart from "../../charts/BookOperaShareChart/BookOperaShareChart";
import TituliAuthorshipShareChart from "../../charts/TituliAuthorshipShareChart/TituliAuthorshipShareChart";
import { useParams } from "react-router-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const mockedParams = {
  jurysta_id: "1",
  book_id: "1",
};
jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useParams: () => mockedParams,
  };
});

jest.mock("../../charts/BookOperaShareChart/BookOperaShareChart", () => () => (
  <div data-testid="chart">BookOperaShareChart</div>
));
jest.mock(
  "../../charts/TituliAuthorshipShareChart/TituliAuthorshipShareChart",
  () => () => <div data-testid="chart">TituliAuthorshipShareChart</div>
);
test("renders JuristBookStats component correctly", async () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/statystyki/jurysci/1/1" replace />}
        />
        <Route
          path="/statystyki/jurysci/:jurysta_id/:book_id"
          element={<JuristBookStats />}
        />
      </Routes>
    </BrowserRouter>
  );

  const infoElement1 = await screen.findByText(
    "Udział prac Author NameA w objętości księgi 3"
  );
  const infoElement2 = await screen.findByText(
    "Wybierz tytuł, dla którego chcesz poznać dodatkowe statystyki dla Author NameA"
  );

  expect(infoElement1).toBeInTheDocument();
  expect(infoElement2).toBeInTheDocument();
});

test("renders Spinner when fetching data", () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/statystyki/jurysci/1/1" replace />}
        />
        <Route
          path="/statystyki/jurysci/:jurysta_id/:book_id"
          element={<JuristBookStats />}
        />
      </Routes>
    </BrowserRouter>
  );

  const spinnerElement = screen.getByTestId("spinner");

  expect(spinnerElement).toBeInTheDocument();
});

test("calls loader function correctly", async () => {
  const mockedGetQueryData = jest.fn();
  const mockedFetchQuery = jest.fn();
  const mockedQueryClient = {
    getQueryData: mockedGetQueryData,
    fetchQuery: mockedFetchQuery,
  };
  const mockedParams = {
    jurysta_id: "1",
    book_id: "1",
  };
  // useParams.mockReturnValue(mockedParams);

  await loader(mockedQueryClient)({ params: mockedParams });

  expect(mockedGetQueryData).toHaveBeenCalledWith([
    "stats",
    "digesta",
    "jurists",
    "1",
    "1",
  ]);
  expect(mockedFetchQuery).toHaveBeenCalledWith({
    queryKey: ["stats", "digesta", "jurists", "1", "1"],
    queryFn: expect.any(Function),
  });
});
