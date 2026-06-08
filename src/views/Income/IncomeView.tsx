import React from 'react';
import { Box, Typography } from '@mui/material';

const IncomeView: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Income</Typography>
      <Typography variant="body1">Manage your income sources here.</Typography>
    </Box>
  );
};

export default IncomeView;
