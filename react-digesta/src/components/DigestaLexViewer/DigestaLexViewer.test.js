import { render, screen } from "../../../test-utils";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DigestaLexViewer from "./DigestaLexViewer";
import DigestaTocMobileParagraphi from "../DigestaToc/DigestaTocMobile/DigestaTocMobileParagraphi/DigestaTocMobileParagraphi";
import { waitFor } from "@testing-library/react";
import DigestaParagraphusViewer from "../DigestaParagraphusViewer/DigestaParagraphusViewer";
jest.mock(
  "../DigestaToc/DigestaTocMobile/DigestaTocMobileParagraphi/DigestaTocMobileParagraphi",
  () => jest.fn()
);

jest.mock("../DigestaParagraphusViewer/DigestaParagraphusViewer", () =>
  jest.fn()
);
describe("DigestaLexViewer", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("renders the loading spinner while fetching data", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/digesta/1" replace />} />
          <Route path="/digesta/:lex_id" element={<DigestaLexViewer />} />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("renders the lex data when fetched successfully", async () => {
    const digestaParagraphusViewerMock = jest.fn();
    DigestaParagraphusViewer.mockImplementation(digestaParagraphusViewerMock);
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/digesta/1" replace />} />
          <Route path="/digesta/:lex_id" element={<DigestaLexViewer />} />
        </Routes>
      </BrowserRouter>
    );

    const lexAddress = await screen.findByText(/D 1\.1\.1/i);
    expect(lexAddress).toBeInTheDocument();

    const latAddress = await screen.findByText(
      "ULPIANUS libro primo institutionum"
    );
    expect(latAddress).toBeInTheDocument();

    const arrowBack = await screen.findByRole("link", {
      name: /arrow_back_ios/i,
    });
    expect(arrowBack).toHaveAttribute("href", "/digesta/1");

    const arrowForward = await screen.findByRole("link", {
      name: /arrow_forward_ios/i,
    });
    expect(arrowForward).toHaveAttribute("href", "/digesta/1/2");

    const linkJurist = await screen.findByRole("link", { name: "ULPIANUS" });
    expect(linkJurist).toHaveAttribute("href", "/jurysci/1");

    const linkOpus = await screen.findByRole("link", {
      name: /Liber 1 Libri Institutionum/i,
    });
    expect(linkOpus).toHaveAttribute("href", "/jurysci/1/opera/1");

    expect(digestaParagraphusViewerMock).toHaveBeenCalledWith(
      {
        paragraphus: {
          id: 1,
          key: "pr",
          text_lat:
            " Iuri operam daturum prius nosse oportet, unde nomen iuris descendat. est autem a iustitia appellatum: nam, ut eleganter Celsus definit, ius est ars boni et aequi.",
          text_pl: "",
        },
      },
      {}
    );
  });

  test("in mobile version if there are paragraphs, renders DigestaTocMobileParagraphi", async () => {
    const mockMobileParagraphiToc = jest.fn();
    DigestaTocMobileParagraphi.mockImplementation(mockMobileParagraphiToc);
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/digesta/1" replace />} />
          <Route path="/digesta/:lex_id" element={<DigestaLexViewer />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockMobileParagraphiToc).toHaveBeenCalled();
    });
  });
});
