import {render} from "../../../../test-utils";

import BookAuthorshipChart from "./BookAuthorshipChart";

describe('BookAuthorshipChart', () => {
  test('renders without crashing', () => {
    render(<BookAuthorshipChart authors={[]} book_id={1} titulus_id={1} />);
  })})