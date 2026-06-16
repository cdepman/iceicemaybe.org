import { screen } from '@testing-library/react';
import { render } from './test-utils';
import App from './App';

test('renders the home page hero', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /decommodify ice/i })
  ).toBeInTheDocument();
});

test('links to the off-grid ice rig manual', () => {
  render(<App />);
  const links = screen.getAllByRole('link', { name: /off-grid ice rig/i });
  expect(links.length).toBeGreaterThan(0);
  expect(links[0]).toHaveAttribute('href', '/off-grid-ice-rig');
});
