import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import AdjustmentVerticalIcon from '@heroicons/react/24/solid/AdjustmentsVerticalIcon'
import { Card, InputAdornment, OutlinedInput, SvgIcon, Box } from '@mui/material';

export const AccountsSearch = () => (
  <Card sx={{ p: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <OutlinedInput
          defaultValue=""
          fullWidth
          placeholder="Tìm kiếm tài khoản"
          startAdornment={(
            <InputAdornment position="start">
              <SvgIcon
                color="action"
                fontSize="small"
              >
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          )}
      sx={{ maxWidth: 800 }}
      />
      <SvgIcon
          color='action'
          fontSize='small'
          sx={{ marginLeft: 2 }}
        >
          <AdjustmentVerticalIcon />
      </SvgIcon>
    </Box>
  </Card>
);
