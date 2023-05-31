import { render, screen } from "@testing-library/react";

import Footer from "./Footer";

test("renders info", ()=>{
    render(<Footer />);
    const linkElement = screen.getByText(/Jeśli masz uwagi lub pytanie/i);
    expect(linkElement).toBeInTheDocument()

})