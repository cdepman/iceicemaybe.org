import { render as rtlRender, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { render } from './test-utils';
import App from './App';

test('renders the home page hero', async () => {
  render(<App />);
  expect(
    await screen.findByRole('heading', { name: /decommodify ice/i })
  ).toBeInTheDocument();
});

test('links to the off-grid ice rig manual', async () => {
  render(<App />);
  const links = await screen.findAllByRole('link', {
    name: /off-grid ice rig/i,
  });
  expect(links.length).toBeGreaterThan(0);
  expect(links[0]).toHaveAttribute('href', '/off-grid-ice-rig');
});

test('sets share metadata for the off-grid ice rig manual', async () => {
  rtlRender(
    <MemoryRouter initialEntries={['/off-grid-ice-rig']}>
      <App />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(document.title).toBe(
      'Off-Grid Ice Rig Build Manual | Ice Ice Maybe'
    );
  });

  expect(
    document.head
      .querySelector('meta[property="og:image"]')
      ?.getAttribute('content')
  ).toBe('https://www.iceicemaybe.org/off-grid-ice-rig/og-image.jpg');
  expect(
    document.head
      .querySelector('meta[name="description"]')
      ?.getAttribute('content')
  ).toMatch(/Open-source field manual/);
});
