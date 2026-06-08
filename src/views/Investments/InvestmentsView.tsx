import React from 'react';
import { Box, Typography } from '@mui/material';

const InvestmentsView: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Investments</Typography>
      <Typography variant="body1">Track your investment portfolio here.</Typography>
    </Box>
  );
};

export default InvestmentsView;
