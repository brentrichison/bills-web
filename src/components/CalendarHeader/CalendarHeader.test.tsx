import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { CalendarHeader } from './CalendarHeader';
import { daysOfTheWeek } from './constants';
import { describe, expect, test } from 'vitest';

describe('CalendarHeader', () => {
  test('renders all days of the week as spans in order', () => {
    const { container } = render(<CalendarHeader />);

    expect(screen.getByTestId('calendar-header')).toBeInTheDocument();

    daysOfTheWeek.forEach((day) => {
      expect(screen.getByTestId(`day-${day}`)).toBeInTheDocument();
      expect(screen.getByTestId(`day-${day}`)).toHaveTextContent(day);
    });

    const items = container.querySelectorAll('span[data-testid]');
    expect(items).toHaveLength(daysOfTheWeek.length);

    items.forEach((el, i) => {
      expect(el).toHaveTextContent(daysOfTheWeek[i]);
    });
  });
});
