import { Card, CardContent, Typography } from '@mui/material';

export const StatCard = ({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) => {
  return (
    <Card data-testid="stat-card">
      <CardContent>
        <Typography color="text.secondary" gutterBottom variant="h6">
          {label}
        </Typography>

        <Typography gutterBottom variant="h5">
          {value}
        </Typography>

        <Typography color="text.secondary" variant="body2">
          {sub}
        </Typography>
      </CardContent>
    </Card>
  );
};
