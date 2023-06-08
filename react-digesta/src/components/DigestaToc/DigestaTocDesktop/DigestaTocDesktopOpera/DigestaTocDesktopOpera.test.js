
import {render, screen} from "../../../../../test-utils";
import DigestaTocDesktopOpera from './DigestaTocDesktopOpera';

describe('DigestaTocDesktopOpera', () => {
  const opera = [
    {
            id: 1,
            title_lat: 'Opus Title 1',
            author: {
                name: 'Author Name 1',
            },
            libri: [{id: 1, liber: "4"}],
         },
    {
            id: 2,
            title_lat: 'Opus Title 2',
            author: {
                name: 'Author Name 2',
            },
            libri: [{id: 2, liber: "5"}],
         },
  ];

  test('renders the component with opera items', () => {
    render(
      <DigestaTocDesktopOpera opera={opera} lexPath="/" />
    );

    const prace = screen.getByText('Prace cytowane w Digestach');
    expect(prace).toBeInTheDocument()

    opera.forEach((opus) => {
      expect(screen.getByText(opus.title_lat)).toBeInTheDocument();
    });
  });


});
