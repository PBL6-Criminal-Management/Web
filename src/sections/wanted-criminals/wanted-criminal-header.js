import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Divider } from '@mui/material';
import { Logo } from 'src/components/logo';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

const Header = () => {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push('/auth/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1C2536' }}>
      <Toolbar>
        <Box
          component={NextLink}
          href="/wanted-criminals"
          sx={{
            display: 'inline-flex',
            height: 32,
            width: 32,
            marginRight: 3
          }}
        >
          <Logo />
        </Box>
        <Typography
          component={NextLink}
          href="/wanted-criminals"
          variant="h6"
          sx={{
            marginLeft: 1,
            textDecoration: 'none',
            color: 'common.white'
          }}
        >
          TRANG THÔNG TIN TRUY NÃ
        </Typography>
        <Box sx={{ marginLeft: 'auto', display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
          <Button
            variant='contained'
            color="error"
            component={NextLink}
            href="/wanted-criminals/new-report"
          >
            Báo cáo
          </Button>
          <Button color="inherit" onClick={handleLoginClick}>
            Đăng nhập
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
