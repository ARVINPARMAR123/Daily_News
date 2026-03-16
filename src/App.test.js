import { render, screen } from '@testing-library/react';
import sampleNews from './Sample.json';
import App from './App';

const originalFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: async () => sampleNews,
    })
  );
});

afterEach(() => {
  global.fetch = originalFetch;
});

test('renders the site navigation and lead headline section', async () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /dailynews/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  expect(await screen.findByRole('heading', { name: /top general headlines/i })).toBeInTheDocument();
});
