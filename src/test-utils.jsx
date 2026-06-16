import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const AllProviders = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };
