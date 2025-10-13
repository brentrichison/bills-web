import { Typography } from '@mui/material';
import { daysOfTheWeek } from './constants';

export const CalendarHeader = () => {
  return (
    <Typography
      data-testid="calendar-header"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
      }}
    >
      {daysOfTheWeek.map((day) => (
        <Typography
          component="span"
          data-testid={`day-${day}`}
          key={day}
          variant="caption"
        >
          {day}
        </Typography>
      ))}
    </Typography>
  );
};
