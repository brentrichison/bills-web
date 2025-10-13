import type { AccountType, BillType } from '@/models/types';
import { Delete, Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { ButtonText, ChangeText, getSuffix, WeekDays } from './helpers';
import { Link } from 'react-router-dom';
import { Name } from './Name/Name';
import { Amount } from './Amount/Amount';
import { Occurrence } from './Occurrence/Occurrence';
import { Accounts } from './Accounts/Accounts';
import type { FormEvent } from 'react';

export const findAccountName = (
  accountId: number,
  accounts: AccountType[] = []
) => accounts.find((a) => a.id === accountId)?.name ?? 'Unknown Account';

const findWeeklyOccurrence = (num: number) => {
  switch (num) {
    case 1:
      return 'Weekly';
    case 2:
      return 'Bi-Weekly';
  }
};

export const renderBills = (
  bills: BillType[],
  accounts: AccountType[],
  deleteBill: (billId: number) => void,
  editBill: (bill: BillType) => void,
  isInModal = false
) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableBody>
        {bills.map((b) => (
          <TableRow key={b.id}>
            <TableCell>{b.name}</TableCell>
            <TableCell align="right">{b.amount}</TableCell>

            <TableCell>{findAccountName(b.accountId, accounts)}</TableCell>

            <TableCell align="right">
              {WeekDays[b.occurrence.day ?? -1]}
            </TableCell>

            <TableCell>
              {findWeeklyOccurrence(b.occurrence.week ?? -1)}
            </TableCell>

            <TableCell align="right">
              {getSuffix((b.occurrence.month ?? -1 + 1).toString())}
            </TableCell>

            {!isInModal && (
              <TableCell align="right">
                <IconButton
                  aria-label="edit account"
                  color="primary"
                  size="small"
                  onClick={() => editBill(b)}
                >
                  <Edit fontSize="small" />
                </IconButton>

                <IconButton
                  aria-label="delete account"
                  size="small"
                  color="error"
                  onClick={() => deleteBill(b.id ? b.id : -1)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export const renderErrors = (
  accounts: AccountType[],
  bills: BillType[],
  error: Error | null
) => (
  <>
    {error && (
      <Typography color="error" variant="body2">
        {error.message}
      </Typography>
    )}

    {accounts.length === 0 && (
      <>
        <Typography color="error" variant="body2">
          No accounts yet. You must have accounts created first to create a
          bill. Go to <Link to="/accounts">Accounts</Link> to start.
        </Typography>
      </>
    )}

    {bills.length === 0 && (
      <Typography color="error" variant="body2">
        No bills yet. Add new bill and click "{ButtonText.saveBill}" to start.
      </Typography>
    )}
  </>
);

export const renderForm = (
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>,
  updateBill: (field: keyof typeof ChangeText, value: string | number) => void,
  isDisabled: boolean,
  cb: () => void,
  bill?: BillType
) => (
  <Box
    bgcolor="background.paper"
    component="form"
    onSubmit={handleSubmit}
    p="1rem"
  >
    <Name updateBill={updateBill} value={bill?.name} />
    <Amount updateBill={updateBill} value={bill?.amount} />
    <Occurrence updateBill={updateBill} value={bill?.occurrence} />
    <Accounts updateBill={updateBill} value={bill?.accountId} />

    <Grid container justifyContent="flex-end" spacing=".5rem">
      <Grid>
        <Button variant="outlined" type="button" onClick={() => cb()}>
          {ButtonText.cancel}
        </Button>
      </Grid>

      <Grid>
        <Button disabled={isDisabled} type="submit" variant="contained">
          {ButtonText.saveBill}
        </Button>
      </Grid>
    </Grid>
  </Box>
);
