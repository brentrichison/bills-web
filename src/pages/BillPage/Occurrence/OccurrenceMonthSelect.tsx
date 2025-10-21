import type { OccurrenceSelectType } from '@/models/types';
import { getSuffix } from '../utils/helpers';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type Props = Omit<OccurrenceSelectType, 'billId'> & {
  value?: string;
};

export const OccurrenceMonthSelect = ({ value, onChange }: Props) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-monthly">Select Monthly Date</InputLabel>

      <Select
        labelId="select-monthly"
        label="Select Monthly Date"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      >
        <MenuItem disabled value="">
          Select Monthly Occurrence
        </MenuItem>

        {Array.from({ length: 28 }, (_, i) => {
          return (
            <MenuItem key={i} value={i.toString()}>
              {getSuffix(String(i + 1))} of Every Month
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
