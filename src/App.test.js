import { render, screen } from '@testing-library/react';
import App from './App';

test('renders skip link and login heading', () => {
  render(<App />);
  expect(
    screen.getByRole('link', { name: /skip to main content/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /התחברות לאתר/i })
  ).toBeInTheDocument();
});
