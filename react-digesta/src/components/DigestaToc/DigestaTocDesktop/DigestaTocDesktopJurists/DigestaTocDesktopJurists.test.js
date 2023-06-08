
import { render, screen } from '../../../../../test-utils'
import DigestaTocDesktopJurists from './DigestaTocDesktopJurists';
import {MemoryRouter} from "react-router-dom";

describe('DigestaTocDesktopJurists', () => {
  const jurists = [
    { id: 1, name: 'Jurist 1' },
    { id: 2, name: 'Jurist 2' },
  ];

  test('renders the component with jurist items', () => {
    render(<MemoryRouter>
        <DigestaTocDesktopJurists jurists={jurists} />
    </MemoryRouter>)

    expect(screen.getByText('Juryści w Digestach')).toBeInTheDocument();

    jurists.forEach((jurist) => {
      expect(screen.getByText(jurist.name)).toBeInTheDocument();
    });
  });


});
