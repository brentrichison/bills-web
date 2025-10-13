import { useCreateAccount } from '@/hooks/useCreateAccount';
import { useUpdateAccount } from '@/hooks/useUpdateAccount';
import { ButtonText } from '@/pages/BillPage/helpers';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useState, type FormEvent } from 'react';
import {
  type AccountFormProps,
  GridSize,
  slotsProps,
  Text,
  twoDecimals,
} from './helpers';

export const AccountForm = ({
  id,
  name,
  amount,
  depositAmount,
  setAccounts,
  toggleOpenDrawer,
  setEditTarget,
}: AccountFormProps) => {
  const { mutateAsync, isPending, error, reset } = useCreateAccount();

  const {
    mutateAsync: updateMutateAsync,
    isPending: updateIsPending,
    error: updateError,
    reset: updateReset,
  } = useUpdateAccount();

  const [stateName, setStateName] = useState<string>(name ?? '');
  const [stateAmount, setStateAmount] = useState<string>(
    amount?.toString() ?? ''
  );
  const [stateDepositAmount, setStateDepositAmount] = useState<string>(
    depositAmount?.toString() ?? ''
  );

  const isDisabled =
    !stateName ||
    !stateAmount ||
    !stateDepositAmount ||
    isPending ||
    updateIsPending;

  const handleSubmit = () => async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stateName || !stateAmount || !stateDepositAmount) return;

    if (!id) {
      const created = await mutateAsync({
        name: stateName,
        amount: Number(stateAmount),
        depositAmount: Number(stateDepositAmount),
      });

      if (!created) return;
      setAccounts?.((prev) =>
        [...prev, created].sort((a, b) => a.name.localeCompare(b.name))
      );
    } else {
      const updated = await updateMutateAsync({
        id,
        name: stateName,
        amount: Number(stateAmount),
        depositAmount: Number(stateDepositAmount),
      });

      if (!updated) return;
      setAccounts?.((prev) =>
        prev
          .map((acc) => (acc.id === id ? updated : acc))
          .sort((a, b) => a.name.localeCompare(b.name))
      );
    }

    setStateName('');
    setStateAmount('');
    setStateDepositAmount('');

    if (!id) reset();
    else updateReset();
    toggleOpenDrawer(false);
  };

  const renderForm = () => (
    <Box
      bgcolor="background.paper"
      component="form"
      onSubmit={handleSubmit()}
      my={1}
    >
      <Grid container spacing={2}>
        <Grid size={GridSize}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            placeholder="e.g., Checking"
            variant="outlined"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
          />
        </Grid>

        <Grid size={GridSize}>
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            placeholder="e.g., 100.00"
            slotProps={slotsProps}
            type="number"
            variant="outlined"
            value={stateAmount == null ? '' : stateAmount.toString()}
            onChange={(e) => setStateAmount(twoDecimals(e.target.value))}
          />
        </Grid>

        <Grid size={GridSize}>
          <TextField
            fullWidth
            label="Deposit Amount"
            name="depositAmount"
            placeholder="e.g., 100.00"
            slotProps={slotsProps}
            type="number"
            variant="outlined"
            value={
              stateDepositAmount == null ? '' : stateDepositAmount.toString()
            }
            onChange={(e) => setStateDepositAmount(twoDecimals(e.target.value))}
          />
        </Grid>

        <Grid container size={GridSize}>
          <Grid size={{ xs: 6 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                toggleOpenDrawer(false);
                setEditTarget?.(null);
              }}
            >
              {ButtonText.cancel}
            </Button>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Button
              disabled={isDisabled}
              fullWidth
              variant="contained"
              type="submit"
            >
              {id ? ButtonText.updateAccount : ButtonText.createAccount}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <>
      {isPending && <Typography>{Text.createAccount}</Typography>}

      {error && (
        <Typography color="error" variant="body2">
          {error.message}
        </Typography>
      )}

      {updateIsPending && <Typography>{Text.updateAccount}</Typography>}

      {updateError && (
        <Typography color="error" variant="body2">
          {updateError.message}
        </Typography>
      )}

      {renderForm()}
    </>
  );
};
