import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const DashboardCard = ({ title, count, icon }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="h3">
          {count}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
