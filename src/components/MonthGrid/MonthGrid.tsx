import type {
  BillType,
  CalendarWeeklyTotalsType,
  CalendarWeekType,
} from '@/models/types';
import { CalendarHeader } from '@components/CalendarHeader/CalendarHeader';
import { Box, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import { renderBills } from '@/pages/BillPage/utils/helper-components';
import { useAppContext } from '@/context/AppContext';
import { isToday } from 'date-fns';

type MonthGridProps = {
  weeks: CalendarWeekType[];
  weeklyTotals: CalendarWeeklyTotalsType[];
};

export const MonthGrid = ({ weeks, weeklyTotals }: MonthGridProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [activeBills, setActiveBills] = useState<BillType[]>([]);
  const { accounts } = useAppContext();
  const cells = weeks.flatMap((w) => w.days);
  const totalsByWeek = new Map<number, number>(
    weeklyTotals.map((wt) => [wt.week, Number(wt.total)])
  );

  const localDateFromISO = (iso: string) => {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  const renderModal = (bills: BillType[]) => {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="view-bills-modal-title"
        aria-describedby="view-bills-modal-description"
      >
        <Box bgcolor="background.paper">
          {renderBills(
            bills,
            accounts,
            () => {},
            () => {},
            true
          )}
        </Box>
      </Modal>
    );
  };

  return (
    <>
      <CalendarHeader />

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {cells.map((cell, i) => {
          const date = localDateFromISO(cell.dateIso);
          const weekNo = Math.floor(i / 7) + 1;
          const isSaturday = i % 7 === 6;

          return (
            <Box
              key={cell.dateIso}
              sx={{
                bgcolor: cell.inMonth
                  ? 'background.paper'
                  : (theme) => theme.palette.grey[200],
                borderStyle: 'solid',
                borderColor: isToday(date) ? 'primary.main' : 'divider',
                borderWidth: '.05rem',
                borderRadius: 1,
                borderLeftWidth: i % 7 === 0 ? '.1rem' : '.05rem',
                color: cell.inMonth ? 'text.primary' : 'text.secondary',
                minHeight: '10rem',
                position: 'relative',
              }}
              onClick={() => {
                if (!cell.bills.length) return;
                setActiveBills(cell.bills);
                handleOpen();
              }}
            >
              <Typography display="block" pl=".125rem" variant="caption">
                {date.getDate()}
              </Typography>

              {cell.bills.map((b) => (
                <Typography
                  key={`${b.id ?? 'x'}-${b.name}-${cell.dateIso}`}
                  display="block"
                  noWrap
                  pl=".125rem"
                  variant="caption"
                >
                  {b.name} — ${Number(b.amount).toFixed(2)}
                </Typography>
              ))}

              {isSaturday && totalsByWeek.has(weekNo) && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '.125rem',
                    right: '.125rem',
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    px: 0.5,
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="caption">
                    ${totalsByWeek.get(weekNo)!.toFixed(2)}
                  </Typography>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>

      {renderModal(activeBills)}
    </>
  );
};
