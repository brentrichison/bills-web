import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ChangeText, type BaseBillProps } from '../helpers';
import { useState, type FC } from 'react';
import { useAppContext } from '@/context/AppContext';
import type { AccountType } from '@/models/types';

export const Accounts: FC<BaseBillProps> = ({ updateBill, value }) => {
  const { accounts } = useAppContext();
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const AccountText = 'Select account';

  const handleOnChange = (accountId: string) => {
    updateBill(ChangeText.accountId, accountId);
    setSelectedAccount(accountId);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="account-select-label">{AccountText}</InputLabel>

      <Select
        label={AccountText}
        labelId="account-select-label"
        onChange={(e) => handleOnChange(e.target.value.toString())}
        value={value ?? selectedAccount}
      >
        {accounts.map((a: AccountType) => (
          <MenuItem key={a.id} value={a.id}>
            {a.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
