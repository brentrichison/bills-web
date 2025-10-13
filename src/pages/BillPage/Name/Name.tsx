import { TextField } from '@mui/material';
import { ChangeText, type BaseBillProps } from '../helpers';
import { type FC } from 'react';

export const Name: FC<BaseBillProps> = ({ updateBill, value }) => (
  <TextField
    fullWidth
    label="Name"
    placeholder="e.g., internet"
    value={value}
    variant="outlined"
    onChange={(e) => updateBill(ChangeText.name, e.target.value)}
  />
);
