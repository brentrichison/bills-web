import {
  Box,
  Button,
  Drawer,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { AccountForm } from './AccountForm/AccountForm';
import { useAppContext } from '@/context/AppContext';
import { useDeleteAccount } from '@/hooks/useDeleteAccount';
import { useState } from 'react';
import type { AccountType } from '@/models/types';
import { Delete, Edit } from '@mui/icons-material';

export const AccountPage = () => {
  const { accounts, setAccounts } = useAppContext();
  const { mutate } = useDeleteAccount();
  const [editTarget, setEditTarget] = useState<AccountType | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AccountType | null>(null);
  const [openDrawer, toggleOpenDrawer] = useState(false);

  const Text = {
    amount: 'Amount: $',
    cancel: 'Cancel',
    confirmDeletion: 'Confirm Deletion',
    deleteAccount: 'Delete Account',
    depositAmount: 'Deposit Amount: $',
    editAccount: 'Edit Account',
    yes: 'Yes, Delete',
    areYouSureDelete: (name: string) =>
      `Are you sure you want to delete the account "${name}"? This action cannot be undone.`,
  };

  const handleDeleteAccount = (id: number | undefined) => {
    if (!id) return;
    mutate(id);
    setAccounts?.((p) =>
      p
        .filter((acc) => acc.id !== id)
        .sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const renderDeleteModal = () => (
    <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
      <Box
        bgcolor="background.paper"
        p={4}
        mx="auto"
        my="10vh"
        width="min(560px, 92vw)"
        borderRadius={2}
      >
        <Typography variant="h6">{Text.confirmDeletion}</Typography>

        <Typography>
          {Text.areYouSureDelete(deleteTarget?.name ?? '')}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={() => setDeleteTarget(null)}>
            {Text.cancel}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteAccount(deleteTarget?.id)}
          >
            {Text.yes}
          </Button>
        </Box>
      </Box>
    </Modal>
  );

  const renderAccounts = () => (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="accounts">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Deposit Amount</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((acc) => (
            <TableRow key={acc.id} hover>
              <TableCell>{acc.name}</TableCell>
              <TableCell align="right">{acc.amount}</TableCell>
              <TableCell align="right">{acc.depositAmount}</TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="edit account"
                  color="primary"
                  size="small"
                  onClick={() => {
                    setEditTarget(acc);
                    toggleOpenDrawer(true);
                  }}
                >
                  <Edit fontSize="small" />
                </IconButton>

                <IconButton
                  aria-label="delete account"
                  size="small"
                  color="error"
                  onClick={() => setDeleteTarget(acc)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {accounts.length === 0 && (
            <TableRow>
              <TableCell colSpan={4}>
                <Typography variant="body2" color="text.secondary">
                  No accounts yet. Add a new account to start.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <>
      <Button
        color="secondary"
        sx={{
          float: 'right',
          my: '1rem',
        }}
        variant="outlined"
        onClick={() => toggleOpenDrawer(true)}
      >
        <Typography>Add Account</Typography>
      </Button>
      {renderAccounts()}
      {renderDeleteModal()}

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => toggleOpenDrawer(false)}
      >
        {editTarget ? (
          <AccountForm
            id={editTarget.id}
            name={editTarget.name}
            amount={editTarget.amount}
            depositAmount={editTarget.depositAmount}
            setAccounts={setAccounts}
            toggleOpenDrawer={toggleOpenDrawer}
            setEditTarget={setEditTarget}
          />
        ) : (
          <AccountForm
            setAccounts={setAccounts}
            toggleOpenDrawer={toggleOpenDrawer}
          />
        )}
      </Drawer>
    </>
  );
};
