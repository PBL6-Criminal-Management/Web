import React from 'react';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import AdjustmentVerticalIcon from '@heroicons/react/24/solid/AdjustmentsVerticalIcon';
import {
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  Box,
  Button
} from '@mui/material';
import debounce from 'lodash/debounce';

export const ReportsSearch = ({ onSearchChange, onSearchButtonClick }) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleSearchButtonClick = () => {
    onSearchChange(inputValue);
    onSearchButtonClick(); 
  };

  return (
    <div>
      <Card sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <OutlinedInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          fullWidth
          placeholder="Tìm kiếm báo cáo"
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: 800 }}
        />
          <Button 
            variant="outlined" 
            sx={{marginLeft: 2}} onClick={handleSearchButtonClick}>
            Tìm kiếm
          </Button>
        </Box>
      </Card>
    </div>
  );
};
