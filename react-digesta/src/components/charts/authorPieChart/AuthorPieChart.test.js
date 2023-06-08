
import {render} from "@testing-library/react";
import { Pie } from "react-chartjs-2";
import AuthorPieChart from "./AuthorPieChart";

jest.mock("react-chartjs-2", () => {

  return {
    ...jest.requireActual("chart.js"),
    Pie: jest.fn(),
  };
});


describe("AuthorPieChart Component", () => {
  test("renders the pie chart", async () => {
      const authorship = 60;
      const author = "John Doe";

      render(
          <AuthorPieChart authorship={authorship} author={author}/>
      );

      expect(Pie).toHaveBeenCalled()

  })
});
