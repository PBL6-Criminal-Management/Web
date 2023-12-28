import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Logo } from 'src/components/logo';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push('/auth/login');
  };

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
        <Box sx={{ marginLeft: 'auto' }}>
          <Button color="inherit" onClick={handleLoginClick}>
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
