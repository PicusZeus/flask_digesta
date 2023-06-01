import { render, screen } from "@testing-library/react";
import Button from "./Button";

test("button", () => {
  render(<Button />);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});
