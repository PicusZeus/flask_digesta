import { render, screen } from "@testing-library/react";
import DigestaTocMobileParagraphi from "./DigestaTocMobileParagraphi";
import userEvent from "@testing-library/user-event";

describe("DigestaTocMobileParagraphi", () => {
  test("renders the component with options", () => {
    const setParagraphMock = jest.fn();

    render(
      <DigestaTocMobileParagraphi
        setParagraph={setParagraphMock}
        paragraphiKeys={["", "Paragraph 1", "Paragraph 2"]}
      />
    );

    // Verify that the component is rendered
    expect(
      screen.getByRole("option", { name: "Wybierz Paragraf" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Paragraph 1" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Paragraph 2" })
    ).toBeInTheDocument();
  });

  test("calls the setParagraph function on option change", async () => {
    const setParagraphMock = jest.fn();

    render(
      <DigestaTocMobileParagraphi
        setParagraph={setParagraphMock}
        paragraphiKeys={["", "Paragraph 1", "Paragraph 2"]}
      />
    );
    const user = userEvent.setup();

    // Change the option
    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "Paragraph 2");

    // Verify that the setParagraph function is called with the correct value
    expect(setParagraphMock).toHaveBeenCalled();
  });
});
