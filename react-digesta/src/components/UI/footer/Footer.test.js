import { render, screen } from "@testing-library/react";

import Footer from "./Footer";

describe("footer", () => {
  test("renders link", () => {
    render(<Footer />);
    const linkElement = screen.getByText(/jeśli masz uwagi lub pytanie, pisz/i);
    expect(linkElement).toBeInTheDocument();
  });
});
