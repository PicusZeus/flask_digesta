import { render, screen, waitFor } from "../../../test-utils";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Layout from "./Layout";
import Footer from "../../components/UI/footer/Footer.js";
import MenuBar from "../../components/UI/menuBar/MenuBar.js";
import tokenService from "../../services/token.service";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth-actions";
import { authActions } from "../../store/auth-slice";

jest.mock("../../store/auth-actions", () => ({
  ...jest.requireActual("../../store/auth-actions"),
  logout: jest.fn(),
}));
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));
jest.mock("../../components/UI/footer/Footer.js", () => () => (
  <div data-testid="footer"></div>
));
jest.mock("../../components/UI/menuBar/MenuBar.js", () => () => (
  <div data-testid="menubar"></div>
));
describe("Layout", () => {
  beforeEach(() => {
    useDispatch.mockImplementation(() => jest.fn());
  });

  test("renders menu bar, main content, and footer", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    expect(screen.getByTestId("menubar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  test("dispatches logout action when token is expired", async () => {
    // Mock the expired token
    jest.spyOn(tokenService, "getLocalAccessToken").mockReturnValue("EXPIRED");
    // jest.spyOn(tokenService, 'getTokenDuration', 'get').mockReturnValue(5000);
    const mockLogout = jest.fn();

    logout.mockImplementation(mockLogout);

    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    expect(mockLogout).toHaveBeenCalledWith("EXPIRED");
  });
  test("dispatches logout action when token is gets expired", async () => {
    jest.spyOn(tokenService, "getTokenDuration").mockReturnValue(1);
    jest.spyOn(tokenService, "getLocalAccessToken").mockReturnValue("1234");

    const mockLogout = jest.fn();

    logout.mockImplementation(mockLogout);

    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    await waitFor(
      () => {
        expect(mockLogout).toHaveBeenCalledWith("1234");
      },
      { timeout: 1001 }
    );
  });
  test("dispatches setUserData action when token is valid", async () => {
    // Mock the valid token and user data
    jest
      .spyOn(tokenService, "getLocalAccessToken")
      .mockReturnValue("VALID_TOKEN");
    jest.spyOn(tokenService, "getUsername").mockReturnValue("JohnDoe");
    jest.spyOn(tokenService, "getUserId").mockReturnValue("123");
    jest
      .spyOn(tokenService, "getCommentedParagraphi")
      .mockReturnValue(["p1", "p2"]);
    jest.spyOn(tokenService, "getTokenDuration").mockReturnValue(5000);
    const mockedDispatch = jest.fn();
    useDispatch.mockImplementation(() => mockedDispatch);
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    // Wait for the setUserData action to be dispatched
    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledWith(
        authActions.setUserData({
          username: "JohnDoe",
          user_id: "123",
          paragraphi: ["p1", "p2"],
        })
      );
    });
  });
});
