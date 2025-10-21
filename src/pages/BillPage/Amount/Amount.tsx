import { TextField } from '@mui/material';
import { ChangeText, type BaseBillProps } from '../utils/helpers';
import { type FC } from 'react';
import { twoDecimals } from '@/pages/AccountPage/AccountForm/helpers';

export const Amount: FC<BaseBillProps> = ({ updateBill, value }) => (
  <TextField
    fullWidth
    label="Amount"
    placeholder="e.g., 125.50"
    type="number"
    value={value}
    variant="outlined"
    onChange={(e) => updateBill(ChangeText.amount, twoDecimals(e.target.value))}
  />
);
