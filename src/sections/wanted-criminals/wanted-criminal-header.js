import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Logo } from 'src/components/logo';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1C2536' }}>
      <Toolbar>
        <Box
          href="/"
          sx={{
            display: 'inline-flex',
            height: 32,
            width: 32,
            marginRight: 3
          }}
        >
          <Logo />
        </Box>
        <Typography variant="h6" component="div">
          TRANG THÔNG TIN TRUY NÃ
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
