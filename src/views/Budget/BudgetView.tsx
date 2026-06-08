import React from 'react';
import { Box, Typography } from '@mui/material';

const BudgetView: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Budget</Typography>
      <Typography variant="body1">Set and monitor your monthly budgets here.</Typography>
    </Box>
  );
};

export default BudgetView;
