import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { AuthButton } from './AuthButton';
import { describe, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

describe('AuthButton', () => {
  test('renders auth button in app', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AuthButton />
      </MemoryRouter>
    );
    expect(screen.getByTestId('auth-button')).toBeInTheDocument();
  });
});
