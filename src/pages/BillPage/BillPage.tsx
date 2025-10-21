import { useEffect, useState, type FormEvent } from 'react';
import { ChangeText } from './utils/helpers';
import type { BillType } from '@/models/types';
import { useCreateBill } from '@/hooks/useCreateBill';
import { useUpdateBill } from '@/hooks/useUpdateBill';
import { useDeleteBill } from '@/hooks/useDeleteBill';
import { useAppContext } from '@/context/AppContext';
import {
  renderBills,
  renderErrors,
  renderForm,
} from './utils/helper-components';
import { Box, Button, Drawer, Modal, Typography } from '@mui/material';

export const BillPage = () => {
  const [bill, setBill] = useState<BillType>();
  const [stateBills, setStateBills] = useState<BillType[]>([]);
  const { mutateAsync, isPending, error, reset } = useCreateBill();
  const { mutate } = useDeleteBill();
  const { mutateAsync: updateMutateAsync } = useUpdateBill();
  const { accounts, bills } = useAppContext();
  const [openDrawer, toggleOpenDrawer] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<number | undefined>(
    undefined
  );

  const Text = {
    cancel: 'Cancel',
    confirmDeletion: 'Confirm Deletion',
    yes: 'Yes, Delete',
    areYouSureDelete: (name: string) =>
      `Are you sure you want to delete the bill "${name}"? This action cannot be undone.`,
  };

  const openDeleteFor = (id: number) => {
    setDeleteTarget(id);
    setOpenDelete(true);
  };

  const handleClose = () => {
    toggleOpenDrawer(false);
    reset();
    setBill(undefined);
  };

  const isDisabled =
    !bill?.name ||
    !bill?.amount ||
    isPending ||
    !bill.accountId ||
    (bill?.occurrence?.day == null &&
      bill?.occurrence?.week == null &&
      bill?.occurrence?.month == null);

  const updateBill = (
    field: keyof typeof ChangeText,
    value: string | number
  ) => {
    setBill((prev) => {
      const next = { ...prev, occurrence: { ...prev?.occurrence } } as BillType;

      const toNum = (v: string | number) =>
        typeof v === 'number' ? v : v === '' ? undefined : Number(v);

      switch (field) {
        case ChangeText.day: {
          const n = toNum(value);
          next.occurrence.day = n;
          if (n != null) next.occurrence.month = undefined;
          break;
        }
        case ChangeText.week: {
          const n = toNum(value);
          next.occurrence.week = n;
          if (n != null) next.occurrence.month = undefined;
          break;
        }
        case ChangeText.month: {
          const n = toNum(value);
          next.occurrence.month = n;
          if (n != null) {
            next.occurrence.day = undefined;
            next.occurrence.week = undefined;
          }
          break;
        }
        default:
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          next[ChangeText[field]] = value;
      }

      return next;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bill) return;

    const payload: BillType = {
      id: bill.id ? bill.id : undefined,
      accountId: bill.accountId,
      amount: Number(bill.amount),
      name: bill.name,
      occurrence: bill.occurrence,
    };

    const created = bill.id
      ? await updateMutateAsync(payload)
      : await mutateAsync(payload);
    if (!created) return;

    setStateBills((prev) =>
      [...prev, created].sort((a, b) => a.name.localeCompare(b.name))
    );
    setBill(undefined);
    reset();
    handleClose();
  };

  const deleteBill = (id: number) => {
    mutate(id);
    console.log('Delete bill with id:', id);
    setStateBills((prev) => prev.filter((b) => b.id !== id));
    setOpenDelete(false);
    setDeleteTarget(undefined);
  };

  const editBill = (bill: BillType) => {
    setBill(bill);
    toggleOpenDrawer(true);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteBill(deleteTarget);
    setDeleteTarget(undefined);
  };

  const renderDeleteModal = () => (
    <Modal open={openDelete}>
      <Box bgcolor="background.paper" p={4} mx="auto" width="80%">
        <Typography variant="h6" component="h2">
          {Text.confirmDeletion}
        </Typography>

        <Typography>
          {Text.areYouSureDelete(deleteTarget?.toString() || '')}
        </Typography>

        <Button variant="outlined" onClick={() => setOpenDelete(false)}>
          {Text.cancel}
        </Button>

        <Button
          color="error"
          disabled={!deleteTarget}
          variant="contained"
          onClick={handleDelete}
        >
          {Text.yes}
        </Button>
      </Box>
    </Modal>
  );

  useEffect(() => {
    if (bills) setStateBills(bills);
  }, [bills]);

  return (
    <Box data-testid="bill-page">
      <Button
        color="secondary"
        data-testid="add-bill-button"
        sx={{
          float: 'right',
        }}
        variant="outlined"
        onClick={() => toggleOpenDrawer(true)}
      >
        <Typography>Add Bill</Typography>
      </Button>
      {renderErrors(accounts, bills, error)}
      {renderBills(stateBills, accounts, openDeleteFor, editBill)}

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => toggleOpenDrawer(false)}
      >
        {renderForm(
          handleSubmit,
          updateBill,
          isDisabled,
          () => {
            toggleOpenDrawer(false);
            setBill(undefined);
            reset();
          },
          bill
        )}
      </Drawer>

      {renderDeleteModal()}
    </Box>
  );
};
