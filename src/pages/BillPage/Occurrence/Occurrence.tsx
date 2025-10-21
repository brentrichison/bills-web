import Grid from '@mui/material/Grid';
import { OccurrenceDaySelect } from './OccurrenceDaySelect';
import { OccurrenceWeekSelect } from './OccurrenceWeekSelect';
import { OccurrenceMonthSelect } from './OccurrenceMonthSelect';
import { useState, type FC } from 'react';
import { FormGroup } from '@mui/material';
import { ChangeText, type BaseBillProps } from '../utils/helpers';

export const Occurrence: FC<BaseBillProps> = ({ updateBill, value }) => {
  const GridSize = { xs: 12 };
  const [weekday, setWeekday] = useState('');
  const [weeklyOrBiweekly, setWeeklyOrBiweekly] = useState('');
  const [dayOfMonth, setDayOfMonth] = useState('');

  const handleOnChange = (
    changeText: keyof typeof ChangeText,
    value: string,
    cb?: (val: string) => void,
    reset?: () => void
  ) => {
    if (cb) cb(value);
    updateBill(changeText, value);
    if (reset) reset();
  };

  const clearDayAndWeekFields = () => {
    setWeekday('');
    setWeeklyOrBiweekly('');
    handleOnChange(ChangeText.day, '');
    handleOnChange(ChangeText.week, '');
  };

  const clearMonthField = () => {
    setDayOfMonth('');
    handleOnChange(ChangeText.month, '');
  };

  return (
    <FormGroup>
      <Grid container>
        <Grid size={GridSize}>
          <OccurrenceDaySelect
            value={
              typeof value === 'object' && 'day' in value
                ? value.day?.toString()
                : weekday
            }
            onChange={(val) =>
              handleOnChange(ChangeText.day, val, setWeekday, clearMonthField)
            }
          />
        </Grid>

        <Grid size={GridSize}>
          <OccurrenceWeekSelect
            value={
              typeof value === 'object' && 'week' in value
                ? value.week?.toString()
                : weeklyOrBiweekly
            }
            onChange={(val) =>
              handleOnChange(
                ChangeText.week,
                val ?? '',
                setWeeklyOrBiweekly,
                clearMonthField
              )
            }
          />
        </Grid>

        <Grid size={GridSize}>
          <OccurrenceMonthSelect
            value={
              typeof value === 'object' && 'month' in value
                ? value.month?.toString()
                : dayOfMonth
            }
            onChange={(val) =>
              handleOnChange(
                ChangeText.month,
                val,
                setDayOfMonth,
                clearDayAndWeekFields
              )
            }
          />
        </Grid>
      </Grid>
    </FormGroup>
  );
};
