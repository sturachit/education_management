import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ width: 'calc(100% - 240px)', ml: '240px' }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Education Management System
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
