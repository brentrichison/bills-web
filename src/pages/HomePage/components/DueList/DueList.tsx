import type { BillType } from '@/models/types';
import { getSuffix, WeekDays } from '@/pages/BillPage/helpers';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { HomePageText } from '../../utils/constants';

type Props = {
  bills: BillType[];
};

export const DueList = ({ bills }: Props) => {
  return (
    <Box mt="2rem">
      <Typography
        component="h3"
        textAlign="center"
        textTransform="capitalize"
        variant="subtitle1"
      >
        {HomePageText.billsDueThisWeek}
      </Typography>

      <List dense disablePadding>
        {bills.map((bill) => (
          <ListItem
            key={bill.id}
            secondaryAction={
              <Typography variant="body2" fontWeight={600} sx={{ ml: 2 }}>
                {`$${Number(bill.amount || 0).toFixed(2)}`}
              </Typography>
            }
          >
            <ListItemText
              primary={bill.name}
              secondary={
                getSuffix((Number(bill.occurrence?.month) + 1).toString()) ||
                `${WeekDays[bill.occurrence?.day ?? -1]}`
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
