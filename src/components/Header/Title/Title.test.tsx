import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { Title } from './Title';
import { describe, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

describe('Title', () => {
  test('renders title in app', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Title />
      </MemoryRouter>
    );
    expect(screen.getByTestId('app-header-title')).toBeInTheDocument();
  });
});
