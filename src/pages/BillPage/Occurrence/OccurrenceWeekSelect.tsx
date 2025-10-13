import type { OccurrenceSelectType } from '@/models/types';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type Props = Omit<OccurrenceSelectType, 'billId'> & {
  value?: string;
  onChange: (value: string | undefined) => void;
};

export const OccurrenceWeekSelect = ({ value, onChange }: Props) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-weekly-biweekly">
        Select Weekly or Bi-Weekly
      </InputLabel>

      <Select
        labelId="select-weekly-biweekly"
        label="Select Weekly or Bi-Weekly"
        value={value}
        onChange={(e) => onChange(e.target.value || undefined)}
      >
        <MenuItem disabled value="">
          Select Weekly or Bi-Weekly Occurrence
        </MenuItem>

        <MenuItem key="weekly" value={1}>
          weekly
        </MenuItem>

        <MenuItem key="biweekly" value={2}>
          biweekly
        </MenuItem>
      </Select>
    </FormControl>
  );
};
