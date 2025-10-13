import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { MobileNav } from './MobileNav';
import { describe, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { NavItems } from '../NavItems';

describe('MobileNav', () => {
  test('renders mobile navigation in app', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <MobileNav
          anchorEl={null}
          open={Boolean(null)}
          nav={NavItems}
          setAnchorEl={() => {}}
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-nav-icon')).toBeInTheDocument();
  });
});
