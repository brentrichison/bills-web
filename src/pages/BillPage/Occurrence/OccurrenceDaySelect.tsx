import type { OccurrenceSelectType } from '@/models/types';
import { WeekDays } from '../utils/helpers';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type Props = Omit<OccurrenceSelectType, 'billId'> & {
  value?: string;
  onChange: (value: string) => void;
};

export const OccurrenceDaySelect = ({ value, onChange }: Props) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-day">Select Day</InputLabel>

      <Select
        labelId="select-day"
        label="Select Day"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      >
        {Array.from(WeekDays).map((day, i) => (
          <MenuItem key={day} value={i.toString()}>
            {day}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
