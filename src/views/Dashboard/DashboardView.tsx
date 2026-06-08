import React from 'react';
import { Box, Typography } from '@mui/material';

const DashboardView: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Typography variant="body1">Overview of your financial status will be here.</Typography>
    </Box>
  );
};

export default DashboardView;
