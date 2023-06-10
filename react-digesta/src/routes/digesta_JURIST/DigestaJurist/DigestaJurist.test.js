import { render, screen } from "../../../../test-utils";
import DigestaJurist from "./DigestaJurist";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

describe("DigestaJurist", () => {
  test("renders correctly info", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="jurysci/digesta/10246" replace />}
          />
          <Route
            path="jurysci/digesta/:jurysta_id"
            element={<DigestaJurist />}
          />
        </Routes>
      </BrowserRouter>
    );
    const link = await screen.findByRole("link", { name: /zobacz prace/i });
    expect(link).toBeInTheDocument();
  });
});
