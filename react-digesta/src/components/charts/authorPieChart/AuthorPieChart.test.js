import {render} from "../../../../test-utils";
import AuthorPieChart from "./AuthorPieChart";


describe('AuthorPieChart', () => {
  test('renders without crashing', () => {
    render(<AuthorPieChart authorship={50} author="John Doe" />);
  })});

