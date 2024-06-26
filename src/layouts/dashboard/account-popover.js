import { useCallback } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";

export const AccountPopover = (props) => {
  const { user, anchorEl, onClose, open } = props;
  const router = useRouter();
  const auth = useAuth();

  const handleSignOut = useCallback(() => {
    onClose?.();
    router.push("/auth/login");
    auth.signOut();
  }, [onClose, auth, router]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Tài khoản</Typography>
        <Typography
          color="text.secondary"
          variant="body2"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {user?.name}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem component={NextLink} href="/user">
          Thông tin cá nhân
        </MenuItem>
        <MenuItem onClick={handleSignOut}>Đăng xuất</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
