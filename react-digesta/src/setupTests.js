// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
// src/setupTests.js
import { server } from "./mocks/server";
// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

HTMLCanvasElement.prototype.getContext = () => {
  // return whatever getContext has to return
};
window.HTMLElement.prototype.scrollIntoView = jest.fn();

jest.mock("./components/UI/spinner/Spinner", () => () => (
  <div data-testid="spinner">spinner</div>
));
jest.mock("react-chartjs-2", () => ({
  Bar: () => <div>bar</div>,
  Pie: () => <div>pie</div>,
}));
