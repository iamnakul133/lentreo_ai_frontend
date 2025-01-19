import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Box
          component="main"
          sx={{
            p: 2,
            backgroundColor: 'background.default',
            overflowX: 'hidden', 
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
