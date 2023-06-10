import { render, screen } from "../../../../test-utils";
import DigestaJuristOpera from "./DigestaJuristOpera";
// import {MemoryRouter} from "react-router-dom";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

describe("DigestaJuristOpera", () => {
  test("renders correctly opera toc", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="jurysci/18/opera/18" replace />}
          />
          <Route
            path="jurysci/18/opera/:jurysta_id"
            element={<DigestaJuristOpera />}
          />
        </Routes>
      </BrowserRouter>
    );

    const headerForOperaToc = await screen.findAllByText(
      /Prace cytowane w Digestach/i
    );
    expect(headerForOperaToc[0]).toBeInTheDocument();
  });
});
