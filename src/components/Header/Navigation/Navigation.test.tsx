import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { Navigation } from './Navigation';
import { describe, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

describe('Navigation', () => {
  test('renders navigation in app', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navigation />
      </MemoryRouter>
    );
    expect(screen.getByTestId('app-header-navigation')).toBeInTheDocument();
  });
});
