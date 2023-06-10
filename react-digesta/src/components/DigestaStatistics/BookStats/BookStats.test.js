import { render, screen, waitFor } from "../../../../test-utils";

import BookStats, { loader } from "./BookStats";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BookShareChart from "../../charts/BookShareChart/BookShareChart";
import BookAuthorshipChart from "../../charts/BookAuthorshipChart/BookAuthorshipChart";
import BookOperaShareChart from "../../charts/BookOperaShareChart/BookOperaShareChart";

jest.mock("../../charts/BookShareChart/BookShareChart", () => {
  return () => <div data-testid="book-share-chart">BookShareChart</div>;
});

jest.mock("../../charts/BookAuthorshipChart/BookAuthorshipChart", () => {
  return () => <div data-testid="chart">BookAuthorshipChart</div>;
});

jest.mock("../../charts/BookOperaShareChart/BookOperaShareChart", () => {
  return () => <div data-testid="chart">BookOperaShareChart</div>;
});

describe("BookStats", () => {
  test("renders book stats correctly", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/statystyki/digesta/libri/1" replace />}
          />
          <Route
            path="/statystyki/digesta/libri/:book_id"
            element={<BookStats />}
          />
        </Routes>
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Liber Primus/i)).toBeInTheDocument();
      expect(screen.getByText("KSIĘGA 1")).toBeInTheDocument();
      expect(
        screen.getByText("Tytuły i ich udział w objętości księgi 1")
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Wybierz tytuł, dla którego chcesz poznać dalsze statystyki"
        )
      ).toBeInTheDocument();
    });
  });

  test("renders spinner while fetching data", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/statystyki/digesta/libri/1" replace />}
          />
          <Route
            path="/statystyki/digesta/libri/:book_id"
            element={<BookStats />}
          />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("renders book share chart when stats data is available", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/statystyki/digesta/libri/1" replace />}
          />
          <Route
            path="/statystyki/digesta/libri/:book_id"
            element={<BookStats />}
          />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("book-share-chart")).toBeInTheDocument();
    });
  });

  // Add more tests for other parts of the component as needed

  test("calls loader function correctly", async () => {
    const queryClient = {
      getQueryData: jest.fn(),
      fetchQuery: jest.fn().mockResolvedValue({}),
    };
    const params = { book_id: "123" };

    await loader(queryClient)({ params });

    expect(queryClient.getQueryData).toHaveBeenCalledWith([
      "stats",
      "digesta",
      "books",
      "123",
    ]);
    expect(queryClient.fetchQuery).toHaveBeenCalledWith({
      queryKey: ["stats", "digesta", "books", "123"],
      queryFn: expect.any(Function),
    });
  });
});
