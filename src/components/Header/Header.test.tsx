import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Header } from './Header';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

afterEach(() => cleanup());

function mockViewport(width: number) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => {
    const min = /min-width:\s*(\d+)px/.exec(query)?.[1];
    const max = /max-width:\s*(\d+)px/.exec(query)?.[1];
    const matches =
      (min ? width >= Number(min) : true) &&
      (max ? width <= Number(max) : true);
    return {
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(), // legacy
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  });
}

describe('Header', () => {
  test('renders header in app', () => {
    mockViewport(1200);

    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByTestId('app-header')).toBeInTheDocument();
    expect(screen.getByTestId('app-header-toolbar')).toBeInTheDocument();
    expect(screen.getByTestId('app-header-navigation')).toBeInTheDocument();
    expect(screen.queryByTestId('mobile-nav')).toBeNull();
    expect(screen.queryByTestId('mobile-nav-icon')).toBeNull();
    expect(
      screen
        .getByTestId('app-header-toolbar')
        .querySelector('button[name="auth-button"]')
    ).toBeInTheDocument();
  });

  test('renders mobile nav in app', () => {
    mockViewport(360);

    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen
        .getByTestId('app-header-toolbar')
        .querySelector('button[name="auth-button"]')
    ).not.toBeInTheDocument();
  });
});
